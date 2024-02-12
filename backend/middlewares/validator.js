const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check("subject").trim().not().isEmpty().withMessage("Subject is required"),
  check("department")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Department is required"),
  check("amount").trim().not().isEmpty().withMessage("Amount is required"),
  check("reason").trim().not().isEmpty().withMessage("Reason is required"),
];

exports.validateUser = [
  check("email").trim().not().isEmpty().isEmail().withMessage("Invalid email"),
  check("password").trim().isLength({ min: 6 }).withMessage("Invalid password"),
  check("name").trim().not().isEmpty().withMessage("Name is required"),
];

exports.validateLogin = [
  check("email").trim().not().isEmpty().isEmail().withMessage("Invalid email"),
  check("password").trim().isLength({ min: 6 }).withMessage("Invalid password"),
];

exports.validateEvent = [
  check("title").trim().not().isEmpty().withMessage("Name is required"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  check("date").trim().not().isEmpty().withMessage("Date is required"),
  check("teamSize")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Team size is required")
    .isNumeric()
    .withMessage("Team size must be a number"),
];

exports.validateDepartment = [
  check("name").trim().not().isEmpty().withMessage("Name is required"),
  check("executiveId").trim().not().isEmpty().withMessage("Event is required"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
];

exports.validateFormInputMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
