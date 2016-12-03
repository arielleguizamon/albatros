var cv = require('opencv');

cv.readImage("./mona-lisa.jpg", function(err, im) {
    im.convertGrayscale()
    im.canny(5, 300)
    im.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
        for (var i = 0; i < faces.length; i++) {
            var x = faces[i]
            im.ellipse(x.x + x.width / 2, x.y + x.height / 2, x.width / 2, x.height / 2);
        }
        im.save('./canny.jpg');
    });
})