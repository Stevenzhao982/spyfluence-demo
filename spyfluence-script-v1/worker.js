const pgp = require('pg-promise')();
const sgMail = require('@sendgrid/mail');
const path = require('path');
const moment = require('moment');
var Client = require('instagram-private-api').V1;
var fs = require('fs');
var de = require('dotenv').config();
var amqp = require('amqplib/callback_api');

var running = true;
var profile_count = 0;
var last_cursor_count = 0;
var last_cursor = null;
var job_params = {};

function sleep_429(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}

function round(num){
    return (Math.round(num * 100) / 100)
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);

        if(running == false){
            break;
        }
    }
}

async function scrape(params) {

    job_params = params;
    pgp.pg.defaults.ssl = true;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const db = pgp(process.env.HEROKU_DB_URL);
    const profile_column_set = new pgp.helpers.ColumnSet([
        'profile_id', 'instagram_link', 'account', 'private', 'description',
        'followers', 'following', 'followers_to_following', 'followers_to_num_posts',
        'recent_average_post_likes', 'recent_average_post_comments', 'engagement_rate',
        'total_posts', 'phone_number', 'profile_picture', 'relevant_links', 'contact_info',
        'tags', 'category_type'
    ], { table: 'profiles'});
    const relationship_column_set = new pgp.helpers.ColumnSet([
        'competitor_id', 'profile_id'
    ], { table: 'relationships'});
    // const category_column_set = new pgp.helpers.ColumnSet([
    //     'name'
    // ], { table: 'categories'});

    // var categories = [];
    var scrapped_profiles = 0;
    var relationships = [];
    var profiles = [];
    var mode = params.mode;

    // PROFILE INFO
    var account = null;
    var likes = 0;
    var comments = 0;
    var relevant_links = [];
    var hash_tag_regex = /(^|)(#[a-z\d-]+)/g;
    var hash_tags = new Set();
    var temp_hashTags;
    var caption = '';
    var followers_to_following_ratio = 0;
    var followers_to_num_posts_ratio = 0;
    var recent_average_post_comments = 0;
    var recent_average_post_likes = 0;
    var engagement_rate_percentage = 0;
    var contact_info = '';
    var phone_number = '';
    var category = '';

    // UPDATE CURRENT JOB
    await db.none("UPDATE jobs SET status=$1, error=$2, start_time=$3 WHERE id=$4;", ["running", "", moment(new Date()), params.job.id]);

    // UPDATE CURRENT SCRAPPER
    await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["running", params.scrapper.id]);

    // SCRAPE
    var device = new Client.Device(params.scrapper.username);
    var storage = new Client.CookieFileStorage(__dirname + `/cookies/${params.scrapper.username}.json`);

    Client.Session.create(device, storage, params.scrapper.username, params.scrapper.password).then(async function (session) {

        const accounts = await Client.Account.search(session, params.competitor.account);

        for (let i = 0; i < accounts.length; i++){
            if(accounts[i]._params.username == params.competitor.account){
                account = accounts[i];
                break;
            }
        }

        if (account == null){
            console.log(`CRASHED JOB : #${params.job.id}. Failed at search for main competitor: not found somehow.`);
            await db.none("UPDATE jobs SET status=$1, error=$2 WHERE id=$3;",
                ["crashed", "competitor username != any accounts for Account.search by api", params.job.id]);

            await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", params.scrapper.id]);
            process.exit(1);
        }

        const competitor_id = account._params.pk;

        if (mode == "followers"){
            var feed = new Client.Feed.AccountFollowers(session, competitor_id, Infinity);
        }
        else if (mode == "following"){
            var feed = new Client.Feed.AccountFollowing(session, competitor_id, Infinity);
        }
        else{
            console.log(`CRASHED JOB : #${params.job.id}. Failed at select scrape mode.`);
            await db.none("UPDATE jobs SET status=$1, error=$2 WHERE id=$3;",
                ["crashed", `Invalid scrape mode: ${mode}`, params.job.id]);

            await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", params.scrapper.id]);
            process.exit(1);
        }

        feed.map = profile => profile.id;

        if(params.job.status == "crashed" && params.job.bookmark_cursor != null && params.job.bookmark_profile != null){
            console.log(`SETTING CRASHED JOB #${params.job.id} WITH CURSOR ${params.job.bookmark_cursor}.`);
            feed.setCursor(params.job.bookmark_cursor);
            last_cursor = params.job.bookmark_cursor;
            last_cursor_count = parseInt(params.job.bookmark_profile) - 1;
            profile_count = parseInt(params.job.bookmark_profile) - 1;
        }

        const allResults = await feed.all();
        const cursors = allResults[1];
        const profileIds = allResults[0];
        profileIds.push(competitor_id);
        const totalProfileIds = profileIds.length;
        cursors[totalProfileIds - 1] = true;

        console.log("this is cursors ", cursors);

        await asyncForEach(profileIds, async (result) => {

            account = await Client.Account.getById(session, result);

            if (account == 429) {
                profileIds.push(result);
                console.log(`Job ${params.job.id} Sleeping`);
                sleep_429(180000);
            }
            else {
                const media = new Client.Feed.UserMedia(session, result);
                await media.get()
                    .then(async function(posts){
                        relevant_links.push(account._params.externalUrl);

                        account._params.biography.split(" ").forEach(function (word) {
                            if (word.match(/^(www.)|^(youtube.com\/)|^(instagram.com\/)|^(twitter.com\/)|^(facebook.com\/)|^(https:)|(.com)$|(.ca)$|(.org)$|(@mgmt)|(@gmail)/g)) {
                                relevant_links.push(word);
                            }
                        });

                        if (account._params.isPrivate == false) {

                            for (var i = 0; i < 9 && i < posts.length; i++) {
                                likes += posts[i]._params.likeCount;
                                comments += posts[i]._params.commentCount;
                                caption = posts[i]._params.caption;

                                if (caption != null) {

                                    temp_hashTags = caption.match(hash_tag_regex);

                                    if (temp_hashTags != null) {
                                        temp_hashTags.forEach(function (tag) {
                                            if (tag != null) {
                                                hash_tags.add(tag);
                                            }
                                        });
                                    }
                                }
                            }
                        }

                        if (account._params.mediaCount <= 9 && account._params.mediaCount != 0) {
                            recent_average_post_comments = round(comments / account._params.mediaCount);
                            recent_average_post_likes = round(likes / account._params.mediaCount);
                            engagement_rate_percentage = round((likes + comments) / account._params.mediaCount / account._params.followerCount * 100);
                        }
                        else if (account._params.mediaCount > 9) {
                            recent_average_post_comments = round(comments / 9);
                            recent_average_post_likes = round(likes / 9);
                            engagement_rate_percentage = round((likes + comments) / 9 / account._params.followerCount * 100);
                        }

                        followers_to_following_ratio =
                            (account._params.followingCount != 0) ? round(account._params.followerCount / account._params.followingCount) : account._params.followerCount;

                        followers_to_num_posts_ratio =
                            (account._params.mediaCount != 0) ? round(account._params.followerCount / account._params.mediaCount) : account._params.followerCount;


                        if (account._params.isBusiness == true) {
                            contact_info = account._params.publicEmail;
                            phone_number = account._params.publicPhoneNumber;
                            category = account._params.category
                        }

                        hash_tags = Array.from(hash_tags);

                        profiles.push({
                            profile_id: account._params.pk, instagram_link: 'https://www.instagram.com/' + account._params.username,
                            account: account._params.username, private: account._params.isPrivate, description: account._params.biography,
                            followers: account._params.followerCount, following: account._params.followingCount,
                            followers_to_following: followers_to_following_ratio, followers_to_num_posts: followers_to_num_posts_ratio,
                            recent_average_post_likes: recent_average_post_likes, recent_average_post_comments: recent_average_post_comments,
                            engagement_rate: engagement_rate_percentage, total_posts: account._params.mediaCount,
                            phone_number: phone_number, relevant_links: relevant_links, contact_info: contact_info,
                            profile_picture: account._params.profilePicUrl, tags: hash_tags, category_type: category
                        });

                        console.log("pushed up apcc ", account._params.username);
                        console.log("this is profile count ", profile_count);

                        if(cursors[profile_count]){

                            console.log("this is cursor ", cursors[profile_count], " for profile count ", profile_count, " for acc ", account._params.username);

                            const profile_query = () => pgp.helpers.insert(profiles, profile_column_set) +
                                ' ON CONFLICT(profile_id) DO UPDATE SET ' +
                                profile_column_set.assignColumns({from: 'EXCLUDED', skip: 'profile_id'}) +
                                'RETURNING id';

                            console.log("this is after profile query ")

                            relationships = [];

                            await db.map(profile_query, null, a => +a.id)
                                .then(async data => {

                                    profiles = [];
                                    scrapped_profiles += data.length;
                                    relationships = data.map((value) => {return {competitor_id: params.competitor.id, profile_id: value}});

                                    const relationship_query = () => pgp.helpers.insert(relationships, relationship_column_set) +
                                        ' ON CONFLICT(profile_id, competitor_id) DO NOTHING;';

                                    await db.none(relationship_query)
                                        .then(async data => {
                                            // we only update this if current successful (acts as previous context cursor after this iteration)
                                            last_cursor_count = profile_count;
                                            last_cursor = cursors[last_cursor_count];

                                            await db.none("UPDATE jobs SET profiles=$1, bookmark_cursor=$2, bookmark_profile=$3 WHERE id=$4;",
                                                [scrapped_profiles, last_cursor, last_cursor_count, params.job.id]);
                                        })
                                        .catch(async error => {
                                            running = false;
                                            console.log(`CRASHED JOB : #${params.job.id}. Failed at write relationships with error ${error}`);
                                            await db.none("UPDATE jobs SET status=$1, bookmark_cursor=$2, bookmark_profile=$3, error=$4 WHERE id=$5;",
                                                ["crashed", last_cursor, last_cursor_count, `CRASHED JOB : #${params.job.id}. Failed at write relationships with` + error, params.job.id]);
                                            await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", params.scrapper.id]);
                                            process.exit(1);
                                        });
                                })
                                .catch(async error => {
                                    running = false;
                                    console.log(`CRASHED JOB : #${params.job.id}. Failed at write profiles with error ${error}`);
                                    await db.none("UPDATE jobs SET status=$1, bookmark_cursor=$2, bookmark_profile=$3, error=$4 WHERE id=$5;",
                                        ["crashed", last_cursor, last_cursor_count, `CRASHED JOB : #${params.job.id}. Failed at write profiles with` + error, params.job.id]);
                                    await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", params.scrapper.id]);
                                    process.exit(1);
                                });
                        }

                        relevant_links = [];
                        likes = 0;
                        comments = 0;
                        phone_number = '';
                        contact_info = '';
                        followers_to_following_ratio = 0;
                        followers_to_num_posts_ratio = 0;
                        recent_average_post_comments = 0;
                        recent_average_post_likes = 0;
                        engagement_rate_percentage = 0;
                        temp_hashTags = 0;
                        hash_tags = new Set();
                        profile_count++;

                        sleep_429(3000);

                        if(profile_count == totalProfileIds){
                            console.log("Finishing up job ", params.job.id, " sending email to: ", params.email);
                            await db.none("UPDATE jobs SET status=$1, error=$2, end_time=$3, profiles=$4 WHERE id=$5;", ["complete", "", moment().utc(), scrapped_profiles, params.job.id]);
                            await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["complete", params.scrapper.id]);
                            const msg = {
                                to: params.email,
                                from: 'admin@spyfluence.com',
                                templateId: process.env.SENDGRID_JOB_COMPLETE_ID,
                                dynamic_template_data: {
                                    subject: `Your Spyfluence job is complete! (${params.competitor.account})`,
                                    result_url: 'http://www.spyfluence.com/campaigns'
                                },
                            };
                            sgMail.send(msg);
                        }
                    });
            }
        });
    }).catch(async (error) => {
        running = false;
        console.log(`CRASHED JOB : #${params.job.id}. Failed with error ${error}`);
        await db.none("UPDATE jobs SET status=$1, error=$2 WHERE id=$3;",
            ["crashed", `CRASHED JOB : #${params.job.id}. Failed Instagram V1: ${error}`, params.job.id]);
        await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", params.scrapper.id]);
        process.exit(1);
    });
}

