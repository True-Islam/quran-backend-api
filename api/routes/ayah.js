const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { filterTranslation } = require("./translation");
const { findSurahById } = require("./surah");
const { findEditionById } = require("./edition");
const { filterAudio } = require("./audio");
const { findImageByAyahId } = require("./image");
const { Ayah, ayahConverter } = require("../models/ayah");

router.get("/surah/:surahId", async (req, res, next) => {
  const response = await generateResponse(
    "surahId",
    req.params.language,
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/number/:number", async (req, res, next) => {
  const response = await generateResponse(
    "number",
    parseInt(req.params.number),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json({
    code: response.code,
    status: response.status,
    data: response.data[0],
  });
});

router.get("/number_in_surah/:number", async (req, res, next) => {
  const response = await generateResponse(
    "numberInSurah",
    parseInt(req.params.number),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json({
    code: response.code,
    status: response.status,
    data: response.data[0],
  });
});

router.get("/juz/:juz", async (req, res, next) => {
  const response = await generateResponse(
    "juz",
    parseInt(req.params.juz),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/manzil/:manzil", async (req, res, next) => {
  const response = await generateResponse(
    "manzil",
    parseInt(req.params.manzil),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/ruku/:ruku", async (req, res, next) => {
  const response = await generateResponse(
    "ruku",
    parseInt(req.params.ruku),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/hizb_qurater/:hizbQuarter", async (req, res, next) => {
  const response = await generateResponse(
    "hizbQuarter",
    parseInt(req.params.hizbQuarter),
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/sajda/:sajda", async (req, res, next) => {
  const response = await generateResponse(
    "sajda",
    req.params.sajda.toLowerCase() == "true" ? true : false,
    req.query.limit,
    req.query.offset,
    req.query.parts,
    req.query.edition
  );

  res.status(200).json(response);
});

router.get("/:ayahId", async (req, res, next) => {
  const ayahSnap = await firestore
    .collection(Ayah.collection)
    .withConverter(ayahConverter)
    .doc(req.params.ayahId)
    .get();

  if (ayahSnap.exists) {
    const ayah = ayahSnap.data();
    ayah.id = ayahSnap.id;

    const response = await getAdditionalParts(
      ayah,
      req.query.parts,
      req.query.edition
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      data: response,
    });
  } else {
    const error = new Error(`Document not found with id ${req.params.ayahId}`);
    error.status = 404;
    next(error);
  }
});

const getAdditionalParts = async (ayah, parts, edition) => {
  // parts = ['Translation', 'Surah', 'Edition', 'Arabic_Audio', 'Translation_Audio', 'Image']

  const editionId = edition || "edition-1";

  const response = {
    ayah: ayah.toJson(true),
  };

  if (!parts) {
    return response;
  }

  if (parts.toLowerCase() == "all") {
    parts = "translation,surah,edition,arabic_audio,translation_audio,image";
  }

  const partList = parts.toLowerCase().split(",");

  // Get Translation
  if (partList.includes("translation")) {
    const translation = await filterTranslation(ayah.id, editionId);

    if (translation) {
      response["translation"] = translation.data;
    }
  }

  // Get Surah
  if (partList.includes("surah")) {
    const surah = await findSurahById(ayah.surahId);

    if (surah) {
      response["surah"] = surah.data;
    }
  }

  // Get Edition
  if (partList.includes("edition")) {
    const edition = await findEditionById(editionId);

    if (edition) {
      response["edition"] = edition.data;
    }
  }

  // Get Arabic Audio
  if (partList.includes("arabic_audio")) {
    const audio = await filterAudio("arabic", ayah.id, editionId);

    if (audio) {
      response["arabicAudio"] = audio.data;
    }
  }

  // Get Translation Audio
  if (partList.includes("translation_audio")) {
    const audio = await filterAudio("translation", ayah.id, editionId);

    if (audio) {
      response["translationAudio"] = audio.data;
    }
  }

  // Get image
  if (partList.includes("image")) {
    const image = await findImageByAyahId("ayah-1");

    if (image) {
      response["image"] = image.data;
    }
  }

  return response;
};

const generateResponse = async (
  field,
  value,
  limit,
  offset,
  parts,
  edition
) => {
  const response = await findAyah(
    field,
    value,
    parseInt(limit),
    parseInt(offset),
    parts,
    edition
  );

  return {
    code: 200,
    status: "OK",
    item_count: response.itemCount,
    offset: response.offset,
    data: response.ayahList,
  };
};

const findAyah = async (
  field = null,
  value = null,
  limit = null,
  offset = null,
  parts = null,
  edition = null
) => {
  const response = {};
  const ayahList = [];
  let ref = firestore.collection(Ayah.collection).withConverter(ayahConverter);

  if (field != null && value != null) {
    ref = ref.where(field, "==", value);
  }

  if (limit) {
    ref = ref.limit(limit);
  }

  if (offset) {
    ref = ref.offset(offset);
  }

  const query = await ref.get();

  const docList = [];
  query.forEach((doc) => {
    docList.push(doc);
  });

  for (const doc of docList) {
    const ayah = doc.data();
    ayah.id = doc.id;

    const response = await getAdditionalParts(ayah, parts, edition);

    ayahList.push(response);
  }

  response["ayahList"] = ayahList;
  response["itemCount"] = ayahList.length;

  if (offset) {
    response["offset"] = offset + ayahList.length;
  } else {
    response["offset"] = ayahList.length;
  }

  return response;
};

module.exports = router;
