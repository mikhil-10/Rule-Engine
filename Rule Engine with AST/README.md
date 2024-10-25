# Project Title
Assignment 1 || Rule Engine with AST

## Description
Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification rules.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Design Choices](#design-choices)
- [Dependencies](#dependencies)
-[Outro](#outro)

########**Installation**########
1. **Clone the repository:**
git clone `https://github.com/yourusername/your-repo.git`

2. **Dependency Installation**
    2.1 **for Backend:**
    [1] `npm install react`
    [2] `npm install mongoose` #For Database 
    [3] `npm install express`  #For API

    2.2 ***For Frontend:**
    [1]`npm install react`
    [2]`npm install axios`  #To communicate with APIs
    [3]`npm install bootstrap` #To enhance UI

########**Usage**########
    3.1**For Backend**
    Note::- First go to directory of backend by using `cd backend` 
    [1] `node/nodemon server.js` #To run the server on port 5000 can change port if its clashing with another port on pc
    [2] Use Postman or any other API client to send HTTP requests to the API endpoints
    3.2**For Frontend**
    Note::- First go to directory of Frontend by using `cd frontend` cmd on terminal. Use different terminal for Backend and Frontend. 
    [1] `npm start `  #To run the application.
########**Design Choices**########
    Here's a design choice for your Rule Engine application based on the requirements you provided:
    1. **Architecture**
    **3-Tier Architecture**: 
        - **Presentation Layer (Frontend)**: A simple UI built using React.js for interacting with users.
        - **API Layer (Backend)**: A RESTful API built with Node.js and Express to handle requests from the frontend and communicate with the database.
        - **Data Layer (Database)**: A NoSQL database (like MongoDB) to store rules, AST representations, and user data.
    2. **Data Structure for AST**
    **Node Structure**: 
         Define a `Node` class that will represent the nodes of the AST.
    **javascript-**
       "class Node {
            constructor(type, value = null, left = null, right = null) {
                this.type = type; // "operator" or "operand"
                this.value = value; // comparison string (e.g., "age < 30")
                this.left = left; // left child node
                this.right = right; // right child node (for operators)
            }
        }"
    **AST Representation**: 
      The AST will be represented as a tree structure where each node can be an operator (AND/OR) or an operand (conditions).
    3. **Database Choice**
         **MongoDB**: 
            **Reason**: MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. This is beneficial for storing    dynamic rule structures and allowing easy retrieval and manipulation.
        - **Schema Design**:
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
    4. **API Design**
        - **Endpoints**:
        1. **`POST /api/rules/create`**: 
            - **Purpose**: Create a rule from a rule string and return its AST.
            - **Request Body**: `{ "ruleString": "((age > 30 AND department = 'Sales') ... )" }`
            - **Response**: `{ "ast": { /* AST */ }, "ruleId": "ObjectId" }`
        2. **`POST /api/rules/combine`**: 
            - **Purpose**: Combine multiple rule strings into a single AST.
            - **Request Body**: `{ "rules": ["rule1", "rule2"] }`
            - **Response**: `{ "combinedAst": { /* AST */ } }`
        3. **`POST /api/rules/evaluate/:ruleId`**: 
            - **Purpose**: Evaluate the rule against user data.
            - **Request Body**: `{ "data": { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 } }`
            - **Response**: `{ "result": true }`
    5. **Evaluation Logic**
        - **Evaluate Rule Function**: 
        - Implement a recursive function that traverses the AST and evaluates the conditions against the provided user data.
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
    6. **Error Handling and Validation**
        - Implement error handling for:
        - Invalid rule strings (e.g., syntax errors).
        - Invalid user data formats.
        - Missing required attributes.
        - Validation can include checking the types of user attributes (e.g., ensuring age is a number) and that required attributes are present.
    7. **Future Enhancements**
        - Consider adding:
        - User-defined functions for advanced conditions.
        - UI components to modify existing rules directly from the frontend.
        - More complex data structures for handling nested rules and conditions.
    This design choice outlines a robust architecture and detailed approach to implementing the Rule Engine application with an AST-based logic evaluation system. Feel free to adapt and expand upon it based on your specific needs and any additional features you may want to include!

########**Dependencies**########
        **Frontend (React)**
            React:
            Package: react
            Description: The core library for building user interfaces.

            React DOM:
            Package: react-dom
            Description: Provides DOM-specific methods that can be used at the top level of your app.

            Axios:
            Package: axios
            Description: A promise-based HTTP client for the browser and Node.js, used for making API calls to the backend.

            React Scripts:
            Package: react-scripts
            Description: Includes scripts and configuration used by Create React App.

            Bootstrap (optional):
            Package: bootstrap
            Description: A front-end framework for designing responsive websites. You can include it for styling your application.
            
        **Backend (Node.js)**
            Express:
            Package: express
            Description: A web framework for Node.js, used for building APIs.

            Mongoose:
            Package: mongoose
            Description: A MongoDB object modeling tool designed to work in an asynchronous environment. This will help you define schemas and interact with your MongoDB database.

            Body-parser:
            Package: body-parser
            Description: Middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.

            Cors:
            Package: cors
            Description: Middleware for enabling CORS (Cross-Origin Resource Sharing) to allow your frontend to communicate with the backend.

            Nodemon:
            Package: nodemon
            Description: A utility that monitors for any changes in your source and automatically restarts your server.

########**Outro**########
--Thank you