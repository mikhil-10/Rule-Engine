const express = require("express");
const router = express.Router();
const Rule = require("../models/Conn");
const { parseRule, evaluateRule } = require("../utils/Rule");
router.post("/create", async (req, res) => {
  const { ruleString } = req.body;

  try {
    const ast = parseRule(ruleString);
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json({ message: "Rule created", ast, ruleId: rule._id }); 
  } catch (error) {
    res.status(400).json({ error: "Invalid rule format" });
  }
});

router.post("/evaluate/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const rule = await Rule.findById(id);
    if (!rule) {
      return res.status(404).json({ error: "Rule not found" });
    }


    // console.log("Rule AST:", rule.ast);
    // console.log("User Data:", data);
    const result = evaluateRule(rule.ast, data);
    //console.log("Evaluation Result:", result);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during evaluation" });
  }
});


module.exports = router;
