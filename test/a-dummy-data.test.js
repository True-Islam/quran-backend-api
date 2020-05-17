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

// Save data for Surah
const surah = new Surah();
surah.id = "surah-1";
surah.number = 1;
surah.name = "name-1";
surah.englishName = "english-name-1";
surah.englishNameTranslation = "english-name-translation-1";
surah.numberOfAyahs = 7;
surah.revelationType = "mecca";

firestore.collection(Surah.collection).doc(surah.id).create(surah.toJson());

surah.id = "surah-2";
surah.number = 1;
surah.name = "name-2";
surah.englishName = "english-name-2";
surah.englishNameTranslation = "english-name-translation-2";
surah.numberOfAyahs = 7;
surah.revelationType = "mecca";

firestore.collection(Surah.collection).doc(surah.id).create(surah.toJson());

surah.id = "surah-3";
surah.number = 3;
surah.name = "name-3";
surah.englishName = "english-name-3";
surah.englishNameTranslation = "english-name-translation-3";
surah.numberOfAyahs = 7;
surah.revelationType = "mecca";

firestore.collection(Surah.collection).doc(surah.id).create(surah.toJson());

surah.id = "surah-4";
surah.number = 2;
surah.name = "name-4";
surah.englishName = "english-name-4";
surah.englishNameTranslation = "english-name-translation-4";
surah.numberOfAyahs = 7;
surah.revelationType = "mecca";

firestore.collection(Surah.collection).doc(surah.id).create(surah.toJson());

surah.id = "surah-5";
surah.number = 1;
surah.name = "name-5";
surah.englishName = "english-name-5";
surah.englishNameTranslation = "english-name-translation-5";
surah.numberOfAyahs = 7;
surah.revelationType = "madina";

firestore.collection(Surah.collection).doc(surah.id).create(surah.toJson());

// Save translation data

const trans = new Translation();
trans.id = "translation-1";
trans.ayahId = "ayah-1";
trans.ayahNumber = 1;
trans.editionId = "edition-1";
trans.text = "trans 1 ayah 1 edition-1";

firestore
  .collection(Translation.collection)
  .doc(trans.id)
  .create(trans.toJson());

trans.id = "translation-2";
trans.ayahId = "ayah-1";
trans.ayahNumber = 1;
trans.editionId = "edition-2";
trans.text = "trans 2 ayah 1 edition-1";

firestore
  .collection(Translation.collection)
  .doc(trans.id)
  .create(trans.toJson());

trans.id = "translation-3";
trans.ayahId = "ayah-2";
trans.ayahNumber = 2;
trans.editionId = "edition-1";
trans.text = "trans 3 ayah 2 edition-1";

firestore
  .collection(Translation.collection)
  .doc(trans.id)
  .create(trans.toJson());

trans.id = "translation-4";
trans.ayahId = "ayah-2";
trans.ayahNumber = 2;
trans.editionId = "edition-2";
trans.text = "trans 4 ayah 2 edition-2";

firestore
  .collection(Translation.collection)
  .doc(trans.id)
  .create(trans.toJson());

trans.id = "translation-5";
trans.ayahId = "ayah-3";
trans.ayahNumber = 3;
trans.editionId = "edition-1";
trans.text = "trans 5 ayah 5 edition-1";

firestore
  .collection(Translation.collection)
  .doc(trans.id)
  .create(trans.toJson());
