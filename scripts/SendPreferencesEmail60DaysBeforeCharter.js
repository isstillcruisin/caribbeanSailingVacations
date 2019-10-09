const moment = require('moment');
const mongoose = require("mongoose");
const db = require("../models");
const keys = require("../config/keys");
const { sendPreferencesEmail } = require("../util/TransactionalMailer");
const args = process.argv.slice(2);

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

function findConfirmedChartersNeedingPreferencesForm() {
  const date = moment().add(60, 'days').startOf('day');

  console.log(`**** Looking for confirmed charters starting before ${date.format()} but who haven't received the preferences email yet`);

  db.CharterInquiry.find({
    "startDate": {"$lt": date.toDate()},
    "confirmed": true,
    "sentPreferencesEmail": false,
  })
  .then(dbResults => { 
    let requests = dbResults.map((item) => {
        return new Promise((resolve) => {
          sendPreferencesEmail(item._id, resolve)
        });
    })
    Promise.all(requests).then(() => process.exit());
  });
}

findConfirmedChartersNeedingPreferencesForm();
