const fetch = require('node-fetch');

module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // e.g., https://gsa.ayanakojivps.shop
  const backendUrl = `${backendBase}${req.url}`; // preserve full path + query

  try {
    // Forward headers except host/content-length
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // For GET/HEAD, no body; for others, pipe raw body
    const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : req;

    // Send request to backend
    const response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
    });

    // Forward status code
    res.status(response.status);

    // Forward headers exactly
    response.headers.forEach((value, key) => res.setHeader(key, value));

    // Stream response as buffer (works for JSON, HTML, images, binary)
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).send('Bad Gateway');
  }
};
