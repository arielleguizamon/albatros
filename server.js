var requestify = require('requestify');
var express = require('express');
var app = express();
var compare = require("./util/compare.js");

//app.use(express.static(__dirname+'public'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send('');
});


app.get('/danger', function(req, res) {
    var firstImage = './public/original.png';
    var comparableImage = './public/inundada.png'

    compare.compareImages(firstImage, comparableImage, function(equal) {
        console.log('both images are equal? ' + equal)
        if (!equal) {
            requestify.post('http://plataformaalbatros.azurewebsites.net/tables/Alarma', {
                    satatus: 'danger',
                    type: 'flood',
                    coordinates: 'aaa,aaa'
                })
                .then(function(response) {
                    // Get the response body (JSON parsed or jQuery object for XMLs)
                    var response = response.getBody();
                    console.log(response)
                });
        }

    });
})


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});