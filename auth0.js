const express = require("express");
const { auth } = require("express-openid-connect");
require("dotenv").config();

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,

    secret: "auth0lab12345",

    baseURL: "http://localhost:3000",

    clientID: process.env.CLIENT_ID,

    issuerBaseURL: "https://" + process.env.DOMAIN
};

app.use(auth(config));

app.get("/", (req, res) => {
    res.send(`
        <h1>${process.env.NAME}</h1>

        <a href="/login">Login</a>
        <br><br>

        <a href="/logout">Logout</a>
    `);
});

app.get("/profile", (req, res) => {

    if (!req.oidc.isAuthenticated()) {
        res.send("Please login first");
        return;
    }

    res.send(`
        <h2>Welcome</h2>
        <p>Name: ${req.oidc.user.name}</p>
        <p>Email: ${req.oidc.user.email}</p>
    `);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});