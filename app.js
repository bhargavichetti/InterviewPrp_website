const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const Quest = require('./models/question');
const {default : AdminBro} = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');


AdminBro.registerAdapter(AdminBroMongoose);

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Bhargavi:test1234@cluster0.b73md.mongodb.net/node-auth';
const url = 'mongodb+srv://Bhargavi:test1234@cluster0.b73md.mongodb.net/node-auth';
let mongooseDb;
const databaseConnect = async () => {
  mongooseDb = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we are connected to database");
  });
  
  // console.log(mongooseDb);
  run(mongooseDb);
  
};
databaseConnect();
// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/topics', requireAuth, authController.get_Topics);
app.get('/topics/:id', requireAuth, authController.get_question_by_topics);
app.get('/questions/:id', requireAuth, authController.get_Question_by_id);


//adminbro panel
const buildAdminRouter = require('./adminbro/admin.router');
const adminBro = require('./adminbro/admin.options');
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

app.use(authRoutes);