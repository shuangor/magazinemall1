<template>
  <div class="cart">
      <header>
      <div class="nav">
          <div class="nav-part1"><i>1</i>确认购物清单</div>
          <span class="nav-part1-span"></span>
          <span class="nav-part2-span1">
              <i></i>
              <i></i>
          </span>
          <div class="nav-part2"><i>2</i>确认收货人地址和电话</div>
          <span class="nav-part2-span2"></span>
          <span class="nav-part3-span">
              <i></i>
              <i></i>
          </span>
          <div class="nav-part3"><i>3</i>完成</div>
      </div>
    </header>
    <section>
      <div class="section-part1">
        你购物车中的商品
      </div>
      <div class="section-list">
          <span>商品名称</span>
          <span>价格</span>
          <span>数量</span>
          <span>小计</span>
          <span>操作</span>
      </div>
      <div class="goods-list">
           <form>
           </form>            
            <div class="goods-price-total">
                <div>总计: <span></span></div>
                <a class="button" href="javascript:;" onclick="alert('订单提交完成, 后续功能还待开发')">确认订单</a>
            </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "cart",
  data() {
    return {};
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      function init() {
        var arr = [];

        getData();
        //  postData(); 这个函数不能放在这里因为$.ajax 是一个异步函数, 所以渲染数据加载会后执行

        function getData() {

            $.ajax({
                method: "get",
                url: "/user/cart/ajax"
            }).done(function(data) {
                for (var i = 0; i < data.message.length; i++) {
                    var html = `
                        <div class="goodsMessage">
                        <span>${data.message[i].productName}</span>
                        <span class="price">￥${data.message[i].salePrice}</span>
                        <span class="checkNumber"><i>-</i><b>${data.message[i].sellNumber}</b><i>+</i></span>
                        <span class="calculate">￥${data.message[i].salePrice}</span>
                        <span>删除</span>
                        </div>
                    `;
                    $("form").append(html);
                }

            bindEvent();
            postData();

        });
      }

      function bindEvent() {

        totalEvent();

        var goodsMessage = $("form div");

        for (var i = 0; i < goodsMessage.length; i++) {
          (function(i) {
            $(goodsMessage[i]).find(".checkNumber i").eq(1).on("click", function() {

                var number = parseInt($(goodsMessage[i]).find(".checkNumber b").text());
                number = number + 1;
                var price = parseInt($(goodsMessage[i]).find("span").eq(1).text().split("￥")[1]);
                var total = number * price;

                $(goodsMessage[i]).find(".checkNumber b").text(number);
                // 添加增加后的数量

                $(goodsMessage[i]).find(".calculate").text("￥" + total);
                // 添加这个商品的小计

                totalEvent();
                // 重新加载这个小计之和渲染出数据
              });

            $(goodsMessage[i]).find(".checkNumber i").eq(0).on("click", function() {
                var number = parseInt($(goodsMessage[i]).find(".checkNumber b").text());

                    if (number > 0) {
                        number = number - 1;
                        var price = parseInt($(goodsMessage[i]).find("span").eq(1).text().split("￥")[1]);
                        var total = number * price;

                        $(goodsMessage[i]).find(".checkNumber b").text(number);
                        // 添加减少后的数量

                        $(goodsMessage[i]).find(".calculate").text("￥" + total);
                        // 添加这个商品的小计

                        totalEvent();
                        // 重新加载这个小计之和渲染出数据
                    }
            });

            $(goodsMessage[i]).find("span").eq(4).on("click", function() {
                
                $(goodsMessage[i]).remove(); 
                // 把这个商品从购物车中删除
                
                // dropData();
                totalEvent(); 
                // 再次重新渲染
              });
          })(i);
        }
      }

      function totalEvent() {
          var calculate = $(".calculate");
          var totalPrice = 0;

          for (var i = 0; i < calculate.length; i++) {
            
            totalPrice = parseInt($(calculate[i]).text().split("￥")[1]) + totalPrice;
          
          }

          $(".goods-price-total div span").text("￥" + totalPrice);
          postData();
          // 根据实时渲染的结构，重新绑定post事件
      }

      function dropData() {
          var arrData = [];

          function Shop(productName, salePrice, sellNumber) {
              this.productName = productName;
              this.salePrice = salePrice;
              this.sellNumber = sellNumber;
          }

          var goodsMessage = $(".goodsMessage");

          for(var i = 0; i < goodsMessage.length; i++) {

              var message1 = $(goodsMessage[i]).find("span").eq(0).text();
              var message2 = $(goodsMessage[i]).find("span").eq(1).text().split("￥")[1];
              var message3 = $(goodsMessage[i]).find("span").eq(2).find("span b").text();

              var shop = new Shop(message1, message2, message3);

              arrData[i] = shop;

               $.ajax({
                    method: "POST",
                    url: "/user/cart/postdata",
                    dataType: "json",
                    traditional: true,
                    data: { message: JSON.stringify(arrData) }
                });
          }
      }

      function postData() {

        var arrData = [];

        function Shop(productName, salePrice, sellNumber) {
          this.productName = productName;
          this.salePrice = salePrice;
          this.sellNumber = sellNumber;
        }

        var goodsMessage = $(".goodsMessage");

        $(".button").on("click", function() {
          for (var i = 0; i < goodsMessage.length; i++) {

            var message1 = $(goodsMessage[i]).find("span").eq(0).text();
            var message2 = $(goodsMessage[i]).find("span").eq(1).text().split("￥")[1];
            var message3 = $(goodsMessage[i]).find("span b").text();

            var shop = new Shop(message1, message2, message3);

            arrData[i] = shop;
          }

          console.log(arrData);
          $.ajax({
            method: "POST",
            url: "/user/cart/postdata",
            dataType: "json",
            traditional: true,
            data: { message: JSON.stringify(arrData) }
          });
        });
      }
    }

        init();
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
  text-decoration: none;
}

