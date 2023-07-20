const User = require('../models/User');

// Create a new User
exports.createUser = (userData) => {
  return User.create(userData);
};

// Retrieve all Users
exports.getAllUsers = () => {
  return User.findAll();
};

// Retrieve a User by ID
exports.getUserById = (userId) => {
  return User.findByPk(userId);
};

// Update a User
exports.updateUser = (userId, userData) => {
  return User.update(userData, {
    where: {
      id: userId,
    },
  });
};

// Delete a User
exports.deleteUser = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

