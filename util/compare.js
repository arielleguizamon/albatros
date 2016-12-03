var fs = require('fs');
var imagediff = require('imagediff');
var Canvas = require('canvas');

module.exports = {

    compareImages: function(firstImage, comparableImage,cb) {
        this.loadImage(firstImage, function(a) {
            var fistImageData = imagediff.toImageData(a);
            this.loadImage(comparableImage, function(b) {
                var comparableImageData = imagediff.toImageData(b);
                cb(imagediff.equal(fistImageData, comparableImageData));
            }.bind(this));

        }.bind(this));
    },

    loadImage: function(url, callback) {
        var image = new Canvas.Image();
        fs.readFile(url, function(error, data) {
            if (error) throw error;
            image.onload = function() {
                callback(image);
            };
            image.src = data;
        });
        return image;
    }
}
