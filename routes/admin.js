const express = require("express");
var router = express.Router();
const dashboard = require("../controllers/admin/dashboard");
const employee = require("../controllers/admin/employee");
const meal = require("../controllers/admin/mealRecord");
const priceCont = require("../controllers/admin/priceCont");
const additionalMeal = require("../controllers/admin/additionalMeal");
const mealComplaint = require("../controllers/admin/mealComplaint");
const skipMeal = require("../controllers/admin/skipMeal");

router.route("/dashboard").get(dashboard.data);

router.route("/meal-record").get(meal.data);
router.route("/meal-record-dropdown-filter").get(meal.dropDownFilter);

router.route("/details").get(employee.data).patch(employee.handleSubscription);
router.route("/details-dropdown-filter").get(employee.dropdownFilter);

router
  .route("/meal-price")
  .get(priceCont.getMealPrice)
  .patch(priceCont.updateMealPrice);

router.route("/meal-cont").get(priceCont.getCont).patch(priceCont.updateCont);

router.route("/additional-meal").post(additionalMeal.mealReq);

router
  .route("/meal-complaint")
  .get(mealComplaint.getMealComplaint)
  .patch(mealComplaint.resolveMealComplaint);

router.route("/skip-meal").post(skipMeal.skipEveryoneMeal);
router.route("/get-all-skip-meal").get(skipMeal.getAllMealSkips);
router
  .route("/delete-single-all-skip-meal")
  .delete(skipMeal.deleteSingleAllMealSkip);

router.route("/view-employee-meal-skip").get(skipMeal.getEmployeeMealSkips);
router
  .route("/delete-employee-meal-skip")
  .delete(skipMeal.deleteEmployeeMealSkipDate);
module.exports = router;
