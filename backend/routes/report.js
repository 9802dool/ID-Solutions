const express = require("express");
const generateCaseReport = require("../docxGenerator");
const router = express.Router();

router.post("/generate-report", async (req, res) => {
  const { evidence, analysis, recommendations, cross } = req.body;

  const filename = await generateCaseReport(
    evidence,
    analysis,
    recommendations,
    cross
  );
  res.download(filename);
});

module.exports = router;
