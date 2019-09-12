const router = require("express").Router();
const boatRoutes = require("./boats");
const userRoutes = require("./users");
const whiteLabelRoutes = require('./whiteLabels')

router.use("/boats", boatRoutes);
router.use("/users", userRoutes);
router.use("/whitelabels", whiteLabelRoutes)

module.exports = router;
