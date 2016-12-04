var requestify = require('requestify');
var express = require('express');
var app = express();
var compare = require("./util/compare.js");


app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.send('');
// });


app.get('/danger', function(req, res) {
    var firstImage = './public/img/original.png';
    var comparableImage = './public/img/inundada.png'

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
                .fail(function(err){
                    console.log(err)
                })
                .then(function(response) {
                    // Get the response body (JSON parsed or jQuery object for XMLs)
                    var response = response.getBody();
                    console.log(response)
                    res.send('alert sent !')
                });
        }

    });
})
app.get('/ejemplo-danger',function(req,res){
    res.sendFile(__dirname + '/public/views/ejemplo-danger.html')

})
app.get('/live', function(req, res) {
    res.sendFile(__dirname + '/public/views/live.html')

})


app.get('', function(req, res){
    res.sendFile(__dirname + 'public/img/')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
