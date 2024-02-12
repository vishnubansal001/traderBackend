const fs = require("fs");

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function deleteFile(filePath) {
  fs.unlinkSync(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file deleted");
    }
  });
}

function generateTransactionId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_";
  const idLength = 16;
  let transactionId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    transactionId += characters[randomIndex];
  }

  return transactionId;
}

module.exports = {
  generateRandomPassword,
  deleteFile,
  generateTransactionId,
};
