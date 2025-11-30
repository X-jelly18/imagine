module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // e.g., https://gsa.ayanakojivps.shop

  // Construct the full backend URL including the path and query
  const backendUrl = `${backendBase}${req.url}`;

  try {
    // Copy headers but remove host/content-length to avoid issues
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Prepare the body
    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.headers['content-type']?.includes('application/json')) {
        body = JSON.stringify(req.body);
      } else {
        body = req.body; // for other types like text or form-data
      }
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
    });

    // Convert response to buffer (works for binary or text)
    const buffer = await response.arrayBuffer();

    // Set status and headers
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));

    // Send response
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};
