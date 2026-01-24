export const config = {
  runtime: "edge"
}

export default async function handler(req) {
  const url = new URL(req.url)

  const backendUrl =
    "https://shayimbuzi.kingbbxvggshop.shop" + url.pathname + url.search

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
