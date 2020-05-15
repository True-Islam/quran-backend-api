class Edition {
  constructor() {
    this.id;
    this.language;
    this.translator;
    this.type;
    this.format;
    this.direction;
  }

  static fromJson(data, id = null) {
    const ayah = new ayah();
    ayah.id = id;
    ayah.language = data.language;
    ayah.translator = data.translator;
    ayah.type = data.type;
    ayah.format = data.format;
    ayah.direction = data.direction;

    return ayah;
  }

  toJson() {
    return {
      language: this.language,
      translator: this.translator,
      type: this.type,
      format: this.format,
      direction: this.direction,
    };
  }
}

Edition.collection = "editions";

const editionConverter = {
  toFirestore(edition) {
    return edition.toJson();
  },
  fromFirestore(data) {
    return Edition.fromJson(data);
  },
};

module.exports.Edition = Edition;
module.exports.editionConverter = editionConverter;
