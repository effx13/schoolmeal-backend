import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';
import moment from 'moment';

const router = express.Router();

router.get('/', (req, res) => {
  const { region, schulCode, schulCrseScCode, schMmealScCode, schYmd } = req.query;
  const url: string = `http://stu.${region}.go.kr/sts_sci_md01_001.do?schulCode=${schulCode}&schulCrseScCode=${String(schulCrseScCode).replace(/(^0+)/, '')}&schMmealScCode=${schMmealScCode}&schYmd=${schYmd}`;
  axios({
    method: 'get',
    url,
  })
    .then((response) => {
      const $ = cheerio.load(response.data);
      const day: number = Number(moment(String(schYmd), 'YYYY.MM.DD').day()) + 2;
      const meal = $(`#contents > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(${day})`).html()?.split('<br>');
      meal?.pop();
      if (meal?.length === 0) {
        throw new Error('NoMealError');
      }
      const data = { status: 'OK', meals: meal };
      res.json(data);
    })
    .catch((e) => {
      const data = { status: 'ERROR', error: e.message };
      res.status(400).json(data);
    });
});

export default router;