function test_send_message(num_messages) {
    amqp.connect(process.env.CLOUDAMQP_URL, function (err, conn) {
        conn.createChannel(function (err, ch) {
            var queue = process.env.CLOUDAMQP_QUEUE;
            var msg = '{ "email": "stevenzhao982@gmail.com", "job": {"id": 1, "status": "created", "error": "", "bookmark_cursor": "", "bookmark_profile": 5}, "competitor": {"account": "lowcarb_nocarb", "id": 1}, "mode": "following", "scrapper": {"id": 1, "username": "123abcthrowaway", "password": "birdshit12"} }';

            ch.assertQueue(queue, {durable: true});

            for(let i = 0; i < num_messages; i ++){
                ch.sendToQueue(queue, new Buffer(msg), {persistent: true});
            }
        });
        setTimeout(function () {
            conn.close();
            process.exit(0)
        }, 500);
    });
}

function send_message(message) {
    amqp.connect(process.env.CLOUDAMQP_URL, function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.assertQueue(process.env.CLOUDAMQP_QUEUE, {durable: true});
            ch.sendToQueue(process.env.CLOUDAMQP_QUEUE, new Buffer(message), {persistent: true});
        });
        setTimeout(function () {
            conn.close();
            process.exit(0)
        }, 1000);
    });
}

