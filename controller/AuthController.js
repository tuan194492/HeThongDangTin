const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const PaymentAccount = require("../models/PaymentAccount");
const dotenv = require("dotenv");
const ROLE = require("../enum/ROLE");
const USER_STATUS = require("../enum/USER_STATUS");
dotenv.config();

// Access the JWT secret as an environment variable
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        return res.status(401).json({ error: "Email is not exist." });
      } else {
        if (user.status == 'D') {
          return res.status(401).json({ error: "Your Account have been disabled. Please contact Admin for enable!" });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: "Password is not correct." });
        }
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
        expiresIn: "30m",
      });
      res.json({
        token: token,
        user: user,
        role: user.role,
        message: "Login successful",
      });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal User Error" });
    });
};

exports.register = async (req, res) => {
  const { email, password, name, facebook, phone_number, zalo_number } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({ email, password: hashedPassword, role: ROLE.OWNER, status: USER_STATUS.ACTIVE, name, facebook, phone_number, zalo_number });
    await PaymentAccount.create({
      id: user.id,
      balance_amt: 0
    })
    // Respond with a success message
    res.json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.sendStatus(500);
  }
};

exports.createAdmin = async (req, res) => {
  const { email, password, name, facebook, phone_number, zalo_number } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await User.create({ email, password: hashedPassword, role: ROLE.ADMIN, status: USER_STATUS.ACTIVE, name, facebook, phone_number, zalo_number });

    // Respond with a success message
    res.json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.sendStatus(500);
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    console.log(err)
    if (err) {
      return res.status(403).json({message: 'Token expired. Please login again'});
    }
    req.user = user;
    console.log("USER from token", req.user);
    next();
  });
};

exports.authorizeAdmin = (req, res, next) => {
  // Check if the user is authenticated (should be done after `authenticateToken` middleware)
  console.log("User", req.user);
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No authentication token provided." });
  }

  // Check if the user has the "admin" role
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(403).json({
      error: "Forbidden: You are not authorized to access this endpoint.",
    });
  }

  // If the user has the "admin" role, allow access to the endpoint
  next();
};

exports.authorizeOwner = (req, res, next) => {
  // Check if the user is authenticated (should be done after `authenticateToken` middleware)
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No authentication token provided." });
  }

  // Check if the user has the "admin" role
  if (req.user.role !== ROLE.OWNER) {
    return res.status(403).json({
      error: "Forbidden: You are not authorized to access this endpoint.",
    });
  }

  // If the user has the "admin" role, allow access to the endpoint
  next();
};
