var express = require('express');

var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sample-server');
const User = mongoose.model('User', { id: String, password: String, name: String, email: String,
gender: String, location: String });

// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// })
//미들웨어는 리퀘스트가 들어오면 어떤 처리를 해주는놈
// 미들웨어의 처리이후에 다음 과정을 진행한다

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// app.get('/',function(req,res){
//   res.send('Hello World!!!!!!!!')
// });

app.get('/hello',function(req,res){
  res.send('Hello');
});


//-------------------------------------------------------------------------------------------------

app.post('/user',function(req,res){
  // res.send('POST (Create)');
  var data = req.body;
  const person = new User({ id: data.id, password: data.password, name: data.name, email: data.email,
  gender: data.gender, location: data.location });
  person.save().then((result) => {
    console.log(result),
    res.send({state: 'OK',data: req.body});
  });
  // console.log('데이터 확인',req.body);
  // // post로 날리면 request의 body로 들어온다.
  // res.send({state: 'OK',data: req.body});
});

app.post('/login',function(req,res){
  // res.send('POST (Create)');
  var data = req.body;
  const person = new User({ id: data.id, password: data.password});
  User.findOne({id:data.id, password: data.password},'id name',function(err,result){
      if (err){
        console.log('error occured in the database');
      }
      if(result){
        // res.send(result.name + '님 환영합니다.');
        // console.log(result);
        res.redirect('/modify.html?id='+result.id);
      }else{
        res.send('정보와 일치하는 회원이 존재하지 않습니다.');
      }
  });
});


app.get('/user/:userId',function(req,res){
  // res.send('GET (Read)');
  User.findOne({id:req.params.userId},'id password name email gender location',function(err,result){
      if (err){
        console.log('error occured in the database');
      }
      if(result){
        res.send(result);
        console.log(result);
      }else{
        res.send('정보와 일치하는 회원이 존재하지 않습니다.');
      }
  });
});

app.put('/user/:userId',function(req,res){
  User.findOneAndUpdate({id:req.params.userId},{name:req.body.name},function(err){
    if (err)
        console.log('error occured in the database');
    res.send('변경완료');
  })
});


app.delete('/user/:userId',function(req,res){
  User.deleteOne({id:req.params.userId}, function (err) {
    if (err)
      console.log('error occured in the database');
    res.send('삭제완료');
  });
})


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


app.use(express.static('public'));
// 정적인 결과를 항상 돌려주는 기능, express의 강력한 기능이다!
// 웹서버에서 제공하는 스태틱한 기능을 nodejs에서는 한줄로 구현이 가능하다

app.listen(3000,function(){
  console.log('Example app listening on port 3000!')
})
