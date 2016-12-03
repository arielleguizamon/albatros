var requestify = require('requestify');
var express = require('express');
var app = express();
var compare =require("./util/compare.js");

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('');
});


app.get('/danger', function(req,res){
    compare.compareImages();
    requestify.post('http://example.com', {
        satatus: 'danger',
        type: 'flood',
        coordinates: 'aaa,aaa'
    })
    .then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        var response = response.getBody();

    });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
