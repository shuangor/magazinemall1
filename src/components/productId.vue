<template>
  <div id="part_3">
        <div class="production">
            <img v-bind:src="'../../static/' + content.productImage" alt="">
             <h2>{{content.productName}}</h2>
            <div class="description">
              <h2>杂志大促销售卖</h2>
              <li>价格<span>¥{{content.salePrice}}</span></li>
              <li>剩余数量<span>{{content.productNum}}</span></li>
            </div>       
              <div class="button" id="button"><router-link to="/user/cart">加入购物车</router-link></div>
        </div>
        <img src="../../static/ad2.jpg" alt="">
        <div class="detail">
            <div class="showNav">
                <ul>
                 <li class="pickOne">商品详情</li>
                 <li>商品评价</li>
                 <li>产品咨询</li>
                </ul>
            </div>
            <div class="showMessage">
                <div><li>{{content.productMessage}}</li></div>
                <div><li>{{comment}}</li></div>
                <div><li>暂时不提供咨询服务</li></div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: "productId",
  data() {
    return {
        id: null,
        content: "",
        data: null,
        comment: "暂时没有"
    };
  },
  mounted() {
    this.initStyle();
    var item = this.$route.params.id;
    this.id = item;
    this.initData();
    this.clickGoodbutton();
  },
  methods: {
    initStyle() {
      var nav = document.getElementsByClassName("showNav");
      var showMessage = document.getElementsByClassName("showMessage");
      var li1 = showMessage[0].getElementsByTagName("li");
      var message = showMessage[0].getElementsByTagName("div");
      var pickOne = document.getElementsByClassName("pickOne");

      pickOne[0].style.background = "#0F9352";
      pickOne[0].style.color = "white";
      li1[1].style.display = "none";
      li1[2].style.display = "none";

      var li = nav[0].getElementsByTagName("li");

      for (let i = 0; i < li.length; i++) {
        li[i].onclick = function() {
          for (var j = 0; j < li.length; j++) {
            li[j].style.background = "";
            pickOne[0].style.background = "";
            li[j].style.color = "#333";
            li1[j].style.display = "none";
          }

          li[i].style.background = "#0F9352";
          li[i].style.color = "white";
          li1[i].style.display = "block";
        };
      }
    },
    initData() {  
        this.$axios.get("/goods").then((res)=> {
            
            this.data = res.data.data[0].result;
            for(var i = 0; i < 60; i++) {
                if (this.id == this.data[i].productId) {
                    this.content = this.data[i];
                    console.log(this.content);
                }
            }

            this.comment = this.content.evaluate[0].comment;

        }).catch((err)=> {
            console.log(err);
        })
    },
    clickGoodbutton() {
        var _ = this;
        var button = document.getElementById("button");
        button.addEventListener("click", function() {
            if (!document.cookie) {
              alert("请先登录");
              event.preventDefault();
            } else {
              _.$axios.post("/user/cart", {
                productName: _.content.productName,
                salePrice: _.content.salePrice,
                sellNumber: 1
              }).then(function(response) {
                console.log(response);
              }).catch(function(err) {
                console.log(err);
              });
            }
        }, true);
        
    }
  }
}
</script>

<style scoped>
#part_3 {
  width: 80%;
  height: 250px;
  margin: 10px auto;
}

#part_3 .production {
  width: 100%;
  height: 500px;
} 

#part_3 .production img {
  float: left;
  width: 45%;
  height: 90%;
  border: 1px solid rgba(0,0,0,.05);
  padding: 15px 8px;
}

#part_3 > img {
    display: inline-block;
    width: 18%;
    height: 400px;
    margin: 0px auto;
}

#part_3 .description {
  display: inline-block;
  width: 40%;
  height: 150px;
  margin: 0px;
  padding: 0px;
  margin-top: 35px;
  background-image: url(../../static/1.png); 
}

#part_3 .description li {
  height: 25px;
  width: 80%;
  color: #999;
  padding-left: 20px;
  margin-top: 15px;
  letter-spacing: 2px;
  font-size: 13px;
  text-align: left;
}

#part_3 .description span {
  margin-left: 35px;
  color: #CD5B45;
}

#part_3 .description li:nth-child(2) {
  letter-spacing: 28px;
  font-size: 14px;
  margin-top: 20px;  
}

#part_3 .description li:nth-child(2) > span {
  letter-spacing: 2px;
  margin-left: 15px;
  font-size: 20px;
}

#part_3 .description h2 {
  height: 30px;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 30px;
  background: #0F9352;
  color: white;
  border-radius: 3px;
  box-shadow: 0px 2px 2px #CDC5BF;
}

#part_3  .button {
  margin-left: 600px;
  margin-top: 100px;
  width: 120px;
  height: 45px;
  line-height: 45px;
  color: white;
  background: #0F9352;
}

#part_3 .button a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: white;
}


#part_3 .detail {
    float: right;
    width: 80%;
    height: 400px;
    border: 1px solid #B0B0B0;
    margin-bottom: 20px;
}

#part_3 .showNav ul {
  width: 100%;
  height: 30px;
  text-align: center;
  border-bottom: 1px solid #B0B0B0;
}

#part_3 .showNav li {
  float: left;
  width: 150px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  letter-spacing: 2px;
}

#part_3 .showMessage > li {
  display: block;
}

#part_3 .showMessage li {
  font-size: 14px;
  letter-spacing: 1px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 15px;
  text-align: left;
  text-indent: 25px;
}


</style>

