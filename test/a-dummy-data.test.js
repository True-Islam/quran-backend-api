const { Audio } = require("../api/models/audio");
const { Ayah } = require("../api/models/ayah");
const { Edition } = require("../api/models/edition");
const { Image } = require("../api/models/image");
const { Surah } = require("../api/models/surah");
const { Translation } = require("../api/models/translation");

const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

// Save Audio Data
const audio = new Audio();
audio.id = "audio-1";
audio.ayahId = "ayah-1";
audio.ayahNumber = 1;
audio.editionId = "edition-1";
audio.type = "arabic";
audio.link = "audio-1 ayah-1 edition-1 arabic";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

audio.id = "audio-2";
audio.type = "translation";
audio.link = "audio-1 ayah-1 edition-1 translation";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

audio.id = "audio-3";
audio.ayahId = "ayah-2";
audio.ayahNumber = 2;
audio.link = "audio-2 ayah-2 editoin-1 arabic";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

audio.id = "audio-4";
audio.ayahId = "ayah-2";
audio.editionId = "edition-2";
audio.ayahNumber = 2;
audio.link = "audio-2 ayah-2 editoin-2 arabic";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

// Save Data for edition
const edition = new Edition();
edition.id = "edition-1";
edition.language = "en";
edition.translator = "translation-1";
edition.type = "arabic";
edition.format = "format-1";
edition.direction = "direction-1";

firestore
  .collection(Edition.collection)
  .doc(edition.id)
  .create(edition.toJson());

edition.id = "edition-2";
edition.language = "ur";
edition.translator = "translation-1";
edition.type = "arabic";

firestore
  .collection(Edition.collection)
  .doc(edition.id)
  .create(edition.toJson());

edition.id = "edition-3";
edition.language = "en";
edition.translator = "translation-1";
edition.type = "translation";

firestore
  .collection(Edition.collection)
  .doc(edition.id)
  .create(edition.toJson());

edition.id = "edition-4";
edition.language = "ur";
edition.translator = "translation-1";
edition.type = "translation";

firestore
  .collection(Edition.collection)
  .doc(edition.id)
  .create(edition.toJson());

// Save Image data
const image = new Image();
image.ayahId = "ayah-1";
image.link = "ayah 1 image link";

firestore.collection(Image.collection).doc().create(image.toJson());

image.ayahId = "ayah-2";
image.link = "ayah 2 image link";

firestore.collection(Image.collection).doc().create(image.toJson());

image.ayahId = "ayah-3";
image.link = "ayah 3 image link";

firestore.collection(Image.collection).doc().create(image.toJson());