header {
  width: 80%;
  height: 100px;
  padding-left: 10%;
}

header .nav {
  width: 80%;
  height: 35px;
  margin: 0 auto;
  margin-top: 50px;
}

.nav-part1 {
  float: left;
  width: 220px;
  height: 80%;
  vertical-align: top;
  background-color: #0f9352;
  color: white;
  font-size: 15px;
}

.nav-part1 i {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
  font-size: 15px;
  background-color: white;
  border-radius: 20px;
  color: #0f9352;
}

.nav-part1-span {
  float: left;
  display: block;
  width: 0;
  height: 0;
  border-left: 20px solid #0f9352;
  border-top: 14.2px solid transparent;
  border-bottom: 14.2px solid transparent;
}

.nav-part2 {
  float: left;
  width: 220px;
  height: 80%;
  vertical-align: top;
  background-color: #aaa;
  color: white;
  font-size: 15px;
}

.nav-part2 i {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
  font-size: 15px;
  background-color: white;
  border-radius: 20px;
  color: #aaa;
}

.nav-part2-span1 {
  float: left;
  display: block;
  width: 20px;
  height: 28.4px;
}

.nav-part2-span1 i:first-child {
  display: block;
  width: 0;
  height: 0;
  border-right: 20px solid #aaa;
  border-bottom: 14.2px solid transparent;
  margin: 0px;
  padding: 0px;
}

.nav-part2-span1 i:last-child {
  display: block;
  width: 0;
  height: 0;
  border-right: 20px solid #aaa;
  border-top: 14.2px solid transparent;
  margin: 0px;
  padding: 0px;
}

.nav-part2-span2 {
  float: left;
  display: block;
  width: 0;
  height: 0;
  border-left: 20px solid #aaa;
  border-top: 14.2px solid transparent;
  border-bottom: 14.2px solid transparent;
}

.nav-part3 {
  float: left;
  width: 220px;
  height: 80%;
  vertical-align: top;
  background-color: #aaa;
  color: white;
  font-size: 15px;
}

.nav-part3 i {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
  font-size: 15px;
  background-color: white;
  border-radius: 20px;
  color: #aaa;
}

.nav-part3-span {
  float: left;
  display: block;
  width: 20px;
  height: 28.4px;
}

.nav-part3-span i:first-child {
  display: block;
  width: 0;
  height: 0;
  border-right: 20px solid #aaa;
  border-bottom: 14.2px solid transparent;
  margin: 0px;
  padding: 0px;
}

.nav-part3-span i:last-child {
  display: block;
  width: 0;
  height: 0;
  border-right: 20px solid #aaa;
  border-top: 14.2px solid transparent;
  margin: 0px;
  padding: 0px;
}

section {
  width: 80%;
  height: 400px;
  margin: 0px auto;
  border: 3px solid #0f9352;
}

.section-part1 {
  width: 92%;
  height: 30px;
  margin: 0px auto;
  margin-top: 10px;
  padding-top: 5px;
  padding-left: 3%;
  color: white;
  font-size: 15px;
  border-radius: 3px;
  background-color: #0f9352;
}

.section-list {
  position: relative;
  width: 800px;
  height: 30px;
  margin: 0px auto;
  padding: 0px;
  background: #f0f0f0;
  border-radius: 3px;
}

.section-list span {
  display: inline-block;
  width: 150px;
  height: 25px;
  font-size: 12px;
  text-align: center;
  padding-top: 5px;
}

.goodsMessage {
  width: 793px;
  height: 65px;
  margin: 0px auto;
  padding: 0px;
  background: white;
  border-radius: 2px;
  border: 1px solid #f0f0f0;
}

.goodsMessage span {
  display: inline-block;
  vertical-align: top;
  width: 150px;
  height: 40px;
  font-size: 12px;
  padding-top: 20px;
  text-align: center;
}

.goodsMessage span:last-child {
  width: 110px;
  height: 25px;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 0px;
  border-radius: 3px;
  font-size: 13px;
  background: red;
  color: white;
}

.goodsMessage span i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0px 5px;
  border: 1px solid #aaa;
}

.goods-price-total {
  width: 798px;
  height: 40px;
  margin: 0px auto;
  padding: 0px;
  background: white;
  border-radius: 2px;
  border: 1px solid #f0f0f0;
}

.goods-price-total div {
  float: left;
  width: 100px;
  height: 40px;
  padding-top: 5px;
  margin-left: 160px;
  text-align: center;
  font-size: 15px;
}

.goods-price-total div span {
  display: inline-block;
  font-size: 13px;
  margin-left: 12px;
}

.goods-price-total .button {
  float: left;
  display: block;
  height: 30px;
  width: 80px;
  margin-top: 3px;
  margin-left: 160px;
  padding-top: 5px;
  text-align: center;
  border: 1px solid;
  background: #666;
  border-radius: 3px;
  color: #f0f0f0;
}

.goods-price-total .button:hover {
  background-color: #0f9352;
  transition: 0.1s;
}

form {
  width: 800px;
  height: 280px;
  margin: 0px auto;
  overflow-y: auto;
}

form::-webkit-scrollbar {
    width: 5px;
}

form::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
}

form::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
}

</style>

