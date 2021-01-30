const express = require('express');
const {default : AdminBro} = require('admin-bro');
const mongoose = require('mongoose');
const buildAdminRouter = require('./adminbro/admin.router');
const options = require('./adminbro/admin.options');
const app = express();
const port = 3030;
const url = 'mongodb+srv://Bhargavi:test1234@cluster0.b73md.mongodb.net/node-auth';

const run = async (MongooseDb) => {
    const mongooseDb = await mongoose.connect(url, {
        useNewUrlParser : true, 
        useUnifiedTopology : true
    })
    const admin = new AdminBro({
        databases : [mongooseDb],
        rootPath: '/admin',
    });
    console.log(MongooseDb);
    //const admin = new AdminBro(options)
    const router = buildAdminRouter(admin);
    app.use(admin.options.rootPath, router);
};

module.exports = run;