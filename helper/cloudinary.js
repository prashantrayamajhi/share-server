const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 *  Uploads file to Cloudinary CDN
 *  @param {folder} string, folder name, where to save image
 *  @param {string} imagePublicId
 */
exports.uploadToCloudinary = async (folder, imagePublicId) => {
  // if imagePublicId param is presented we should overwrite the image
  // const options = imagePublicId
  //   ? { public_id: imagePublicId, overwrite: true }
  //   : { public_id: `${folder}/${v4()}` };
  try {
    const result = await cloudinary.v2.uploader.upload(folder);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *  Deletes file from Cloudinary CDN
 *
 *  @param {string} publicId id for deleting the image
 */
exports.deleteFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
