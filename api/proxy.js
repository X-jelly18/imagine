import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Forward request to your V2Ray server
    const url = "https://gsa.ayanakojivps.shop" + req.url;
    const response = await fetch(url, { method: req.method, headers: req.headers });
    const body = await response.text();

    res.status(response.status).set(Object.fromEntries(response.headers)).send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy Error");
  }
}
