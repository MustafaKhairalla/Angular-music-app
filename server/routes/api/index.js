const router = require("express").Router();
const listsRoutes = require("./lists");

// list routes
router.use("/lists", listsRoutes);


module.exports = router;
