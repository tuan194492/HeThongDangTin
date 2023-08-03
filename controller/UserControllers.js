const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const PaymentAccount = require("../models/PaymentAccount");
const userService = require("../services/UserServices");
const fileServices = require("../services/FilesServices");
// Create a new User
exports.createUser = async (req, res) => {
  // Validate request data
  await validateUser({ req });

  // If there are validation errors, return them as the response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = req.body;

  userService
    .createUser(userData)
    .then((user) => {
      PaymentAccount.create({
        id: user.id,
        balance_amt: 0
      })
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating user" });
    });
};

exports.createAdmin = async (req, res) => {
  // Validate request data
  await validateUser({ req });

  // If there are validation errors, return them as the response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = req.body;

  userService
    .createUser(userData)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating user" });
    });
};

// Get all Users
exports.getAllUsers = (req, res) => {
  userService
    .getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving users" });
    });
};

exports.activeUser = async (req, res) => {
  try {
    const {id} = req.params;
    await userService.activeUser(id);
    res.status(200).json({ error: "Active User successful!" });
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: "User not found" });
  }
}

exports.disableUser = async (req, res) => {
  try {
    const {id} = req.params;
    await userService.disableUser(id);
    res.status(200).json({ error: "Disable User successful!" });
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
}


// Get a User by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  userService
    .getUserById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving user" });
    });
};

// Update a User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  let userData = req.body;
  let avatar, result;
  if (req.files) {
    avatar = req.files.avatar;
    result = await fileServices.uploadFiles(avatar);
    if (result.success) {
      userData = { ...userData, image: result.data };
    } else {
      res.status(500).json({ error: `Error updating user. ${result.data}` });
    }
  }
  
  

  userService
    .updateUser(id, userData)
    .then((result) => {
      if (result[0] === 1) {
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error updating user" });
    });
};

const validateUser = async (req) => {
  const validations = [
    check("phone_number").notEmpty().withMessage("Phone number is required."),
    check("name").notEmpty().withMessage("Name is required."),
    check("email").isEmail().withMessage("Email is invalid."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ];

  for (const validation of validations) {
    const result = await validation.run(req);
  }
};
