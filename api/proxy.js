// proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Example: just forward requests (adjust this for your V2Ray logic)
    const targetUrl = "https://gsa.ayanakojivps.shop" + req.url;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? req.body : undefined
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
