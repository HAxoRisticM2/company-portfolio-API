const { deleteImage } = require("../utils/imageUploader"); // Use the centralized helper

exports.deleteOldImageHook = function (schema) {
  schema.pre("findOneAndUpdate", async function (next) {
    // Skip if no image field is being updated
    if (!this._update?.image) return next();

    try {
      const docToUpdate = await this.model.findOne(this.getQuery());
      const oldImageUrl = docToUpdate?.image;

      // Only proceed if there's an old image to delete
      if (oldImageUrl) {
        const filename = oldImageUrl.split("/").pop(); // Extract "img-123.jpg"
        deleteImage(filename); // Reuse the helper from imageUploader.js
      }
    } catch (err) {
      console.error("⚠️ Image cleanup hook error:", err.message);
    }
    next();
  });
};
