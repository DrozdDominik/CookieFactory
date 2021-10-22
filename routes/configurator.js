const express = require("express");

const configuratorRouter = express.Router();

configuratorRouter.get("/select-base/:baseName", (req, res) => {
  const { baseName } = req.params;
  res
    .cookie("cookieBase", baseName)
    .render("configurator/base-selected", { baseName });
})
.get('/add-addon/:addonName', (req, res) => {
  const { addonName } = req.params;
  let currentCookies;
  currentCookies = req.cookies.cookieAddons ?? [];  
  currentCookies.push(addonName);

  res.cookie('cookieAddons', currentCookies)
  .render('configurator/addon-selected', { addonName });
});

module.exports = {
  configuratorRouter,
};
