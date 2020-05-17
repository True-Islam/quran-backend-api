const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Surah, surahConverter } = require("../models/surah");

router.get("/all", async (req, res, next) => {
  const response = await generateResponse(
    null,
    null,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/number/:number", async (req, res, next) => {
  const response = await generateResponse(
    "number",
    req.params.number,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/name/:name", async (req, res, next) => {
  const response = await generateResponse(
    "name",
    req.params.name,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/english_name/:name", async (req, res, next) => {
  const response = await generateResponse(
    "englishName",
    req.params.name,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/english_name_translation/:name", async (req, res, next) => {
  const response = await generateResponse(
    "englishNameTranslation",
    req.params.name,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/type/:type", async (req, res, next) => {
  const response = await generateResponse(
    "revelationType",
    req.params.type,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/:surahId", async (req, res, next) => {
  const surahSnap = await firestore
    .collection(Surah.collection)
    .withConverter(surahConverter)
    .doc(req.params.surahId)
    .get();

  if (surahSnap.exists) {
    const surah = surahSnap.data();
    surah.id = surahSnap.id;

    res.status(200).json({
      code: 200,
      status: "OK",
      data: surah.toJson(true),
    });
  } else {
    const error = new Error(`Document not found with id ${req.params.surahId}`);
    error.status = 404;
    next(error);
  }
});

const generateResponse = async (field, value, limit, offset) => {
  const response = await findSurah(
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
    data: response.surahList,
  };
};

const findSurah = async (
  field = null,
  value = null,
  limit = null,
  offset = null
) => {
  const response = {};
  const surahList = [];
  let ref = firestore
    .collection(Surah.collection)
    .withConverter(surahConverter);

  if (field && value) {
    ref = ref.where(field, "==", value);
  }

  if (limit) {
    ref = ref.limit(limit);
  }

  if (offset) {
    ref = ref.offset(offset);
  }

  const query = await ref.get();

  query.forEach((doc) => {
    const surah = doc.data();
    surah.id = doc.id;

    surahList.push(surah.toJson(true));
  });

  response["surahList"] = surahList;
  response["itemCount"] = surahList.length;

  if (offset) {
    response["offset"] = offset + surahList.length;
  } else {
    response["offset"] = surahList.length;
  }

  return response;
};

module.exports = router;
