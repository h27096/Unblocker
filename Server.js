const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
    const query = req.query.q;

    const response = await fetch(
        `https://api.duckduckgo.com/?q=${query}&format=json`
    );

    const data = await response.json();

    res.json({
        results: data.RelatedTopics.map(x => ({
            title: x.Text,
            url: x.FirstURL
        }))
    });
});

app.get("/proxy", async (req, res) => {
    const url = req.query.url;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const html = await response.text();

    res.send(html);
});

app.listen(3000, () => console.log("Server running"));
