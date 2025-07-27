// routes/auth.js
import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../Middleware/fetchuser.js";

const router = express.Router();

// Make sure to define JWT_SECRET in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret-key";
//Route 1 :createuser:api/auth/createuser
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: "User with this email already exists"
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = new User({ 
        name, 
        email, 
        password: hashedPassword 
      });

      // Save user to database first
      await user.save();

      // Create JWT payload after user is saved
      const payload = {
        user: {
          id: user._id,
        },
      };

      // Sign the JWT token
      const token = jwt.sign(payload, JWT_SECRET,);

      res.status(201).json({
        message: "User created successfully",
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        },
        token: token // Return the token to the client
      });

    } catch (error) {
      console.error("Error creating user:", error);
      
      // Handle duplicate email error
      if (error.code === 11000) {
        return res.status(400).json({
          error: "User with this email already exists"
        });
      }
      
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


//Route 2 :login:api/auth/login

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),  
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        });
      }

      const { email, password } = req.body; 

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      } 

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorect password" });
      }

      // Create JWT payload
      const payload = {
        user: {
          id: user._id,
        },
      };  

      // Sign the JWT token
      const token = jwt.sign(payload, JWT_SECRET,);

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token // Return the token to the client
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);  


//Route 3 :getuser:api/auth/getuser

router.post("/getuser",fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
