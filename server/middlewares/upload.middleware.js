const multer = require('multer');
const Storage = require('@google-cloud/storage');
const config = require('../config');

// Multer middleware
const multerMiddleware = multer({
  /* dest: 'uploads/',*/
  storage: multer.MemoryStorage,
  limits: {
    fileSize: config.fileSize * 1024 * 1024,
  },
});

// GCS Upload
const storage = Storage();
const bucket = storage.bucket(config.storageBucket);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${config.storageBucket}/${filename}`;
}

function uploadFile(file, index, prefix) {
  return new Promise((resolve, reject) => {

    try {
      const gcsName = prefix + file.originalname;
      const gcsFile = bucket.file(gcsName);
      const stream = gcsFile.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      stream.end(file.buffer);
      resolve(stream); // TODO: Why am I not using streamToPromise?
    } catch (exception) {
      reject({
        exception,
        index,
      });
    }

  });
}

function gcsMiddleware(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  // Upload files
  const timestamp = Date.now();
  const filesPromises = req.files.map((file, index) => uploadFile(file, index, timestamp));

  Promise.all(filesPromises).then(() => {
    for (let i = 0; i < req.files.length; i += 1) {
      const gcsName = timestamp + req.files[i].originalname;
      req.files[i].cloudStorageObject = gcsName;
      req.files[i].cloudStoragePublicUrl = getPublicUrl(gcsName);
    }
    next();
  }).catch((err) => {
    req.files[err.index].cloudStorageError = err.exception;
    next(err.exception);
  });

}

module.exports = [multerMiddleware.any(), gcsMiddleware];
