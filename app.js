const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const fileUpload = require('express-fileupload')
const databaseInit = require("./utils/function");
const route = require('./routes/index');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "files")))
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

databaseInit();
route(app);


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
