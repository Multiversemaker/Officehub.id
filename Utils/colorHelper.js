function getColorByType(type) {
  switch (type) {
    case "PDF":
      return "#FF0000";
    case "Docs":
      return "#1A5CBD";
    case "PPT":
      return "#D35230";
    case "Excel":
      return "#107C41";
    case "Note":
      return "#6f42c1";
    default:
      return "#6c757d";
  }
}

module.exports = { getColorByType };
