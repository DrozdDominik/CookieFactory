const express = require("express");

const orderRouter = express.Router();

orderRouter
.get('/summary', (req, res) => {

  const { cookieBase } = req.cookies;
  
  const addons = getAddonsFromReq(req);

  const sum =
    (cookieBase
      ? handlebarsHelpers["find-price"](
          Object.entries(COOKIE_BASES),
          cookieBase
        )
      : 0) +
    addons.reduce(
      (prev, curr) =>
        prev +
        handlebarsHelpers["find-price"](Object.entries(COOKIE_ADDONS), curr),
      0
    );

    res.render('order/summary', {
      cookie: {
        base: cookieBase,
        addons,
      },
      bases: Object.entries(COOKIE_BASES),
      addons: Object.entries(COOKIE_ADDONS),
      sum,
    })
})

module.exports = {
  orderRouter,
};
