const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "users" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("teams");

function checkFileType(file, cb) {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: CSV files only!");
  }
}

exports.uploadCsv = upload;

const imageFileFilter = (req, file, cb) => {
  console.log("check");
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

exports.uploadImage = (req,res) => {
  console.log("multer");
  console.log(req.body);
  console.log(req.file);
  console.log("multer wala")
  multer({ storage: storage, fileFilter: imageFileFilter }).single("image")
}
