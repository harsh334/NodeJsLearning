const { log } = require('console');
const mongoose = require('mongoose');

const dbConnect  = async ()=>{mongoose.connect(
   "mongodb+srv://LearningMongo:lZAFodr55fcMUrcl@cluster0.drbbk.mongodb.net/"
)}

module.exports = dbConnect;