const Advertisement = require("../models/Advertisement");
const AdvertisementOutstanding = require("../models/AdvertisementUpgradeOutstanding");
const AdvertisementHistory = require("../models/AdvertisementUpgradeHistory");
const ADVERTISEMENT_STATUS = require("../enum/ADVERTISEMENT_STATUS");
const AdvertisementUpgradeOutstanding = require("../models/AdvertisementUpgradeOutstanding");
const sequelize = require('sequelize');

// Function to create a new advertisement
const createAdvertisement = async (advertisementData) => {
  return Advertisement.create({
    ...advertisementData,
    status: ADVERTISEMENT_STATUS.PENDING_APPROVAL,
  });
};

// Function to get all advertisements
const getAllAdvertisements = async () => {
  return Advertisement.findAll();
};

// Function to get all advertisements by user Id
const getAllAdvertisementsByUserId = async (userId) => {
  console.log("123");
  // if (!userId) return [];
  return Advertisement.findAll({
    where: {
      publish_user_id: userId,
    },
  });
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

  return await advertisement.update({
    ...advertisement,
    status: ADVERTISEMENT_STATUS.DELETED,
  });
};

const approveAdvertisement = async (id) => {
  const advertisement = await Advertisement.findByPk(id);
  if (!advertisement) {
    console.log(1);
    throw new Error("Advertisement not found");
  } else {
    console.log(2);
    advertisement.status = ADVERTISEMENT_STATUS.OUTSTANDING;
    await advertisement.save();
    return advertisement;
  }
};

const rejectAdvertisement = async (id) => {
  const advertisement = await Advertisement.findByPk(id);
  if (!advertisement) {
    throw new Error("Advertisement not found");
  } else {
    advertisement.status = ADVERTISEMENT_STATUS.REJECTED;
    await advertisement.save();
    return advertisement;
  }
};

const upgradeAdvertisement = async (id) => {
  const advertisement = await Advertisement.findByPk(id);
  if (!advertisement) {
    throw new Error("Advertisement not found");
  } else {
    const advertisementUpgradeOutstanding =
      await AdvertisementUpgradeOutstanding.create({
        advertisement_id: id,
        date_begin: dateBegin,
        duration: duration,
        service_type: service_type,
        payment_id: payment_id,
      });
      await Advertisement.update(
        {
          status: "U",
        },
        {
          where: {
            id: id,
          },
        }
      );
    return advertisementUpgradeOutstanding;
  }
};

const updateExpiredAdvertisementUpgrade = async () => {
  const adsList = await AdvertisementOutstanding.findAll();
  for (let ad of adsList) {
    if (ad.date_begin.valueOf() + ad.duration > new Date().valueOf()) {
      await AdvertisementHistory.create({
        advertisement_id: id,
        date_begin: dateBegin,
        duration: duration,
        service_type: service_type,
        payment_id: payment_id,
      });
      await Advertisement.update(
        {
          status: "O",
        },
        {
          where: {
            id: id,
          },
        }
      );
      await ad.destroy();
    }
  }
};

const getAdvertisementForGuest = async (pageLimit, page) => {
    return await Advertisement.findAndCountAll({
        where: {
            status: [ADVERTISEMENT_STATUS.OUTSTANDING, ADVERTISEMENT_STATUS.UPGRADED]
        },
        limit: pageLimit,
        offset: (page - 1) * pageLimit
    })
}

const getRelatedAdvertisementForGuest = async () => {
    return await Advertisement.findAndCountAll({
        where: {
            status: [ADVERTISEMENT_STATUS.OUTSTANDING, ADVERTISEMENT_STATUS.UPGRADED]
        },
        limit: 4,
        offset: (page - 1) * pageLimit,
        order: sequelize.random()

    })
}

module.exports = {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
  approveAdvertisement,
  rejectAdvertisement,
  getAllAdvertisementsByUserId,
  updateExpiredAdvertisementUpgrade,
  upgradeAdvertisement,
  getAdvertisementForGuest,
  getRelatedAdvertisementForGuest
};
