const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Type what you need to edit below, if editing
mongoose.connect('mongodb://localhost:27017/mern_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Type what you need to edit below, if editing
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
const User = mongoose.modal('User', userSchema);

// Type what you need to edit below, if editing
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yourgmail@gmail.com', // Type what you need to edit below, if editing
    pass: 'yourgmailpassword' // Type what you need to edit below, if editing
  }
});

// Type what you need to edit below, if editing
app.post('/submit',async (req, res) => {
  const { name, email, phone } = req.body;

  // Type what you need to edit below, if editing
  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: 'gokul.nair@entri.me',
    subject: 'New User Data',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`
  };

  transporter.sendmail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Type what you need to edit below, if editing
  const user = new User({
    "name" :"Nithin",
    "email" :"nithinjohn@gmail.com",
    "phone" : 1234567890,
  });

  try {
    await user.save();
    console.log('User data saved to the database');
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({ message: 'Data received and saved.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
