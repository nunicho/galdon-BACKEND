function getFilePath(file) {
  const filePath = file.path;
  const fileSplit = filePath.split("\\"); // NOTA PERSONAL: 1
  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getFilePath,
};


