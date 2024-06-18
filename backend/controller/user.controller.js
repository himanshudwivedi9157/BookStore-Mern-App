
import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcryptjs.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "User created successfully" , user:{
      _id:createdUser._id,
      fullname:createdUser.fullname,
      email:createdUser.email,
    }});
  } catch (error) {
    // Handle errors
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Compare passwords
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // If passwords match, respond with success message and user data
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      // Handle errors
      console.error("Error in login:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  