var express = require('express');
var app = express();

// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// })
//미들웨어는 리퀘스트가 들어오면 어떤 처리를 해주는놈
// 미들웨어의 처리이후에 다음 과정을 진행한다

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
  res.send('Hello World!!!!!!!!')
});

app.get('/hello',function(req,res){
  res.send('Hello')
});

app.post('/user',function(req,res){
  // res.send('POST (Create)');
  console.log('데이터 확인',req.body);
  // post로 날리면 request의 body로 들어온다.
  res.send({state: 'OK',data: req.body});
});

// app.get('/user/:userId',function(req,res){
//   // res.send('GET (Read)');
//   console.log(req.params.userId + '의 정보를 가져옵니다');
//
//   var user = {
//     userId : req.params.userId,
//     name : 'Shin',
//     email : 'wow@wow',
//     company : 'GS'
//   };
//
//   res.send(user);
// });

app.get('/user/search',function(req,res){
  console.log('데이터 확인',req.query.userId);
  var user = [{
    userId : req.query.userId,
    name : 'Shin',
    email : 'wow@wow',
    company : 'GS'
  }];
  res.send({result : user});
});

app.put('/user/:userId',function(req,res){
  res.send('PUT (Update)');
});

app.delete('/user/:userId',function(req,res){
  res.send('DELeTE (Delete)');
})

app.use(express.static('public'));
// 정적인 결과를 항상 돌려주는 기능, express의 강력한 기능이다!
// 웹서버에서 제공하는 스태틱한 기능을 nodejs에서는 한줄로 구현이 가능하다

app.listen(3000,function(){
  console.log('Example app listening on port 3000!')
})
