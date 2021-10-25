const express = require("express");
const { COOKIE_ADDONS } = require("../data/cookies-data");
const { errorRender } = require("../utils/error-render");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");

const configuratorRouter = express.Router();

configuratorRouter
.get("/select-base/:baseName", (req, res) => {
  const { baseName } = req.params;
  res
    .cookie("cookieBase", baseName)
    .render("configurator/base-selected", { baseName });
})
.get('/add-addon/:addonName', (req, res) => {
  const { addonName } = req.params;
 
  if(!COOKIE_ADDONS[addonName]) {
    errorRender(res, `There is no such addon as ${addonName}.`);
    return;
  }

  const addons = getAddonsFromReq(req);

  if(addons.includes(addonName)) {
    errorRender(res, `${addonName} addon is already on your cookie. You cannot add it twice.`);   
    return;
  }

  addons.push(addonName);

  res.cookie('cookieAddons', JSON.stringify(addons))
  .render('configurator/addon-selected', { addonName });
})
.get('/delete-addon/:addonName', (req, res) => {
  const { addonName } = req.params;
 
  const addons = getAddonsFromReq(req).filter(addon => addon !== addonName);
 
  res.cookie('cookieAddons', JSON.stringify(addons))
  .render('configurator/addon-deleted', { addonName });
});

module.exports = {
  configuratorRouter,
};
