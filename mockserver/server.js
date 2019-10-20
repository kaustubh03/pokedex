const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const fourWheelerProductInfo = require('./4wcarInfo.json');
const salesHomeInfo = require('./salesHomeInfo.json');
const insuranceProduct = require('./insuranceProduct.json');
const fourWheelerProductVariants = require('./4wcarVariants.json');
const fourWheelerProductRegistration = require('./4wcarRegister.json');
const fourWheelerExpire = require('./4wcarExpire');
const agentInfo = require('./agentInfo.json');

app.use(cors());

app.post('/chlbwp/home/', (req, res) => {
  let response = homeApiData;
  if (Math.random() * 100 < 50) {
    response = homeApiDataPremium;
  }
  return res.json(response);
});
app.post('/chlbwp/feed/:id', (req, res) => res.json(offerFeed));

app.get('/pos/sales/home', (req, res) => res.json(salesHomeInfo));
app.get('/pos/sales/product', (req, res) => res.json(insuranceProduct));

/*
  Onboarding Mocks
*/
app.get('/v1/public/pos/getAgentInfo', (req, res) => res.json(agentInfo));

/*
  Sales Mocks
*/
app.get('/pos/productDetails/4w/first', (req, res) =>
  res.json(fourWheelerProductInfo)
);
app.get('/pos/productDetails/4w/variants', (req, res) =>
  res.json(fourWheelerProductVariants)
);
app.get('/pos/productDetails/4w/register', (req, res) =>
  res.json(fourWheelerProductRegistration)
);
app.get('/pos/productDetails/4w/expire', (req, res) =>
  res.json(fourWheelerExpire)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
