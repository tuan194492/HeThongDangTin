const Advertisement = require("../models/Advertisement");

// Function to create a new advertisement
const createAdvertisement = async (advertisementData) => {
  return Advertisement.create(advertisementData);
};

// Function to get all advertisements
const getAllAdvertisements = async () => {
  return Advertisement.findAll();
};

// Function to get a single advertisement by ID
const getAdvertisementById = async (id) => {
  return Advertisement.findByPk(id);
};

// Function to update an existing advertisement
const updateAdvertisement = async (id, advertisementData) => {
  const advertisement = await Advertisement.findByPk(id);

  if (!advertisement) {
    throw new Error("Advertisement not found");
  }

  return advertisement.update(advertisementData);
};

// Function to delete an advertisement by ID
const deleteAdvertisement = async (id) => {
  const advertisement = await Advertisement.findByPk(id);

  if (!advertisement) {
    throw new Error("Advertisement not found");
  }

  return advertisement.destroy();
};

module.exports = {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
};
