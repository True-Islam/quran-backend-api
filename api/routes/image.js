const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Image, imageConverter } = require("../models/image");

router.get("/:ayahId", async (req, res, next) => {
  const query = await firestore
    .collection(Image.collection)
    .withConverter(imageConverter)
    .where("ayahId", "==", req.params.ayahId)
    .limit(1)
    .get();

  let image;
  query.forEach((doc) => {
    image = doc.data();
  });

  if (image) {
    res.status(200).json({
      code: 200,
      status: "OK",
      data: image.toJson(),
    });
  } else {
    const error = new Error(`Document not found with id ${req.params.ayahId}`);
    error.status = 404;
    next(error);
  }
});

module.exports = router;
