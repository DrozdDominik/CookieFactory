const express = require("express");
const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");
const { getCookieSettings } = require("../utils/get-cookie-settings");
const { handlebarsHelpers } = require("../utils/handlebars-helpers");

const orderRouter = express.Router();

orderRouter
.get('/summary', (req, res) => {

  const {sum, addons, cookieBase, allAddons, allBases} = getCookieSettings(req);

    res.render('order/summary', {
      cookie: {
        base: cookieBase,
        addons,
      },
      bases: allBases,
      addons: allAddons,
      sum,
    })
})
.get('/thanks', (req, res) => {

  const {sum} = getCookieSettings(req);

    res
    .clearCookie('cookieBase')
    .clearCookie('cookieAddons')
    .render('/order/thanks', {
      sum,
    })
})

module.exports = {
  orderRouter,
};
