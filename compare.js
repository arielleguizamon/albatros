var fs = require('fs'),
    imagediff = require('imagediff'),
    Canvas = require('canvas');

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

var aName = 'original.png';
var bName = 'inundada.png'
loadImage(aName, function(a) {
    var aData = imagediff.toImageData(a);
    loadImage(bName, function(b) {
        var bData = imagediff.toImageData(b);
        console.log(" >>>>> equal: ", imagediff.equal(aData, bData));
    });

});
