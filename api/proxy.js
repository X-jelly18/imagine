const fetch = require('node-fetch');

module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // V2Ray xHTTP server, e.g., https://gsa.ayanakojivps.shop
  const backendUrl = `${backendBase}${req.url}`;

  try {
    // Copy headers exactly, except host/content-length (Vercel will handle)
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Forward the request body as-is
    let body = req.method === 'GET' || req.method === 'HEAD' ? undefined : req;

    // Fetch from V2Ray server
    const response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
    });

    // Forward status code
    res.status(response.status);

    // Forward headers
    response.headers.forEach((value, key) => res.setHeader(key, value));

    // Forward body as buffer
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).send('Bad Gateway');
  }
};    // Send response body as buffer
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};    const arrayBuffer = await response.arrayBuffer();
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
