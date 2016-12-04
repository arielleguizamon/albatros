var requestify = require('requestify');
var express = require('express');
var app = express();
var compare = require("./util/compare.js");
var path = require('path'); //used for file path
var fs = require('fs-extra'); //File System - for file manipulatio
var bodyParser = require('body-parser')

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));

app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.send('');
// });

app.set('views', __dirname + '/public/views');


app.post('/upload', function(req, res) {

    var fstream;
    console.log('before upload');
    img = req.body.imgBase64
    var base64Data = img.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("./public/img/comparable.png", base64Data, {encoding: 'base64'}, function(err) {
        if (err)console.log(err);
        else console.log('imagen subida')
    });

});

app.get('/', function(req, res) {
        var firstImage = './public/img/original.png';
        var comparableImage = './public/img/comparable.png'

        compare.compareImages(firstImage, comparableImage, function(equal) {
            console.log('both images are equal? ' + equal)
            if (!equal) {
                requestify.request('http://plataformaalbatros.azurewebsites.net/tables/Alarma', {
                        method: 'POST',
                        body: {
                            'tipo': 'Tormenta',
                            'latitud': '37.1900',
                            'longitud': '59.0800',
                            'activa': 'true'

                        },
                        headers: {
                            'ZUMO-API-VERSION': "2.0.0",
                            'Content-Type': 'application/json'
                        },
                        dataType: 'json'

                    })
                    .fail(function(err) {
                        console.log(err)
                    })
                    .then(function(response) {
                        // Get the response body (JSON parsed or jQuery object for XMLs)
                        var response = response.getBody();
                        console.log('alerta creada')
                    });
                res.render('index', {
                    'iguales': equal
                })
            }

        });
    })
    // app.get('/ejemplo-danger',function(req,res){
    //     res.sendFile(__dirname + '/public/views/ejemplo-danger.html')
    //
    // })
    // app.get('/live', function(req, res) {
    //     res.sendFile(__dirname + '/public/views/live.html')

// })

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
