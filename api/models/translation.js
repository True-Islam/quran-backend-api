id = IDField();
ayah_id = TextField();
ayah_number = NumberField();
edition_id = TextField();
text = TextField();

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

  toJson() {
    return {
      ayahId: this.ayahId,
      ayahNumber: this.ayahNumber,
      editionId: this.editionId,
      text: this.text,
    };
  }
}

module.exports = Translation;
