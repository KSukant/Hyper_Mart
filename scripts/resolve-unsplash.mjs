// Resolves Unsplash photo URL via og:image
const url = process.argv[2];

async function resolveUnsplash(pageUrl) {
  const res = await fetch(pageUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await res.text();
  const og = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+property="og:image"/i);
  if (og) {
    const raw = og[1].split("?")[0];
    console.log("Found og:image:", og[1]);
    console.log("Clean CDN URL:", `${raw}?q=85&w=1200&auto=format&fit=crop`);
  } else {
    // Check twitter:image
    const tw = html.match(/name="twitter:image"\s+content="([^"]+)"/i);
    console.log("tw:", tw ? tw[1] : "none");
  }
}

resolveUnsplash(url).catch(console.error);
