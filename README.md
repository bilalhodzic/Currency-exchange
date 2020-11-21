# Currency-exchange

## Documentation
**POST('/exchange')** Endpoint accept following payload sent through the body:
```
{
"fromCurrency": "BAM", 
"toCurrency": "BRL",
"value": 100
}
```
Currencies must be typed in the **capital** leters and only following currencies are accepted: **BAM, BRL, EUR, USD**

-Endpoint will return the most user-favorable exchange path (Biggest amount you can get) :
```
{
    "firstConversion": "BAM to USD", //BAM is first exchanged to USD
    "firstConversionRate": 0.6068918640076711,
    "firstAmount": "100 BAM = 60.68918640076711 USD",
    "finalConversion": "USD to BRL",
    "finalConversionRate": 5.528038209800106,
    "finalAmount": 335.4921413451216 //Total amount from conversion
}
```
