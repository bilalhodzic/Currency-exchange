module.exports = {
  checkBody: function (body) {
    let error = null;
    let currency = ["BAM", "USD", "BRL", "EUR"];
    if (
      !currency.includes(body.fromCurrency) ||
      !currency.includes(body.toCurrency)
    ) {
      error = `The given currency in the body is bad! Following currencies are accepted: ${currency}`;
    } else if (isNaN(body.value)) {
      error = "The  amount value must be in a number";
    }
    return error;
  },
};
