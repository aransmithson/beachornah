export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  const target = url.searchParams.get("url");
  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "BeachOrNahApp"
      }
    });

    const data = await response.text();

    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=120"
      }
    });
  } catch (err) {
    return new Response("Proxy error", { status: 500 });
  }
}
