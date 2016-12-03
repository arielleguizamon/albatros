var fs = require('fs');
var imagediff = require('imagediff');
var Canvas = require('canvas');

// images
var firstImage = 'original.png';
var comparableImage = 'inundada.png'

loadImage(firstImage, function(a) {
    var fistImageData = imagediff.toImageData(a);
    loadImage(comparableImage, function(b) {
        var comparableImageData = imagediff.toImageData(b);
        console.log("equal: ", imagediff.equal(fistImageData, comparableImageData));
    });

});

function loadImage(url, callback) {
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
