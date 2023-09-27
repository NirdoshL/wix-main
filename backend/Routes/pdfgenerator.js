const express = require("express");
const router = express.Router();
const { htmltopdf } = require("../middleware/puppeterInvoice");

router.post("/generatepdf", htmltopdf);

module.exports = router;
