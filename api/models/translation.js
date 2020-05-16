class Translation {
  constructor() {
    this.id;
    this.ayahId;
    this.ayahNumber;
    this.editionId;
    this.text;
  }

  static fromJson(id, data) {
    const translation = new Translation();
    translation.id = id;
    translation.ayahId = data.ayahId;
    translation.ayahNumber = data.ayahNumber;
    translation.editionId = data.editionId;
    translation.text = data.text;
  }

  toJson(withId = false) {
    const jsonData = {
      ayahId: this.ayahId,
      ayahNumber: this.ayahNumber,
      editionId: this.editionId,
      text: this.text,
    };

    if (withId) {
      jsonData["id"] = this.id;
    }

    return jsonData;
  }
}

Translation.collection = "translations";

const translationConverter = {
  toFirestore(translation) {
    return ayah.toJson();
  },
  fromFirestore(data) {
    return Translation.fromJson(data);
  },
};

module.exports.Translation = Translation;
module.exports.translationConverter = translationConverter;
