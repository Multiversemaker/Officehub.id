async function getFolderLevel(Folder, parentId) {
    if (!parentId) return 1;

    const parentFolder = await Folder.findById(parentId);
    if (!parentFolder) return 1;

    return parentFolder.level + 1;
}

module.exports = getFolderLevel;