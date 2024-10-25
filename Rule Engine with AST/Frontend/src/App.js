import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rule, setRule] = useState("");
  const [ruleId, setRuleId] = useState(null);
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [result, setResult] = useState(null);
  const [ast, setAst] = useState(null);
  const [message, setMessage] = useState("");

  const createRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/create",
        { ruleString: rule }
      );
      setMessage("Rule created successfully!");
      // console.log("AST:", response.data.ast);
      console.log("Rule ID:", response.data.ruleId);
      setRuleId(response.data.ruleId);
      setAst(JSON.stringify(response.data.ast, null, 2));
    } catch (error) {
      setMessage("Something went wrong. Please check again!");
    }
  };

  const evaluateRule = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/rules/evaluate/${ruleId}`,
        userData
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error evaluating rule:", error.response ? error.response.data : error.message);
      console.log("Rule ID:", ruleId);
      alert("Error evaluating rule");
    }
  };

  return (
    <div className="App container mt-5 text-center">
      <h1>Rule Engine With AST[Abstract  Tree]</h1>

      <div className="form-group">
        <textarea

          className="form-control mx-auto"
          rows="4"
          placeholder="Enter rule string"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={createRule}>
          Create Rule
        </button>
        <br /><br /><br />
      </div>

      {message && <h2>{message}</h2>}

      <h3>User Data</h3>
      <div className="form-group">
        <input
          className="form-control mx-auto"
          type="number"
          placeholder="Age"
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
        />
        <input
          className="form-control mx-auto"
          type="text"
          placeholder="Department"
          onChange={(e) =>
            setUserData({ ...userData, department: e.target.value })
          }
        />
        <input
          className="form-control mx-auto"
          type="number"
          placeholder="Salary"
          onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
        />
        <input
          className="form-control mx-auto"
          type="number"
          placeholder="Experience"
          onChange={(e) =>
            setUserData({ ...userData, experience: e.target.value })
          }
        />
        <button className="btn btn-success mt-2" onClick={evaluateRule}>
          Evaluate Rule
        </button>
      </div>

      {result !== null && (
        <h3>Result: {result ? "Eligible" : "Not Eligible"}</h3>
      )}

      {ast && (
        <div className="card mt-4 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h5 className="card-title">AST</h5>
            <pre>{ast}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
