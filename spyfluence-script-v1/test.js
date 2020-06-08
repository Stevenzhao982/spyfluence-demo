const pgp = require('pg-promise')();
const de = require('dotenv').config();
const moment = require('moment');
var Client = require('instagram-private-api').V1;
const path = require('path');

function sleep_429(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);

        if(running == false){
            break;
        }
    }
}

async function test_queries() {
    pgp.pg.defaults.ssl = true;
    var profiles = [];
    const db = pgp(process.env.DATABASE_URL);
    // const profile_column_set = new pgp.helpers.ColumnSet([
    //     'profile_id', 'instagram_link', 'account', 'private', 'description',
    //     'followers', 'followings', 'followers_to_following', 'followers_to_num_posts',
    //     'recent_average_post_likes', 'recent_average_post_comments', 'engagement_rate',
    //     'total_posts', 'phone_number', 'profile_picture', 'relevant_links', 'contact_info',
    //     'tags', 'category_type'
    // ], { table: 'profiles'});
    //
    //
    // profiles.push({
    //     profile_id: 23, instagram_link: '', account: "asdfasdasd", private: false, description: "",
    //     followers: 12, followings: 121, followers_to_following: 1, followers_to_num_posts: 10,
    //     recent_average_post_comments: 5, recent_average_post_likes: 5, engagement_rate: 19,
    //     total_posts: 10, phone_number: "46734323", profile_picture: "", relevant_links: ["asd", "asd"],
    //     contact_info: "asd", tags: ["2323", "3232"], category_type: "sdfsdf"
    // });
    //
    //
    // const profile_query = () => pgp.helpers.insert(profiles, profile_column_set) +
    //     ' ON CONFLICT(profile_id) DO UPDATE SET ' +
    //     profile_column_set.assignColumns({from: 'EXCLUDED', skip: 'profile_id'}) +
    //     'RETURNING id';
    //
    // await db.map(profile_query, [], a => +a.id)
    //     .then(async data => {
    //         console.log("this is data ", data)
    //     }).catch(async error => {
    //         console.log("this is error ", error)
    //     });

    console.log("done querying")
}

async function test_scrape() {
    var device = new Client.Device('123abcthrowaway');
    var storage = new Client.CookieFileStorage(__dirname + `/cookies/123abcthrowaway.json`);

    Client.Session.create(device, storage, '123abcthrowaway', 'birdshit12').then(async function (session) {
        const account = await Client.Account.search(session, 'fitness_beauty_love_sexy_');
        const competitor_id = account[0]._params.pk;

        var feed = new Client.Feed.AccountFollowers(session, competitor_id, Infinity);
        feed.map = profile => profile.id;

        const allResults = await feed.all();
        const profileIds = allResults[0];

        await asyncForEach(profileIds, async (result) => {
            const account = await Client.Account.getById(session, result);
            console.log("this is account ", account);
            process.exit(0)
        })
    })
}


test_scrape();
