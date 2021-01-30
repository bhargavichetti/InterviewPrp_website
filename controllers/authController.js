const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Quest = require('../models/question');
const Topics = require('../models/topics');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.get_Topics = (req, res) => {
  Topics.find().then((result) => {res.render('topics', {Topics : result})})
  .catch((err) => console.log(err));
}

module.exports.get_Question_by_id = (req, res) => {
  const id = req.params.id;
  Quest.findById(id).then((result) => {
      res.render('content',{ Question : result });
  }) .catch((error) => console.log(error));

}
module.exports.get_Question_by_name = (req, res) => {
  const name = req.params.name;
  Quest.find({topic : name}).then((result) => {
    res.render('all_questions', {questions : result});
  }).catch((error) => console.log(error));
}
module.exports.get_question_by_topics = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Quest.find({topic : id}).then((result) => res.render('all_questions', {Questions : result}))
  .catch((error) => console.log(error));
  // Quest.find({name : 'Array Sum'}).then((result) => console.log("result : ", result));
  // Quest.find({topic : id}).then((result) => console.log("Abe ab kyu nahi aa rha ", result, id));

}
