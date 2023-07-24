const fileUpload = require("express-fileupload");
const path = require("path");
const { resolve } = require("path");
const absolutePath = resolve("");

const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        file.mv(`${absolutePath}/files/${file.filename}`, (err) => {
            let result;
            if (err) {
              result = {
                success: false,
                data: "Upload file not successful",
              };
              reject(result);
            } else {
              result = {
                success: true,
                data: `/files/${file.name}`,
              };
              resolve(result);
            }
          });
    }) 
  
};

module.exports = { uploadFiles };
