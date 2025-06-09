document.getElementById('proxy-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const url = document.getElementById('url-input').value.trim();
    const output = document.getElementById('output');
    output.style.color = "#fffa";
    output.textContent = "Fetching...";

    // Use AllOrigins public proxy API to bypass CORS/fetch errors
    const api = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Proxy fetch failed.");

        const data = await res.json();
        // Try to guess if it's HTML, show as HTML; else, show as text
        if (/<html/i.test(data.contents)) {
            output.innerHTML = data.contents;
        } else {
            output.textContent = data.contents;
        }
    } catch (err) {
        output.style.color = "#ff6161";
        output.textContent = "Error: " + err.message;
    }
});
