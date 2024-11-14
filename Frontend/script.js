let inputURL = document.getElementById("inputURL");
let shortURL = document.getElementById("shortURL");

const handleURL = () => {
  let url = inputURL.value;

  if (!url.startsWith("https://")) {
    alert("Incorrect URL");
  } else {
    sendURL(url);
  }
};

async function sendURL(url) {
  try {
    console.log(url);
    let postURL = await fetch("http://localhost:3000/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    let response = await postURL.json();
    let finalURL = response.description[0].short_url;
    if (finalURL) {
      shortURL.style.display = "block";

      shortURL.innerHTML = `http://localhost:3000/me/${finalURL}`;
    }
  } catch (err) {
    console.log(err);
  }
}

const handleRedirectURL = () => {
  let copyText = navigator.clipboard.writeText(shortURL.innerHTML);
  if (copyText) {
    alert("Text Copied!");
  }
};


