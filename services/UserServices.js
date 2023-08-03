const User = require("../models/User");
const USER_STATUS = require("../enum/USER_STATUS");
const ROLE = require("../enum/ROLE");
// Create a new User
exports.createUser = async (userData) => {
  return User.create(userData);
};

// Retrieve all Users
exports.getAllUsers = async () => {
  return User.findAll({

    where: {
      role: ROLE.OWNER
    }
  }
  );
};

// Retrieve a User by ID
exports.getUserById = async (userId) => {
  return User.findByPk(userId);
};

// Update a User
exports.updateUser = async (userId, userData) => {
  return User.update(userData, {
    where: {
      id: userId,
    },
  });
};

// Delete a User
exports.deleteUser = async (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

exports.activeUser = async (userId) => {
  let user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  } else {
    user.status = USER_STATUS.ACTIVE;
    await user.save();
  }
};

exports.disableUser = async (userId) => {
  let user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  } else {
    user.status = USER_STATUS.DISABLED;
    await user.save();
  }
};

exports.getUserListByStatus = async (status) => {
  return User.findAll({
    where: {
      status: status
    }
  })
};
