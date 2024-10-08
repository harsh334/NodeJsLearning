const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
	password:{
		type:String,
		required:true
	}
},{timestamps:true});

//schema methods
userSchema.methods.getJWT = function (){
	const user = this;
	const token = jwt.sign({_id:user._id},"privateKeyThatOnlyServerAndIKnows",{expiresIn:"7d"});
	return token;
}

userSchema.methods.validatePassword = function (password){
	const user = this;
	const hasedPassword = user.password;
	const isPasswordValid = bcrypt.compare(password,hasedPassword);
	return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
