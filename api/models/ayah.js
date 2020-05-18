class Ayah {
  constructor() {
    this.id;
    this.surahId;
    this.number;
    this.numberInSurah;
    this.juz;
    this.manzil;
    this.ruku;
    this.hizbQurater;
    this.sajda;
    this.arabic;
  }

  static fromJson(data, id = null) {
    const ayah = new Ayah();
    ayah.id = id;
    ayah.surahId = data.surahId;
    ayah.number = data.number;
    ayah.numberInSurah = data.numberInSurah;
    ayah.juz = data.juz;
    ayah.manzil = data.manzil;
    ayah.ruku = data.ruku;
    ayah.hizbQurater = data.hizbQurater;
    ayah.sajda = data.sajda;
    ayah.arabic = data.arabic;

    return ayah;
  }

  toJson(withId = false) {
    const jsonData = {
      surahId: this.surahId,
      number: this.number,
      numberInSurah: this.numberInSurah,
      juz: this.juz,
      manzil: this.manzil,
      ruku: this.ruku,
      hizbQurater: this.hizbQurater,
      sajda: this.sajda,
      arabic: this.arabic,
    };

    if (withId) {
      jsonData["id"] = this.id;
    }

    return jsonData;
  }
}

Ayah.collection = "ayahs";

const ayahConverter = {
  toFirestore(ayah) {
    return ayah.toJson();
  },
  fromFirestore(data) {
    return Ayah.fromJson(data);
  },
};

module.exports.Ayah = Ayah;
module.exports.ayahConverter = ayahConverter;
