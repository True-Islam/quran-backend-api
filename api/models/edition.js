class Edition {
  constructor() {
    this.id;
    this.language;
    this.name;
    this.translator;
    this.type;
    this.format;
    this.direction;
  }

  static fromJson(data, id = null) {
    const edition = new Edition();
    edition.id = id;
    edition.name = data.name;
    edition.language = data.language;
    edition.translator = data.translator;
    edition.type = data.type;
    edition.format = data.format;
    edition.direction = data.direction;

    return edition;
  }

  toJson(withId = false) {
    const jsonData = {
      language: this.language,
      name: this.name,
      translator: this.translator,
      type: this.type,
      format: this.format,
      direction: this.direction,
    };

    if (withId) {
      jsonData["id"] = this.id;
    }

    return jsonData;
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
