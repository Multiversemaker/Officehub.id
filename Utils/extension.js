function getTypeFromExtension(ext) {
  switch (ext) {
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "Docs";
    case "ppt":
    case "pptx":
      return "PPT";
    case "txt":
    case "md":
      return "Note";
    case "xls":
    case "xlsx":
      return "Excel";
    default:
      return "Other";
  }
}

module.exports = {getTypeFromExtension}