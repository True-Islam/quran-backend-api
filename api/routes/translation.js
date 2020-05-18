const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Translation, translationConverter } = require("../models/translation");

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

router.get("/filter/:ayahId/:editionId", async (req, res, next) => {
  const response = await filterTranslation(
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

router.get("/:transId", async (req, res, next) => {
  const transSnap = await firestore
    .collection(Translation.collection)
    .withConverter(translationConverter)
    .doc(req.params.transId)
    .get();

  if (transSnap.exists) {
    const trans = transSnap.data();
    trans.id = transSnap.id;

    res.status(200).json({
      code: 200,
      status: "OK",
      data: trans.toJson(true),
    });
  } else {
    const error = new Error(`Document not found with id ${req.params.transId}`);
    error.status = 404;
    next(error);
  }
});

const generateResponse = async (field, value, limit, offset) => {
  const response = await findTranslation(
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
    data: response.translationList,
  };
};

const filterTranslation = async (ayahId, editionId) => {
  const query = await firestore
    .collection(Translation.collection)
    .withConverter(translationConverter)
    .where("ayahId", "==", ayahId)
    .where("editionId", "==", editionId)
    .limit(1)
    .get();

  let trans;
  query.forEach((doc) => {
    trans = doc.data();
    trans.id = doc.id;
  });

  if (!trans) {
    return null;
  }

  return {
    code: 200,
    status: "OK",
    data: trans.toJson(true),
  };
};

const findTranslation = async (
  field = null,
  value = null,
  limit = null,
  offset = null
) => {
  const response = {};
  const translationList = [];
  let ref = firestore
    .collection(Translation.collection)
    .withConverter(translationConverter);

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
    const translation = doc.data();
    translation.id = doc.id;

    translationList.push(translation.toJson(true));
  });

  response["translationList"] = translationList;
  response["itemCount"] = translationList.length;

  if (offset) {
    response["offset"] = offset + translationList.length;
  } else {
    response["offset"] = translationList.length;
  }

  return response;
};

module.exports.filterTranslation = filterTranslation;
module.exports.translationRoutes = router;
