import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});
const VPS_TARGET = 'https://gsa.ayanakojivps.shop'; // <-- Replace with your VPS domain or IP

export default function handler(req, res) {
  // Keep original URL
  req.url = req.url;

  // Proxy HTTP + WebSocket traffic to VPS
  proxy.web(req, res, {
    target: VPS_TARGET,
    changeOrigin: true,
    ws: true
  });

  // Handle errors
  proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end('Proxy error.');
  });
}