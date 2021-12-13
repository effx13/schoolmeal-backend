import express from 'express';
import { school, meal } from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/school', school);
app.use('/meal', meal);

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
