function getColorByType(type) {
  switch (type) {
    case "PDF":
      return "#dc3545";
    case "Docs":
      return "#0d6efd";
    case "PPT":
      return "#fd7e14";
    case "Excel":
      return "#198754";
    case "Note":
      return "#6f42c1";
    default:
      return "#6c757d";
  }
}

module.exports = { getColorByType };