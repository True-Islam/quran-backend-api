class Audio {
  constructor() {
    this.id;
    this.ayahId;
    this.ayahNumber;
    this.editionId;
    this.type;
    this.link;
  }

  static fromJson(data, id = null) {
    const audio = new Audio();
    audio.id = id;
    audio.ayahId = data.ayahId;
    audio.ayahNumber = data.ayahNumber;
    audio.editionId = data.editionId;
    audio.type = data.type;
    audio.link = data.link;

    return audio;
  }

  toJson() {
    return {
      ayahId: this.ayahId,
      ayahNumber: this.ayahNumber,
      editionId: this.editionId,
      type: this.type,
      link: this.link,
    };
  }
}

Audio.collection = "audios";

const audioConverter = {
  toFirestore(audio) {
    return audio.toJson();
  },
  fromFirestore(data) {
    return Audio.fromJson(data);
  },
};

module.exports.audioConverter = audioConverter;
module.exports.Audio = Audio;
