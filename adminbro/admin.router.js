const {default : AdminBro} = require('admin-bro');
const {buildRouter} = require('@admin-bro/express');
const express = require('express');

const buildAdminRouter = (admin) => {
    const router = buildRouter(admin);
    return router;
}
module.exports = buildAdminRouter;

//authenication

// const { default: AdminBro } = require('admin-bro');
// const { buildAuthenticatedRouter } = require('@admin-bro/express');
// const express = require('express');
// const argon2 = require('argon2');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

// const { User } = require('../models/User');

// /**
//  * @param {AdminBro} admin
//  * @return {express.Router} router
//  */
// const buildAdminRouter = (admin) => {
//   const router = buildAuthenticatedRouter(admin, {
//     cookieName: 'admin-bro',
//     cookiePassword: 'superlongandcomplicatedname',
//     authenticate: async (email, password) => {
//       const user = await User.findOne({ email });

//       if (user && await argon2.verify(user.encryptedPassword, password)) {
//         return user.toJSON();
//       }
//       return null;
//     },
//   }, null, {
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   });
//   return router;
// };

// module.exports = buildAdminRouter;