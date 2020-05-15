const express = require('express');
const router = express.Router();

class Audio {
    constructor(){
        this.name;
        this.age;
    }

    static fromJson(data){
        const audio = new Audio();
        audio.name = data.name
        audio.age = data.age;

        return audio;
    }

    toJson(){
        return {
            name: this.name,
            age: this.age
        }
    }
}

router.get('/', (req, res, next) => {
    const audio = new Audio();
    audio.age = 12;
    audio.name = "ads";

    res.status(200).json(audio.toJson());

});

module.exports = router;