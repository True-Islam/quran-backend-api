ayah_id = IDField();
image = TextField();
class Image {
  constructor() {
    this.ayahId;
    this.link;
  }

  static fromJson(data) {
    const image = new Image();
    image.ayahId = data.ayahId;
    image.link = data.link;

    return image;
  }

  toJson() {
    return {
      ayahId: this.ayahId,
      link: this.link,
    };
  }
}

module.exports = image;
