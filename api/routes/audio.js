const express = require("express");
const router = express.Router();
const { Audio, audioConverter } = require("../models/audio");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

// Get By ID
// router.get("/:audioId", async (req, res, next) => {
//   const audioSnap = await firestore
//     .collection(Audio.collection)
//     .withConverter(audioConverter)
//     .doc(req.params.audioId)
//     .get();

//   const audio = audioSnap.data();
//   audio.id = audioSnap.id;

//   res.status(200).json({
//     code: 200,
//     status: "OK",
//     data: audio.toJson(),
//   });
// });

// Find by Fields
router.get("/find", async (req, res, next) => {
  const audioSnaps = await firestore
    .collection(Audio.collection)
    .where(req.query.field, "==", req.query.value)
    .get();
  const audioList = [];
  console.log(audioSnaps);
  audioSnaps.forEach((snap) => {
    console.log(snap);
    const audio = snap.data();
    audio.id = snap.id;
    audioList.push(audio.toJson());
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    data: audioList,
  });
});

module.exports = router;
