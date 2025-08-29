function shouldReplace(a){
  if (!a.href) return false;
  if (a.target !==  "_blank") return false;
  if (a.textContent.trim()  !== "<image>") return false;
  const url = a.href.toLowerCase();
  const imgHosts =  ["i.redd.it", "preview.redd.it", "external-preview.redd.it", "i.imgur.com"]
  const hostMatch = imgHosts.some(host => url.includes(host));

  const imgExtRegex = /\.(png|jpe?g|gif|webp)(\?.*)?$/;
  const extMatch = imgExtRegex.test(url);

  return hostMatch && extMatch;
}
function convertToImageUrl(url) {
  try {
    const u = new URL(url);
    const ext = u.pathname.split('.').pop().toLowerCase();

    if (u.hostname === "preview.redd.it") {
      // only convert PNG to JPEG
      if (u.searchParams.get("format") === "pjpg" && ext === "png") {
        u.pathname = u.pathname.replace(/\.png$/, ".jpeg");
      }
    }
    
    return u.toString();
  } catch (e) {
    return url;
  }
}

function replaceRedditLinks() {
  document.querySelectorAll("a").forEach(a => {
    if (!shouldReplace(a)) return;

    const imgUrl  = convertToImageUrl(a.href);
    const img = document.createElement("img")
    img.src = imgUrl;
    img.style.maxWidth = "400px";
    img.style.display = "block";
    a.replaceWith(img);
  });
}

// run immediately
replaceRedditLinks();

// re-run when DOM updates (scrolling, dynamic loads)
const observer = new MutationObserver(() => replaceRedditLinks());
observer.observe(document.body, { childList: true, subtree: true });