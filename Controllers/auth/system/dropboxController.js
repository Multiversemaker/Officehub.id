const fetch = require("node-fetch");

const CLIENT_ID = process.env.DROPBOX_APP_KEY;
const CLIENT_SECRET = process.env.DROPBOX_APP_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/dropbox/callback";

exports.dropboxCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.send("No code provided");

    const tokenRes = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await tokenRes.json();

    console.log("Dropbox Token Data:", data);

    if (data.error) return res.send("Error: " + JSON.stringify(data));

    res.send(`
      <h2>✅ Refresh token berhasil didapat!</h2>
      <p>Simpan token berikut ke file .env kamu:</p>
      <pre>DROPBOX_REFRESH_TOKEN=${data.refresh_token}</pre>
    `);
  } catch (err) {
    console.error("Dropbox OAuth Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.redirectToDropbox = (req, res) => {
  const redirectUri = "http://localhost:3000/auth/dropbox/callback";
  const clientId = process.env.DROPBOX_APP_KEY;
  res.redirect(
    `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
  );
};