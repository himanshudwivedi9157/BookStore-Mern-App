
import mongoose from "mongoose";

// Define a Mongoose schema for the user
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique across users
    },
    password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

export default User; // Export the User model
