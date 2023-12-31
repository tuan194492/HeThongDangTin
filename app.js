const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const fileUpload = require('express-fileupload')
const databaseInit = require("./utils/function");
const route = require('./routes/index');
const advertisementServices = require("./services/AdvertisementServices");
var cors = require('cors')

const app = express();
const port = 3000;

app.use(cors()) // Use this after the variable declaration

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "files")))
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

databaseInit();
route(app);


setInterval(async () => {
  console.log('running a task every 30 secs');
  await advertisementServices.updateExpiredAdvertisementUpgrade();
}, 1000 * 30);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
