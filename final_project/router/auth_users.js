// router/auth_users.js
const express = require('express');
const jwt = require('jsonwebtoken');

let users = [
    {
        username: "Nikhita",
        password: "nikhita123"
    }
]; // Placeholder for user data

const regd_users = express.Router();

// Auth functions
const isValid = (username) => users.some(user => user.username === username);
const authenticatedUser = (username, password) => users.some(user => user.username === username && user.password === password);

// Login route
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Incorrect username or password" });
    }
    const accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });
    req.session.authorization = { accessToken, username };
    return res.status(200).json({ message: "User successfully logged in.", accessToken });
});

// Sample route for updating review
regd_users.put("/auth/review/:isbn", (req, res) => {
    // Implement your review logic here
    res.status(200).json({ message: "Review added/updated." });
});

// Sample route for deleting review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    // Implement your delete logic here
    res.status(200).json({ message: "Review deleted." });
});

// Export the router
module.exports.authenticated = regd_users;
