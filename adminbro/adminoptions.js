const {default : AdminBro} = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');


AdminBro.registerAdapter(AdminBroMongoose);

// const { Company} = require('./Data/company');
const User = require('../models/User');
const Topic = require('../models/topics');
const Question = require('../models/question');

const options = {
    resources : [User, Topic, Question],
    rootPath: '/admin',
    // logoutPath: 'http://localhost:3000/admin/exit',
    // loginPath: 'http://localhost:3000/admin/sign-in',
    //databases : [mongooseDb],
};

module.exports = options;
