var app = require('express')();
var http = require('http').Server(app);
var PORT = 8080
const Line = require('./getGeojson')
var myLines = Line.getLines()


//ルートディレクトリにアクセスした時に動く処理
app.get('/', function(req, res) {
  //index.htmlにリダイレクトする
  res.sendFile(__dirname + '/index.html');
});

app.get('/*.js', function(req, res) {
  var url = req.url
  if(url ==  '/getRoute.js'){
    route = getRoute();
  } else {
    res.sendFile(__dirname + req.url);
  }

});


//接続待ち状態になる
http.listen(PORT, function() {
  console.log('接続開始', PORT);
});
