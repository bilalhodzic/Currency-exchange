const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const rates = require("./exchangeRates");
const { checkBody } = require("./helpers");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Hello world");
});

/* {
"fromCurrency": "BAM",
"toCurrency": "BRL",
"value": 100
} */
router.post("/exchange", (req, res) => {
  //first check if there are error in the body sent
  let error = checkBody(req.body);
  if (error != null) {
    return res.send(error);
  }

  //to which currency it must be exchanged
  var toCurrency = `to${req.body.toCurrency}`;

  //a variable to check if there's direct exchange path --e.x BAMtoBRL
  var exchangeCurrency = `${req.body.fromCurrency}${toCurrency}`;

  //where will we store final details
  var finalResults = [];

  var directExhange = null;

  //loop over all exchange rates
  for (rate in rates) {
    //if direct conversion exist
    if (rate === exchangeCurrency) {
      //store the results in a array of objects
      finalResults.push({
        conversionCurrency: `${req.body.fromCurrency} ${toCurrency}`,
        conversionRate: rates[rate],
        finalAmount: req.body.value * rates[rate],
      });

      //it will always return last added(previous line) item in array
      directExhange = finalResults.slice(-1)[0];
      break;
    } else {
      //find middle and destination currency exchange rate //BAM -> USD(middle) ->BRL
      let middleExchanger = `${rate.slice(0, 3)}${toCurrency}`;
      let middleCurrency = `${rate.slice(0, 3)}`;

      if (middleExchanger === rate) {
        //convert from source currency to middle currency --BAMtoUSD
        let firstConversion =
          req.body.value * rates[`${req.body.fromCurrency}to${middleCurrency}`];

        //convert from middle to destination currency --USDtoBRL
        let secondConversion = firstConversion * rates[rate];

        //pusht the result so we can compare them later
        finalResults.push({
          firstConversion: `${req.body.fromCurrency} to ${middleCurrency}`,
          firstConversionRate:
            rates[`${req.body.fromCurrency}to${middleCurrency}`],
          firstAmount: `${req.body.value} ${req.body.fromCurrency} = ${firstConversion} ${middleCurrency}`,
          finalConversion: `${middleCurrency} to ${req.body.toCurrency}`,
          finalConversionRate: rates[rate],
          finalAmount: secondConversion,
        });
      }
    }
  }

  //sort array by the final amoount
  //first item will be the bigest amount you get
  finalResults.sort((a, b) => b.finalAmount - a.finalAmount);

  //if there was direct exchange --print it-- else print first item of results
  return res.send(directExhange === null ? finalResults[0] : directExhange);
});

module.exports = router;
