const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferControllers");

router.get("/", transferController.getTransfers);
router.post("/", transferController.createTransfer);
router.delete("/:id", transferController.deleteTransfer);

module.exports = router;
