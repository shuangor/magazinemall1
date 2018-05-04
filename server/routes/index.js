var express = require('express');
var router = express.Router();
 
const goods = require('../model/goods.js');
const users = require('../model/user.js');
 
/* GET home page. */
router.get('/goods', function (req, res, next) {
  goods.find({}, function (err, doc) {
    if (err) {
      res.send({
        code: 'fail',
        data: [],
        msg: err
      })
    } else {
      res.json({
        code: 'success',
        data: doc,
        msg: ''
      });
    }
  })
});
 
 
router.get('/user/cart/ajax', function (req, res, next) {
  users.findOne({ _id: req.cookies._id }, function (err, doc) {
    res.json({
      message: doc.myCart
    })
  })
})

router.get('/username', (req, res, next) => {
  users.findOne({_id: req.cookies._id }, (err, doc) => {
    res.json({
      msg: doc.username
    })
  })
})
 
router.post('/user/cart', function (req, res, next) {
  let message = req.body;
  let j = 0;
  console.log(message);
  users.findOne({ _id: req.cookies._id }, function (err, doc) {
    for (let i = 0; i < doc.myCart.length; i++) {
      if (doc.myCart[i].productName == message.productName) {
        j = 1;
      }
    }
 
    if (j == 0) {
      doc.myCart.push(message);
      doc.save();
    }
  })
})
 
router.post('/user/cart/postdata', function (req, res, next) {
 
  var data = JSON.parse(req.body.message);
 
  console.log(data);
 
  users.findOne({ _id: req.cookies._id }, function (err, doc) {
 
    // doc.myCart = data.message; 这样不行, 数组需要深度拷贝才能进行存储
 
    function shallowClone(copyObj) {
      var obj = {};
      for (var i in copyObj) {
        obj[i] = copyObj[i];
      }
      return obj;
    }
 
 
 
    doc.myCart = data;
    doc.save();
    console.log(doc.myCart);
  })
})
 
router.get('/:productId', function (req, res, next) {
   
  goods.find({}, function(err, doc) {
    if (err) {
      res.json({
        "code": "false",
        "data": [],
        "msg": err
      })
    } else {
      res.json({
        "code": "success",
        "data": doc
      })
    }
     
  })
})
 
router.post('/login', function (req, res, next) {
  let param = {
    username: req.body.username,
    password: req.body.password
  };
 
  users.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        message: "密码不对"
      })
    } else {
      if (doc === null) {
        res.send("没有这个用户!");
      } else {
        res.cookie("_id", doc._id, {
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.redirect("/");
      }
    }
  })
})
 
router.post('/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
 
  users.findOne({ username: username }, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        message: err.message
      });
    } else {
      if (doc) {
        res.render("register", {});
      } else {
        users.create({ username: username, password: password }, function (err, data) {
          if (err) {
            res.json({
              status: "1",
              message: err.message
            })
          } else {
            res.redirect("/");
          }
        })
      }
    }
  })
})
 
 
module.exports = router;