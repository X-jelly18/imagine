export default async function handler(req, res) {
  const backend = "https://gsa.ayanakojivps.shop";
  const path = "/proxy/xhttp";

  const targetURL = backend + path;

  const response = await fetch(targetURL, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" ? undefined : req.body
  });

  const buffer = await response.arrayBuffer();

  res.status(response.status);
  response.headers.forEach((v, k) => res.setHeader(k, v));
  res.send(Buffer.from(buffer));
}

