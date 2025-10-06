function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function generateSummary(html, maxLength = 150) {
  const plainText = stripHtml(html);
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;
}

module.exports = { generateSummary };