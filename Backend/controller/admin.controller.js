import Admin from "../model/admin.model.js";
import bcryptjs from "bcryptjs";

export const login2 = async (req, res) => {
  try {
    const { admin_name, admin_email, password } = req.body;

    console.log("Request Body:", req.body);

    const admin = await Admin.findOne({ admin_email });
    if (admin) {
      console.log("Admin already exists:", admin);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 8);
    console.log("Hashed Password:", hashPassword);

    const newAdmin = new Admin({
      admin_name: admin_name,
      admin_email: admin_email,
      password: hashPassword,
    });

    const savedAdmin = await newAdmin.save();
    console.log("Saved Admin:", savedAdmin);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};