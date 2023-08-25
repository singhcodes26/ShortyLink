document.getElementById("shortenBtn").addEventListener("click", async function() {
  const longUrl = document.getElementById("longUrl").value;
  
  if (isValidUrl(longUrl)) {
    const apiKey = "341bfe81a6303ade06947233eec8f69121b6036a";
    const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        long_url: longUrl
      })
    });

    const data = await response.json();
    const shortUrl = data.link;

    const shortUrlElement = document.getElementById("shortUrl");
    shortUrlElement.innerHTML = `Here's the shortened link:<br><a href="${shortUrl}" target="_blank">${shortUrl}</a>`;

    const copyBtn = document.getElementById("copyBtn");
    copyBtn.style.display = "block";
    copyBtn.addEventListener("click", function() {
      copyToClipboard(shortUrl);
      alert("URL copied to clipboard!");
    });
  } else {
      alert("Please enter a valid URL.");
    }
  });
function isValidUrl(url) {
  const urlPattern = /^(https?:\/\/)?([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+\.[A-Za-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
  return urlPattern.test(url);
}
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

document.getElementById("whatsappBtn").addEventListener("click", function() {
  const shortUrl = document.getElementById("shortUrl").textContent;
  if (shortUrl) {
    const whatsappMessage = `Check out this link: ${shortUrl}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://web.whatsapp.com/=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }
});
