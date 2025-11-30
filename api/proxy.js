module.exports = async function (req, res) {
  // Only accept requests to /proxy/xhttp
  const xhttpPath = "/h9HPGjpKOYLFwrODUhgn";

  // req.url may include query string, strip it
  const requestPath = req.url.split("?")[0];

  if (requestPath !== xhttpPath) {
    res.status(404).send("Not Found");
    return;
  }

  // Your real V2Ray backend
  const backend = "https://gsa.ayanakojivps.shop";

  // Construct target URL on backend
  const targetURL = backend + xhttpPath;

  try {
    const response = await fetch(targetURL, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" ? undefined : req.body,
    });

    const buffer = await response.arrayBuffer();

    res.status(response.status);
    response.headers.forEach((v, k) => res.setHeader(k, v));
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};
