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

Image.collection = "images";

const imageConverter = {
  toFirestore(image) {
    return image.toJson();
  },
  fromFirestore(data) {
    return Image.fromJson(data);
  },
};

module.exports.Image = Image;
module.exports.imageConverter = imageConverter;
