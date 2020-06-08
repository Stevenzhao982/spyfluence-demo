var Client = require('instagram-private-api').V1;
const AWS = require('aws-sdk');
const fs = require('fs');
var de = require('dotenv').config();
const path = require('path');
const pgp = require('pg-promise')();

async function generate_cookies() {
    pgp.pg.defaults.ssl = true;
    const db = pgp(process.env.DATABASE_URL);
    await db.any('SELECT * from scrappers;')
        .then(data => {
            data.forEach((account) => {
                fs.writeFile(`/cookies/${account.username}.json`, "", function () {

                    var device = new Client.Device(`${account.username}`);
                    var storage = new Client.CookieFileStorage(__dirname + `/cookies/${account.username}.json`);

                    Client.Session.create(device, storage,
                        account.username, account.password).then(function (session) {
                        console.log("session created", session._device.username)
                    });
                })
            });
        })
        .catch(error => {
            console.log("Error, failed to generate cookies: ", error)
        });
}

generate_cookies();
