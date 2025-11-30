import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Forward request to your V2Ray server
    const url = "https://gsa.ayanakojivps.shop/h9HPGjpKOYLFwrODUhgn/fdbe153c-94fd-4fcd-96f7-dc87f3446eed" + req.url;
    const response = await fetch(url, { method: req.method, headers: req.headers });
    const body = await response.text();

    res.status(response.status).set(Object.fromEntries(response.headers)).send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy Error");
  }
}
