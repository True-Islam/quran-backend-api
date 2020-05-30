const express = require("express");
const router = express.Router();

const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();

const { Edition, editionConverter } = require("../models/edition");

router.get("/all", async (req, res, next) => {
  const response = await generateResponse(
    null,
    null,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/language/:language", async (req, res, next) => {
  const response = await generateResponse(
    "language",
    req.params.language,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/language/:language", async (req, res, next) => {
  const response = await generateResponse(
    "language",
    req.params.language,
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

router.get("/type/:type", async (req, res, next) => {
  const response = await generateResponse(
    "type",
    req.params.type,
    req.query.limit,
    req.query.offset
  );

  res.status(200).json(response);
});

router.get("/:editionId", async (req, res, next) => {
  const response = await editionById(req.params.editionId);

  if (response) {
    res.status(200).json(response);
  } else {
    const error = new Error(
      `Document not found with id ${req.params.editionId}`
    );
    error.status = 404;
    next(error);
  }
});

const editionById = async (editionId) => {
  const editionSnap = await firestore
    .collection(Edition.collection)
    .withConverter(editionConverter)
    .doc(editionId)
    .get();

  if (editionSnap.exists) {
    const edition = editionSnap.data();
    edition.id = editionSnap.id;

    return {
      code: 200,
      status: "OK",
      data: edition.toJson(true),
    };
  }

  return null;
};

const generateResponse = async (field, value, limit, offset) => {
  const response = await findEdition(
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
    data: response.editionList,
  };
};

const findEdition = async (
  field = null,
  value = null,
  limit = null,
  offset = null
) => {
  const response = {};
  const editionList = [];
  let ref = firestore
    .collection(Edition.collection)
    .withConverter(editionConverter);

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
    const edition = doc.data();
    edition.id = doc.id;

    editionList.push(edition.toJson(true));
  });

  response["editionList"] = editionList;
  response["itemCount"] = editionList.length;

  if (offset) {
    response["offset"] = offset + editionList.length;
  } else {
    response["offset"] = editionList.length;
  }

  return response;
};

module.exports.findEditionById = editionById;
module.exports.editionRoutes = router;
