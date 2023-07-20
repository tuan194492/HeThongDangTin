const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoute')
const databaseInit = require('./utils/function')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

databaseInit()


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})

