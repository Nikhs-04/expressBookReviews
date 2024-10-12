// index.js
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const customer_routes = require('./router/auth_users').authenticated;
const genl_routes = require('./router/general').general;

const app = express();
app.use(express.json());

app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Authorization middleware
app.use("/customer/auth/*", (req, res, next) => {
    if (req.session.authorization) {
        const token = req.session.authorization["accessToken"];
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Attach user to request
                next();
            } else {
                return res.status(403).json({ message: "User not authenticated." });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in." });
    }
});

// Test route to check session persistence
app.get("/customer/auth/test", (req, res) => {
    if (req.session.authorization) {
        return res.status(200).json({ message: "User is logged in." });
    } else {
        return res.status(403).json({ message: "User not logged in." });
    }
});

// Load routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
