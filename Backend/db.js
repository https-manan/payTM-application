const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;


const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(' Connected to MongoDB');
  } catch (err) {
    console.error(' MongoDB connection error:', err);
  }
};

connectDB();


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
});


const accountSchema = new mongoose.Schema({
  userId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true,
  },
  balance:{
      type: Number,
      required: true
  }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account',accountSchema)
module.exports = {User,Account};
