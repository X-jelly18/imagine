export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  const backendHost = "gsa.ayanakojivps.shop";
  const backendURL = `https://${backendHost}${req.nextUrl.pathname}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.set("host", backendHost);

  const response = await fetch(backendURL, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
    redirect: "manual",
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
