const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const AppError = require("./appError");

// ========================
// 1. HELPER FUNCTIONS
// ========================
const ensureModuleFolder = (moduleName) => {
  const dir = path.join(__dirname, `../public/uploads/${moduleName}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// ========================
// 2. MULTER CONFIGURATION
// ========================
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Only images are allowed!", 400), false);
  }
};

exports.uploadSingle = (fieldName) =>
  multer({ storage: memoryStorage, fileFilter }).single(fieldName);

exports.uploadMultiple = (fieldName, maxCount) =>
  multer({ storage: memoryStorage, fileFilter }).array(fieldName, maxCount);

// ========================
// 3. IMAGE PROCESSOR (MODULE-SPECIFIC)
// ========================
exports.processImage = (moduleName) => async (req, res, next) => {
  try {
    if (!req.file) return next();

    // Create module folder if needed
    const moduleDir = ensureModuleFolder(moduleName);

    // Generate filename
    const filename = `img-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.jpeg`;
    const fullPath = path.join(moduleDir, filename);

    // Process and save image
    await sharp(req.file.buffer)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .jpeg({
        quality: 80,
        mozjpeg: true,
      })
      .toFile(fullPath);

    // Store relative path (e.g. 'teammember/img-123.jpg')
    req.file.filename = `${moduleName}/${filename}`;
    next();
  } catch (err) {
    console.error("🛑 Image processing error:", err);
    next(new AppError("Failed to process image", 500));
  }
};

// ========================
// 4. DELETION HELPER (MODULE-AWARE)
// ========================
exports.deleteImage = (filePath) => {
  if (!filePath) return;

  // Handle both full URLs and relative paths
  const filename = filePath.startsWith("http")
    ? new URL(filePath).pathname.replace("/uploads/", "")
    : filePath;

  const fullPath = path.join(__dirname, "../public/uploads", filename);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("⚠️ Failed to delete image:", err);
    });
  }
};
