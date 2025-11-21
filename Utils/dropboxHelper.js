async function getDropboxAccessToken() {
  console.log("APP_KEY:", process.env.DROPBOX_APP_KEY);
  console.log("REFRESH_TOKEN:", process.env.DROPBOX_REFRESH_TOKEN);

  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
      client_id: process.env.DROPBOX_APP_KEY,
      client_secret: process.env.DROPBOX_APP_SECRET,
    }),
  });

  const data = await response.json();
  console.log("Dropbox Access Response:", data);

  return data.access_token;
}

module.exports = { getDropboxAccessToken };
