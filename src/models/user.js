const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required:true
	},
	lastName: {
		type: String,
		validate(value){
			if(!["kumar","sharma"].includes(value)){
				throw new Error("lastname can only be kumar or sharma");
			}
		}
	},
	emailId: {
		type: String,
		required:true,
		lowercase:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("not a valid mail");
			}
		}
	},
	age: {
		type: Number,
		min:2
	},
	gender: {
		type: String,
		default:'male',
	},
},{timestamps:true});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
