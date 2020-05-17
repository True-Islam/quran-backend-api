class Surah {
  constructor() {
    this.id;
    this.number;
    this.name;
    this.englishName;
    this.englishNameTranslation;
    this.numberOfAyahs;
    this.revelationType;
  }

  static fromJson(data, id = null) {
    const surah = new Surah();
    surah.id = id;
    surah.number = data.number;
    surah.name = data.name;
    surah.englishName = data.englishName;
    surah.englishNameTranslation = data.englishNameTranslation;
    surah.numberOfAyahs = data.numberOfAyahs;
    surah.revelationType = data.revelationType;

    return surah;
  }

  toJson(withId = false) {
    const jsonData = {
      number: this.number,
      name: this.name,
      englishName: this.englishName,
      englishNameTranslation: this.englishNameTranslation,
      numberOfAyahs: this.numberOfAyahs,
      revelationType: this.revelationType,
    };

    if (withId) {
      jsonData["id"] = this.id;
    }

    return jsonData;
  }
}

Surah.collection = "surahs";

const surahConverter = {
  toFirestore(surah) {
    return surah.toJson();
  },
  fromFirestore(data) {
    return Surah.fromJson(data);
  },
};

module.exports.Surah = Surah;
module.exports.surahConverter = surahConverter;
