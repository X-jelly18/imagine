module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // your backend

  // Construct full backend URL (path + query)
  const backendUrl = `${backendBase}${req.url}`;

  try {
    // Forward headers, remove host/content-length
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Forward body for non-GET/HEAD requests
    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.headers['content-type']?.includes('application/json')) {
        body = JSON.stringify(req.body);
      } else {
        body = req.body;
      }
    }

    const response = await fetch(backendUrl, { method: req.method, headers, body });

    // Copy status
    res.status(response.status);

    // Copy headers, rewrite Location for redirects
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'location') {
        value = value.replace('https://gsa.ayanakojivps.shop', `https://${req.headers.host}`);
      }
      res.setHeader(key, value);
    });

    // Stream response for large files / binary data
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};
