import express from 'express';
import qs from 'qs';
import axios from 'axios';

const router = express.Router();

router.get('/', (req, res) => {
  const { query, region } = req.query;
  axios({
    method: 'get',
    url: `https://par.${region}.go.kr/spr_ccm_cm01_100.do`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      kraOrgNm: query,
    }),
  })
    .then((response) => {
      let schools = response.data.resultSVO.data.orgDVOList;
      schools.sort((a: { kraOrgNm: string }, b: { kraOrgNm: string }) => {
        if (a.kraOrgNm < b.kraOrgNm) {
          return -1;
        }
        if (a.kraOrgNm > b.kraOrgNm) {
          return 1;
        }
        return 0;
      });
      schools = schools.slice(0,5).map((school: { [x: string]: any; sqlAction: any; zipAdres: any; atptOfcdcNm: any; atptOfcdcOrgCode: any; schulCrseScCodeNm: any; })=>{
        const {sqlAction, zipAdres, atptOfcdcNm, atptOfcdcOrgCode, schulCrseScCodeNm, ...rest} = school;
        return rest;
      });
      const data = {
        status: 'OK',
        count: schools.length,
        schools
      };
      res.json(data);
    })
    .catch((e) => {
      const data = { status: 'ERROR', error: e.message };
      res.status(400).json(data);
    });
});

export default router;
