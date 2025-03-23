import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Name is required"],
        trim: true,
        maxLength: [100, "Name can not exceed 100 characters"]
    },
    email:{
        type: String,
        required:[true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: [true, "Email must be a in lowercase"],
        maxLength: [100, "Email can not exceed 100 characters"],
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email address"]
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
    }

}, {timestamps: true});

const User = mongoose.model('User',userSchema);
export default User; 
//  Now, let’s create a new file called  user.controller.js  in the  controllers  folder and add the following code to it.
