// pages.dev へのアクセスを本番ドメインに301リダイレクト
export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  if (url.hostname.endsWith('.pages.dev')) {
    const destination = new URL(url.pathname + url.search, 'https://www.wakaru-note.com');
    return Response.redirect(destination.toString(), 301);
  }
  
  return context.next();
}
