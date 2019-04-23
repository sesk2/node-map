var app = require('express')();
var http = require('http').Server(app);
var PORT = 8080


//ルートディレクトリにアクセスした時に動く処理
app.get('/', function(req, res) {
  //index.htmlにリダイレクトする
  res.sendFile(__dirname + '/index.html');
});



//接続待ち状態になる
http.listen(PORT, function() {
  console.log('接続開始', PORT);
});
