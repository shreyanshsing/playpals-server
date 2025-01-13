import express from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import router from './services/router';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});