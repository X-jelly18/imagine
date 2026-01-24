export const config = {
  runtime: "edge"
}

export default async function handler(req) {
  const url = new URL(req.url)

  const backendUrl =
    "https://102.219.85.116" + url.pathname + url.search

  const upstream = await fetch(backendUrl, {
    method: req.method,
    headers: req.headers,
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : req.body,
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  })
}
