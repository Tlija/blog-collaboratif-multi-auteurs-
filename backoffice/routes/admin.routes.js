const express = require("express");
const {validationResult} = require("express-validator");
const adminController = require("../controllers/admin.controller")

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

router.get('/users', validate, adminController.getAllUsers.bind(adminController));
router.get('/users/:id', validate, adminController.getUserDetails);
router.post('/update-user-status', validate, adminController.updateUserStatus);

module.exports = router;