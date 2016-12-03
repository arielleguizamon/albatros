var fs = require('fs');
var imagediff = require('imagediff');
var Canvas = require('canvas');

module.exports = {

    compareImages: function(path1, path2) {
        var firstImage = 'original.png';
        var comparableImage = 'inundada.png'

        this.loadImage(firstImage, function(a) {
            var fistImageData = imagediff.toImageData(a);
            loadImage(comparableImage, function(b) {
                var comparableImageData = imagediff.toImageData(b);
                console.log("equal: ", imagediff.equal(fistImageData, comparableImageData));
            });

        });
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
