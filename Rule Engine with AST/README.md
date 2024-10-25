# Project Title  
**Assignment 1 || Rule Engine with AST**

---

## Description
Develop a simple 3-tier rule engine application (Simple UI, API, Backend, Data) to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of rules.

---

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Design Choices](#design-choices)
- [Dependencies](#dependencies)
- [Outro](#outro)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. **Dependency Installation**

    **2.1 For Backend:**
   - `npm install mongoose` # For Database  
   - `npm install express`  # For API  

    **2.2 For Frontend:**
   - `npm install react`
   - `npm install axios`  # To communicate with APIs
   - `npm install bootstrap` # To enhance UI  

---

## Usage

### Backend
   - **Navigate to Backend Directory:**
     ```bash
     cd backend
     ```
   - **Run Server:**
     ```bash
     node server.js  # Runs the server on port 5000. Change port if needed.
     ```
   - **Testing**  
     Use Postman or other API clients to send HTTP requests to API endpoints.

### Frontend
   - **Navigate to Frontend Directory:**
     ```bash
     cd frontend
     ```
   - **Run Application:**
     ```bash
     npm start  # Launches application on localhost:3000
     ```

---

## Design Choices

### 1. **Architecture**

   - **3-Tier Architecture:**
     - **Presentation Layer (Frontend):** Built with React.js for user interaction.
     - **API Layer (Backend):** A RESTful API built with Node.js and Express.
     - **Data Layer (Database):** MongoDB for storing rules, AST representations, and user data.

### 2. **Data Structure for AST**

   - **Node Structure:**
     ```javascript
     class Node {
         constructor(type, value = null, left = null, right = null) {
             this.type = type; // "operator" or "operand"
             this.value = value; // comparison string (e.g., "age < 30")
             this.left = left; // left child node
             this.right = right; // right child node
         }
     }
     ```
   - **AST Representation:**
     - Represented as a tree structure where each node is an operator (AND/OR) or operand (conditions).

### 3. **Database Choice**

   - **MongoDB**
     - **Reason:** JSON-like structure supports dynamic rule storage and retrieval.
     - **Schema Design:**
       ```json
       {
           "rules": [
               {
                   "_id": "ObjectId",
                   "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
                   "ast": { /* AST representation */ },
                   "createdAt": "Date"
               }
           ],
           "users": [
               {
                   "_id": "ObjectId",
                   "age": "Number",
                   "department": "String",
                   "salary": "Number",
                   "experience": "Number"
               }
           ]
       }
       ```

### 4. **API Design**

   - **Endpoints:**
     - **`POST /api/rules/create`**
       - **Purpose:** Create a rule from a string and return its AST.
       - **Request Body:** `{ "ruleString": "((age > 30 AND department = 'Sales') ... )" }`
       - **Response:** `{ "ast": { /* AST */ }, "ruleId": "ObjectId" }`

     - **`POST /api/rules/combine`**
       - **Purpose:** Combine multiple rules into a single AST.
       - **Request Body:** `{ "rules": ["rule1", "rule2"] }`
       - **Response:** `{ "combinedAst": { /* AST */ } }`

     - **`POST /api/rules/evaluate/:ruleId`**
       - **Purpose:** Evaluate the rule against user data.
       - **Request Body:** `{ "data": { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 } }`
       - **Response:** `{ "result": true }`

### 5. **Evaluation Logic**

   - **Evaluate Rule Function:**
     ```javascript
     function evaluateRule(ast, userData) {
         if (ast.type === 'operand') {
             const [key, operator, value] = parseCondition(ast.value);
             return compare(userData[key], operator, value);
         } else if (ast.type === 'operator') {
             const leftResult = evaluateRule(ast.left, userData);
             const rightResult = evaluateRule(ast.right, userData);
             return ast.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
         }
     }
     ```

### 6. **Error Handling and Validation**

   - Handles invalid rule strings, incorrect user data formats, and missing attributes.

### 7. **Future Enhancements**

   - **Advanced Conditions:** User-defined functions for complex conditions.
   - **UI Enhancements:** Allow rule modification from the frontend.
   - **Nested Rule Handling:** Advanced data structures for nested rules.

---

## Dependencies

### Frontend (React)
   - **React:** UI library
   - **Axios:** HTTP client for API communication
   - **Bootstrap (optional):** For responsive design

### Backend (Node.js)
   - **Express:** Web framework
   - **Mongoose:** MongoDB object modeling
   - **Body-parser:** Middleware for request parsing
   - **Cors:** Middleware for CORS handling
   - **Nodemon:** Automatic server restarts on changes

---

## Outro

Thank you .
