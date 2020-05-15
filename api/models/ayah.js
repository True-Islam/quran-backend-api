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

    static fromJson(id, data) {
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
    }

    toJson() {
        return {
            surahId: this.surahId,
            number: this.number,
            numberInSurah: this.numberInSurah,
            juz: this.juz,
            manzil: this.manzil,
            ruku: this.ruku,
            hizbQurater: this.hizbQurater,
            sajda: this.sajda,
            arabic: this.arabic
        }
    }
}

module.exports = Ayah