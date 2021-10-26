const express = require("express");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { errorRender } = require("../utils/error-render");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");

const configuratorRouter = express.Router();

configuratorRouter
.get("/select-base/:baseName", (req, res) => {
  const { baseName } = req.params;

  if(!COOKIE_BASES[baseName]) {
    return errorRender(res, `There is no such base as ${baseName}.`);
  }

  res
    .cookie("cookieBase", baseName)
    .render("configurator/base-selected", { baseName });
})
.get('/add-addon/:addonName', (req, res) => {
  const { addonName } = req.params;
 
  if(!COOKIE_ADDONS[addonName]) {
   return errorRender(res, `There is no such addon as ${addonName}.`);
  }

  const addons = getAddonsFromReq(req);

  if(addons.includes(addonName)) {
   return errorRender(res, `${addonName} addon is already on your cookie. You cannot add it twice.`);   
  }

  addons.push(addonName);

  res.cookie('cookieAddons', JSON.stringify(addons))
  .render('configurator/addon-selected', { addonName });
})
.get('/delete-addon/:addonName', (req, res) => {
  const { addonName } = req.params;
 
  const oldAddons = getAddonsFromReq(req);

  if(!oldAddons.includes(addonName)) {
    return errorRender(res, `Cannot delet something that isn't already added to the cookie.
    ${addonName} addon not found on cookie.`);
  }

  const addons = oldAddons.filter(addon => addon !== addonName);
 
  res.cookie('cookieAddons', JSON.stringify(addons))
  .render('configurator/addon-deleted', { addonName });
});

module.exports = {
  configuratorRouter,
};
