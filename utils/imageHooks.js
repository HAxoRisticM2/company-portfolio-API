// const fs = require("fs");
// const path = require("path");

// exports.deleteOldImageHook = function (schema) {
//   schema.pre("findOneAndUpdate", async function (next) {
//     // Skip if no update data or no image field being updated
//     if (!this._update || !("image" in this._update)) {
//       return next();
//     }

//     try {
//       const docToUpdate = await this.model.findOne(this.getQuery());
//       const oldImage = docToUpdate?.image;
//       const newImage = this._update.image;

//       // Only proceed if both old and new images exist
//       if (oldImage && newImage) {
//         const filename = new URL(oldImage).pathname.split("/").pop();
//         const oldImagePath = path.join(
//           __dirname,
//           "../public/uploads",
//           filename
//         );

//         if (fs.existsSync(oldImagePath)) {
//           fs.unlink(oldImagePath, (err) => {
//             if (err)
//               console.error("⚠️ Failed to delete old image:", err.message);
//           });
//         }
//       }
//     } catch (err) {
//       console.error("⚠️ Error in image cleanup hook:", err.message);
//     }
//     next();
//   });
// };
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
