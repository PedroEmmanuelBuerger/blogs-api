const express = require('express');

const loginRoute = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const categoryRoute = require('./routers/categoryRouter');
const postRoute = require('./routers/postRouter');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRouter);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);

app.use((error, _req, res, _next) => res.status(error.status).json({ message: error.message }));

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
