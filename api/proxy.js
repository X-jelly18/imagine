module.exports = async function (req, res) {
  const backendBase = process.env.BACKEND_URL; // e.g., https://gsa.ayanakojivps.shop

  // Preserve the full path + query
  const backendUrl = `${backendBase}${req.url}`;

  try {
    // Copy headers except host/content-length
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Forward request body if needed
    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.headers['content-type']?.includes('application/json')) {
        body = JSON.stringify(req.body);
      } else {
        body = req.body;
      }
    }

    // Forward request to backend
    const response = await fetch(backendUrl, { method: req.method, headers, body });

    // Copy status code
    res.status(response.status);

    // Copy headers and rewrite Location header for redirects
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'location') {
        value = value.replace(backendBase, `https://${req.headers.host}`);
      }
      res.setHeader(key, value);
    });

    // Send response body as buffer
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
