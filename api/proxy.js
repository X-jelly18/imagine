module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // e.g., https://gsa.ayanakojivps.shop

  // Construct backend URL with path + query
  const backendUrl = `${backendBase}${req.url}`;

  try {
    // Forward headers but remove host/content-length
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Forward body for POST/PUT/PATCH
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
      if (key.toLowerCase() === "location") {
        value = value.replace(backendBase, `https://${req.headers.host}`);
      }
      res.setHeader(key, value);
    });

    // Send response as buffer (works for JSON, HTML, images, etc.)
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
};    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  }
};
