var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 8080;
var date = new Date()

const Bot = require('./bot')

chatlogger = function(id, name, action, message) {
  var now = date.getTime();
  console.log('Time: %s, ID: %s, Name: %s, Action: %s, Message: %s', now, id, name, action, message);
};

//ルートディレクトリにアクセスした時に動く処理
app.get('/', function(req, res) {
  //index.htmlにリダイレクトする
  res.sendFile(__dirname + '/index.html');
});


//socket.ioに接続された時に動く処理
io.on('connection', function(socket) {
  ///get userName
  //socket.on('connect', function(){
  //  socket.emit('setUserName', prompt('ユーザー名を入力してください'));
  //});

  ///set userName
  //socket.on('setUserName', function (userName) {
  //    if(!userName) userName = '匿名';

  //    socket.userName = userName;
  //});

  //接続時に振られた一意のIDをコンソールに表示
  socket.userName = 'You';
  chatlogger(socket.id, 'You', 'Login', 'Logged in.');

  //接続時に全員にIDを表示（messageというイベントでクライアント側とやりとりする）
  io.emit('message', socket.userName + 'さんが入室しました！', 'SKI');

  //messageイベントで動く
  //全員に取得したメッセージとIDを表示
  socket.on('message', function(msg) {
    io.emit('message', msg, socket.userName);
    chatlogger(socket.id, socket.userName, 'RecieveMessage', msg);
    var response = Bot.response(msg)
    io.emit('message', response, 'SKI');
    chatlogger(0, 'SKI', 'SendMessage', response);
  });

  //接続が切れた時に動く
  //接続が切れたIDを全員に表示
  socket.on('disconnect', function(e) {
    chatlogger(socket.id, socket.userName, 'Login', 'Logged out.');
  });

  socket.on('refresh', function() {
    io.emit('message', Bot.response('reloaded.') , 'SKI');
  });
});


//接続待ち状態になる
http.listen(PORT, function() {
  console.log('接続開始', PORT);
});
