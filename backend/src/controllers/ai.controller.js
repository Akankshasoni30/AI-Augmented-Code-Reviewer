const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code || req.query.code || req.query.prompt;

  if (!code) {
    return res.status(400).send("Code or prompt is required");
  }

  try {
    const review = await aiService(code);
    res.json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
