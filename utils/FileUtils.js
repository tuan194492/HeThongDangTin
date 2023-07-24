const createFilePath = (userId, fileName, modules, version) => {
    return `files/${modules}/${fileName}/${userId}/${version}`;
}

module.exports = {createFilePath};
