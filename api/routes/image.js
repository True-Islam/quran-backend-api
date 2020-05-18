const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Image, imageConverter } = require("../models/image");

router.get("/:ayahId", async (req, res, next) => {
  const response = await imageByAyahId(req.params.ayahId);

  if (response) {
    res.status(200).json(response);
  } else {
    const error = new Error(`Document not found with id ${req.params.ayahId}`);
    error.status = 404;
    next(error);
  }
});

const imageByAyahId = async (ayahId) => {
  const query = await firestore
    .collection(Image.collection)
    .withConverter(imageConverter)
    .where("ayahId", "==", ayahId)
    .limit(1)
    .get();

  let image;
  query.forEach((doc) => {
    image = doc.data();
  });

  if (image) {
    return {
      code: 200,
      status: "OK",
      data: image.toJson(),
    };
  }

  return null;
};

module.exports.findImageByAyahId = imageByAyahId;
module.exports.imageRoutes = router;
