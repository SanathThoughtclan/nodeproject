const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:admin@mongodb:27017/signup';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const Signup = mongoose.model('Signup', signupSchema);

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
  });

  app.post('/signup', async (req, res) => {
    try {
      const newSignup = new Signup({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
  
      await newSignup.save();
      res.send('Signup successful');
    } catch (err) {
      console.error('Failed to save signup data', err);
      res.status(500).send('Failed to save signup data');
    }
  });
  

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
