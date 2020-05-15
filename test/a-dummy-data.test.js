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

audio.type = "translation";
audio.link = "audio-1 ayah-1 edition-1 translation";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

audio.id = "audio-2";
audio.ayahId = "ayah-2";
audio.ayahNumber = 2;
audio.link = "audio-2 ayah-2 editoin-1 arabic";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());

audio.id = "audio-2";
audio.ayahId = "ayah-2";
audio.editionId = "edition-2";
audio.ayahNumber = 2;
audio.link = "audio-2 ayah-2 editoin-2 arabic";

firestore.collection(Audio.collection).doc(audio.id).create(audio.toJson());
