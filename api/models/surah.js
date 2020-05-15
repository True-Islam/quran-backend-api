id = IDField();
number = NumberField((int_only = True));
name = TextField((format = "title"));
english_name = TextField((format = "title"));
english_name_translation = TextField((format = "title"));
number_of_ayahs = NumberField((int_only = True));
revelation_type = TextField((format = "capitalize"));

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

  static fromJson(id, data) {
    const surah = new Surah();
    surah.id = id;
    surah.number = data.number;
    surah.name = data.name;
    surah.englishName = data.englishName;
    surah.englishNameTranslation = data.englishNameTranslation;
    surah.numberOfAyahs = data.numberOfAyahs;
    surah.revelationType = data.revelationType;
  }

  toJson() {
    return {
      number: this.number,
      name: this.name,
      englishName: this.englishName,
      englishNameTranslation: this.englishNameTranslation,
      numberOfAyahs: this.numberOfAyahs,
      revelationType: this.revelationType,
    };
  }
}

module.exports = Surah;
