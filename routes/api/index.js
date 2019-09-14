const router = require("express").Router();
const boatRoutes = require("./boats");
const userRoutes = require("./users");
const whiteLabelRoutes = require('./whiteLabels');
const charterInquiryRoutes = require('./charterInquiries');

router.use("/boats", boatRoutes);
router.use("/users", userRoutes);
router.use("/whitelabels", whiteLabelRoutes)
router.use("/charterinquiries", charterInquiryRoutes);

module.exports = router;
