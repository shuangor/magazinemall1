<template>
  <div class="part3">
        <div class="part3-xinwen" id="part3-xinwen">
            <p>1F<span>新闻</span></p>
            <div class="part3-xinwen-content"> 
              <div class="part3-xinwen-showcontent" v-for="item in content1" v-bind:key="item.productId">            
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
              </div>  
            </div>
        </div>
        <div class="part3-chaoliu" id="part3-chaoliu">
            <p>2F<span>潮流</span></p>
            <div class="part3-chaoliu-content"> 
              <div class="part3-chaoliu-showcontent" v-for="item in content2" v-bind:key="item.productId">
                <a href="#">
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
                </a>
              </div>  
            </div>
        </div>
        <div class="part3-jiaoyu" id="part3-jiaoyu">
            <p>3F<span>教育</span></p>
            <div class="part3-jiaoyu-content"> 
              <div class="part3-jiaoyu-showcontent" v-for="item in content3" v-bind:key="item.productId">
                <a href="#">
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
                </a>
              </div>  
            </div>
        </div>
        <div class="part3-jujia" id="part3-jujia">
            <p>4F<span>居家</span></p>
            <div class="part3-jujia-content"> 
              <div class="part3-jujia-showcontent" v-for="item in content4" v-bind:key="item.productId">
                <a href="#">
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
                </a>
              </div>  
            </div>
        </div>
        <div class="part3-wenxue" id="part3-wenxue">
            <p>5F<span>文学</span></p>
            <div class="part3-wenxue-content"> 
              <div class="part3-wenxue-showcontent" v-for="item in content5" v-bind:key="item.productId">
                <a href="#">
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
                </a>
              </div>  
            </div>
        </div>
        <div class="part3-yishu" id="part3-yishu">
            <p>6F<span>艺术</span></p>
            <div class="part3-yishu-content"> 
              <div class="part3-yishu-showcontent" v-for="item in content6" v-bind:key="item.productId">
                <a href="#">
                    <router-link v-bind:to="item.productId">
                     <img v-bind:src="'../../static/' + item.productImage" alt="" />
                    <li>{{item.productName}}</li>
                    <span>杂志价格: ￥{{item.salePrice}}</span>
                    </router-link>
                </a>
              </div>  
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "showcontent",
  data() {
    return {
      content: [],
      content1: [],
      content2: [],
      content3: [],
      content4: [],
      content5: [],
      content6: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      var arr = [];

      var _ = this;
      this.$axios
        .get("/goods")
        .then(function(response) {
        
            arr = response.data.data[0].result;
            console.log(response.data);
            _.content = arr;
            _.content1 = arr.slice(0, 10);
            _.content2 = arr.slice(10, 20);
            _.content3 = arr.slice(20, 30);
            _.content4 = arr.slice(30, 40);
            _.content5 = arr.slice(40, 50);
            _.content6 = arr.slice(50, 60);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.part3 {
  width: 92%;
  height: 2800px;
  background: #eee;
  padding-left: 5%;
  padding-right: 3%;
}

.part3-xinwen p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #916c57;
  border-bottom: 2px solid #916c57;
}

.part3-xinwen p span {
  display: inline-block;
  margin-left: 8px;
  color: #916c57;
}

.part3-xinwen-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-xinwen-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-xinwen-showcontent li {
  margin-top: 5px;
  color: #916c57;
  font-size: 12px;
  text-align: center;
}

.part3-xinwen-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #916c57;
  text-align: center;
}

.part3-xinwen-showcontent li:hover {
  text-decoration: underline;
}

.part3-xinwen-showcontent img {
  display: inline-block;
  width: 85%;
  height: 60%;
  margin-left: 2%;
  margin-top: 4%;
}

.part3-xinwen-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-xinwen-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}

.part3-chaoliu p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #7E6285;
  border-bottom: 2px solid #7E6285;
}

.part3-chaoliu p span {
  display: inline-block;
  margin-left: 8px;
  color: #7E6285;
}

.part3-chaoliu-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-chaoliu-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-chaoliu-showcontent li {
  margin-top: 5px;
  color: #7E6285;
  font-size: 12px;
  text-align: center;
}

