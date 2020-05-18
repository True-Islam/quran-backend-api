const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Audio, audioConverter } = require("../models/audio");

router.get("/ayah/:ayahId", async (req, res, next) => {
  const response = await generateResponse(
    "ayahId",
    req.params.ayahId,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/ayah/:ayahId", async (req, res, next) => {
  const response = await generateResponse(
    "ayahId",
    req.params.ayahId,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/edition/:editionId", async (req, res, next) => {
  const response = await generateResponse(
    "editionId",
    req.params.editionId,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/arabic/:ayahId/:editionId", async (req, res, next) => {
  const response = await filterAudio(
    "arabic",
    req.params.ayahId,
    req.params.editionId
  );

  if (response) {
    res.status(200).json(response);
  } else {
    const error = new Error(
      `Document not found with ayahId ${req.params.ayahId} and editionId ${req.params.editionId}`
    );
    error.status = 404;
    next(error);
  }
});

router.get("/translation/:ayahId/:editionId", async (req, res, next) => {
  const response = await filterAudio(
    "translation",
    req.params.ayahId,
    req.params.editionId
  );

  if (response) {
    res.status(200).json(response);
  } else {
    const error = new Error(
      `Document not found with ayahId ${req.params.ayahId} and editionId ${req.params.editionId}`
    );
    error.status = 404;
    next(error);
  }
});

router.get("/:audioId", async (req, res, next) => {
  const audioSnap = await firestore
    .collection(Audio.collection)
    .withConverter(audioConverter)
    .doc(req.params.audioId)
    .get();

  if (audioSnap.exists) {
    const audio = audioSnap.data();
    audio.id = audioSnap.id;

    res.status(200).json({
      code: 200,
      status: "OK",
      data: audio.toJson(true),
    });
  } else {
    const error = new Error(`Document not found with id ${req.params.audioId}`);
    error.status = 404;
    next(error);
  }
});

const filterAudio = async (filter, ayahId, editionId) => {
  const query = await firestore
    .collection(Audio.collection)
    .withConverter(audioConverter)
    .where("type", "==", filter)
    .where("ayahId", "==", ayahId)
    .where("editionId", "==", editionId)
    .limit(1)
    .get();

  let audio;
  query.forEach((doc) => {
    audio = doc.data();
    audio.id = doc.id;
  });

  if (!audio) {
    return null;
  }

  return {
    code: 200,
    status: "OK",
    data: audio.toJson(true),
  };
};

const generateResponse = async (field, value, limit, offset) => {
  const response = await findAudio(
    field,
    value,
    parseInt(limit),
    parseInt(offset)
  );

  return {
    code: 200,
    status: "OK",
    item_count: response.itemCount,
    offset: response.offset,
    data: response.audioList,
  };
};

const findAudio = async (field, value, limit = null, offset = null) => {
  const response = {};
  const audioList = [];
  let ref = firestore
    .collection(Audio.collection)
    .withConverter(audioConverter)
    .where(field, "==", value);

  if (limit) {
    ref = ref.limit(limit);
  }

  if (offset) {
    ref = ref.offset(offset);
  }

  const query = await ref.get();

  query.forEach((doc) => {
    const audio = doc.data();
    audio.id = doc.id;

    audioList.push(audio.toJson(true));
  });

  response["audioList"] = audioList;
  response["itemCount"] = audioList.length;

  if (offset) {
    response["offset"] = offset + audioList.length;
  } else {
    response["offset"] = audioList.length;
  }

  return response;
};

module.exports.filterAudio = filterAudio;
module.exports.audioRoutes = router;
