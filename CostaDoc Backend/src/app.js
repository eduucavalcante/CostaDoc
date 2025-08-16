import express from 'express';
import User from './models/User.js';
import Cliente from './models/Cliente.js';
import Imovel from './models/Imovel.js';
import registerRoutes from './routes/router.js';
import loginRoutes from './routes/loginRouter.js';
import privateRoutes from './routes/privateRouter.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/v1/', loginRoutes);
app.use('/api/v1/', registerRoutes);
app.use('/api/v1/', privateRoutes);

export default app;