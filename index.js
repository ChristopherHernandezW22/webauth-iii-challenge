const server = require('./api/server.js');

const server = express();

server.use(cor());
server.use(express.json());
server.use(session(sessionConfig));

const authRouter = require('./users/router');
server.use('/auth', authRouter);
const usersRouter = require('./users/model');
server.use('/users', usersRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));