function read_message() {
    amqp.connect(process.env.CLOUDAMQP_URL, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.get(process.env.CLOUDAMQP_QUEUE, true, function(err, msg){
                if(msg != false) {
                    const params = JSON.parse(msg.content.toString());
                    ch.ack(msg);
                    scrape(params);
                    console.log("Worker reading ", params);
                }

                setTimeout(function(){
                    conn.close()
                }, 10000);
            })
        });
    });
}

// send_message(5); // for testing
read_message();

process.once('SIGTERM', async function () {
    console.log('SIGTERM received...');

    await db.none("UPDATE jobs SET status=$1, bookmark_cursor=$2, bookmark_profile=$3, error=$4 WHERE id=$5;",
        ["crashed", last_cursor, last_cursor_count, `CRASHED JOB : #${job_params.job.id}. Sigterm/Heroku Cycling...`, job_params.job.id]);
    await db.none("UPDATE scrappers SET job_status=$1 WHERE id=$2;", ["crashed", job_params.scrapper.id]);

    var message = `{ "email": ${job_params.email}, "job": {"id": ${job_params.job.id}, "status": "crashed", "error": "Heroku Dyno Restarting, "bookmark_cursor": ${last_cursor}, "bookmark_profile": ${last_cursor_count}}, "competitor": {"account": ${job_params.competitor.account}, "id": ${job_params.competitor.id}}, "mode": ${job_params.mode}, "scrapper": {"id": ${job_params.scrapper.id}, "username": ${job_params.scrapper.username}, "password": ${job_params.scrapper.password}} }` ;

    send_message(message);
});
