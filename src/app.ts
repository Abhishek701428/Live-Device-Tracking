import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import db from './database/db';
import usersRoutes from './modules/users/usersRoutes';
import searchAllRoutes from './modules/search/allRouter';
import overviewRoutes from './modules/overview/overviewRouterAll/routers';
import maintenanceRouter from './modules/maintenance/maintenanceRouterAll/router';
import complianceRouter from './modules/compliance/complianceRouterAll/routers';
import devicesRoutes from './devices/routes/devicesRoutes';
import initWebSocketServer from './devices/webSocketServer/controllers/webSocketserver';

import dotenv from 'dotenv';

dotenv.config();
db();

const app = express();
// WebSocket Server
const server = http.createServer(app);
const io = initWebSocketServer(server);
app.set('socketio', io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hi, I am Hi Tech Project!</h1>`);
});

// Middleware
app.use('/api', usersRoutes);
app.use('/api', searchAllRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/compliance', complianceRouter);
app.use('/api/maintenance', maintenanceRouter);
// Devices Routes
app.use('/api/user', devicesRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