.part3-chaoliu-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #7E6285;
  text-align: center;
}

.part3-chaoliu-showcontent li:hover {
  text-decoration: underline;
}

.part3-chaoliu-showcontent img {
  display: inline-block;
  width: 90%;
  height: 60%;
  margin-left: 4%;
  margin-top: 4%;
}

.part3-chaoliu-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-chaoliu-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}

.part3-jiaoyu p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #CE4040;
  border-bottom: 2px solid #CE4040;
}

.part3-jiaoyu p span {
  display: inline-block;
  margin-left: 8px;
  color: #CE4040;
}

.part3-jiaoyu-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-jiaoyu-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-jiaoyu-showcontent li {
  margin-top: 5px;
  color: #CE4040;
  font-size: 12px;
  text-align: center;
}

.part3-jiaoyu-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #CE4040;
  text-align: center;
}

.part3-jiaoyu-showcontent li:hover {
  text-decoration: underline;
}

.part3-jiaoyu-showcontent img {
  display: inline-block;
  width: 90%;
  height: 60%;
  margin-left: 4%;
  margin-top: 4%;
}

.part3-jiaoyu-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-jiaoyu-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}

.part3-jujia p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #539A6F;
  border-bottom: 2px solid #539A6F;
}

.part3-jujia p span {
  display: inline-block;
  margin-left: 8px;
  color: #539A6F;
}

.part3-jujia-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-jujia-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-jujia-showcontent li {
  margin-top: 5px;
  color: #539A6F;
  font-size: 12px;
  text-align: center;
}

.part3-jujia-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #539A6F;
  text-align: center;
}

.part3-jujia-showcontent li:hover {
  text-decoration: underline;
}

.part3-jujia-showcontent img {
  display: inline-block;
  width: 90%;
  height: 60%;
  margin-left: 4%;
  margin-top: 4%;
}

.part3-jujia-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-jujia-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}

.part3-wenxue p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #D36953;
  border-bottom: 2px solid #D36953;
}

.part3-wenxue p span {
  display: inline-block;
  margin-left: 8px;
  color: #D36953;
}

.part3-wenxue-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-wenxue-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-wenxue-showcontent li {
  margin-top: 5px;
  color: #D36953;
  font-size: 12px;
  text-align: center;
}

.part3-wenxue-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #D36953;
  text-align: center;
}

.part3-wenxue-showcontent li:hover {
  text-decoration: underline;
}

.part3-wenxue-showcontent img {
  display: inline-block;
  width: 90%;
  height: 60%;
  margin-left: 4%;
  margin-top: 4%;
}

.part3-wenxue-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-wenxue-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}

.part3-yishu p {
  width: 98%;
  height: 30px;
  padding-top: 20px;
  padding-left: 2%;
  text-align: left;
  font-size: 18px;
  color: #5C90B6;
  border-bottom: 2px solid #5C90B6;
}

.part3-yishu p span {
  display: inline-block;
  margin-left: 8px;
  color: #5C90B6;
}

.part3-yishu-content {
  width: 100%;
  height: 400px;
  background: white;
}

.part3-yishu-showcontent {
  float: left;
  width: 19.8%;
  height: 198px;
  border: 1px dashed #cdc9c9;
}

.part3-yishu-showcontent li {
  margin-top: 5px;
  color: #5C90B6;
  font-size: 12px;
  text-align: center;
}

.part3-yishu-showcontent span {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  font-size: 13px;
  color: #5C90B6;
  text-align: center;
}

.part3-yishu-showcontent li:hover {
  text-decoration: underline;
}

.part3-yishu-showcontent img {
  display: inline-block;
  width: 90%;
  height: 60%;
  margin-left: 4%;
  margin-top: 4%;
}

.part3-yishu-showcontent img:hover {
  box-shadow: 0 0 7px #838b83;
  transition: all ease 0.3s;
  padding-top: 2px;
}

.part3-yishu-showcontent a {
  text-align: center;
  color: #303030;
  text-overflow: ellipsis;
}


</style>
