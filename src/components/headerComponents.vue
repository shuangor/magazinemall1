<template>
  <div class="wrapper">
  <div class="header-nav-left" v-if="!isLogin">
      <div class="header-content"><a href="/">欢迎来到杂志售卖商城</a></div>
      <div class="header-login"><a href="#" v-on:click="login">登录</a></div>
      <div class="header-register"><a href="#" v-on:click="register">注册</a></div>
  </div>
  <div class="header-nav-left" v-else>
      <div class="header-content"><a href="/">欢迎来到杂志售卖商城</a></div>
      <div class="header-user">用户: {{username}}</div>
  </div>
  <div class="header-nav-right">
      <div class="header-sell">
          <a href="#" onclick="alert('暂不提供此服务')">卖家中心</a>
      </div>
      <div class="header-cart" v-if="!isLogin">
         <a href="#" onclick="alert('请先登录')">购物车</a>
      </div>
      <div class="header-cart" v-else>
         <a href="#"><router-link to="/user/cart">购物车</router-link></a>
      </div>
      <div class="header-resolve">
        <a href="#" onclick="alert('暂不提供此服务')">客服中心</a>
      </div>  
  </div>
  <div id="login">
    <div class="delet">
      <span v-on:click="deletlogin">×</span>
    </div>
    <div class="user">
      <input class="loginusername" type="text" name="username" placeholder="用户名">
    </div>
    <div class="password">
      <input class="loginpassword" type="password" name="password" placeholder="密码">
    </div>
    <div class="button" v-on:click="clickLogin" @keydown.enter="clickLogin">
      登录
    </div>
  </div>
  <div id="register">
    <div class="delet">
      <span v-on:click="deletregister">×</span>
    </div>
    <div class="user">
      <input class="registerusername" type="text" name="username" placeholder="用户名">
    </div>
    <div class="password">
      <input class="registerpassword" type="password" name="password" placeholder="密码">
    </div>
    <div class="password">
      <input class="registerrepassword" type="password" name="repassword" placeholder="确认密码">
    </div>
    <div class="button" v-on:click="clickRegister">注册</div>
  </div>
  </div>
</template>
<script>
export default {
  name: "headerComponents",
  data() {
    return {
      username: '',
      isLogin: false,
      msg: "header is login"
    };
  },
  mounted() {
      this.initState();
      this.initUsername();
  },
  methods: {
    initState() {
        if (document.cookie) {
          this.isLogin = true;
          console.log(document.cookie);
        } else {
          this.isLogin = false;
        }
    },
    login() {
      let login = document.getElementById("login");
      login.style.display = 'block';
      this.deletregister();
    },
    register() {
      let login = document.getElementById("register");
      login.style.display = 'block';
      this.deletlogin();
    },
    deletlogin() {
      let login = document.getElementById("login");
      login.style.display = 'none';
    },
    deletregister() {
      let login = document.getElementById("register");
      login.style.display = 'none';
    },
    clickLogin() {
      let username = document.getElementsByClassName("loginusername")[0];
      let password = document.getElementsByClassName("loginpassword")[0];
      this.$axios.post("/login", {
        username: username.value,
        password: password.value
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
      this.username = username.value;
      document.location.reload();
    },
    clickRegister() {
      let username = document.getElementsByClassName("registerusername")[0];
      let password = document.getElementsByClassName("registerpassword")[0];
      let repassword = document.getElementsByClassName("registerrepassword")[0];

      if (password.value !== repassword.value) {
        alert("两次输入的密码不一致!");
      } else {

        this.$axios.post("/register", {
          username: username.value,
          password: password.value
        }).then(function (response) {
          console.log(response);
        }).catch(function (err) {
          console.log(err);
        });
        document.location.reload();
      }
    },
    initUsername() {
      if (document.cookie) {
        this.$axios.get('/username').then((res) => {
          this.username = res.data.msg;
        }).catch((err) => {
          console.log(err);
        }) 
      }
    }
  }
};
</script>

<style scoped>

 #login {
   width: 400px;
   height: 250px;
   display: none;
   position: fixed;
   top: 25%;
   left: 35%;
   border: 1px solid #808080;
   border-radius: 5px;
   background: white;
   z-index: 2;
 }

 #register {
   width: 400px;
   height: 300px;
   display: none;
   position: fixed;
   top: 25%;
   left: 35%;
   border: 1px solid #808080;
   border-radius: 5px;
   background: white;
   z-index: 2;
 }

  * {
    margin: 0px;
    padding: 0px;
    /* border: 1px solid black; */
}

a {
  display: inline-block;
	width: 100%;
	height: 100%;
	color: #333; 
	text-decoration: none;
}

li {
    list-style: none;
}

body {
	width: 100%;
	height: 100%;
}

.wrapper {
  width: 100%;
  height: 40px;
  background-color: #F2F2F2;
	box-shadow: 1px 1px 3px #B0B0B0;
}

.wrapper > div {
  float: left;
}

.header-nav-left {
  width: 50%;
  height: 40px;
}

.header-nav-right {
  width: 50%;
  height: 40px;
}

.header-nav-left > div {
  display: inline-block;
  line-height: 40px;
  height: 100%;
  text-align: center;
  font-family: '微软雅黑';
  font-size: 13px;
}

.header-nav-left .header-content {
  width: 40%;
}

.header-nav-left .header-login {
  width: 10%;
}

.header-nav-left .header-register {
  width: 10%;
  margin-right: 38%;
}

.header-nav-left .header-user {
  width: 20%;
  margin-right: 38%;
}

.header-nav-right > div {
  display: inline-block;
  line-height: 40px;
  height: 100%;
  text-align: center;
  font-family: '微软雅黑';
  font-size: 15px;
}

.header-nav-right .header-sell {
  width: 15%;
  margin-left: 50%;
}

.header-nav-right .header-cart {
  width: 15%;
}

.header-nav-right .header-resolve {
  width: 15%;
}

.wrapper a:hover {
  color: red;
}

#login .delet {
  width: 100%;
  height: 10%;
  background: #808080;
}

#login .delet span {
  width: 10%;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  font-size: 1.2em;
  margin-left: 90%;
  color: #F2F2F2;
}

#login .user {
  width: 100%;
  height: 16%;
  line-height: 40px;
  margin-top: 5%;
}

#login .user input {
  width: 55%;
  height: 60%;
  margin: 0px auto;
}

#login .password {
  width: 100%;
  height: 16%;
  line-height: 40px;
  margin-top: 5%;
}

#login .password input {
  width: 55%;
  height: 60%;
  margin: 0px auto;
}

#login .button {
  width: 60%;
  height: 15%;
  line-height: 38px;
  margin: 0px auto;
  border: 1px solid gray;
  margin-top: 5%;
}

#register .delet {
  width: 100%;
  height: 8.3%;
  background: #808080;
}

#register .delet span {
  width: 10%;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  font-size: 1.2em;
  margin-left: 90%;
  color: #F2F2F2;
}

#register .user {
  width: 100%;
  height: 14%;
  line-height: 42px;
  margin-top: 5%;
}

#register .user input {
  width: 55%;
  height: 60%;
  margin: 0px auto;
}

#register .password {
  width: 100%;
  height: 14%;
  line-height: 42px;
  margin-top: 5%;
}

#register .password input {
  width: 55%;
  height: 60%;
  margin: 0px auto;
}

#register .button {
  width: 60%;
  height: 13%;
  line-height: 40px;
  margin: 0px auto;
  border: 1px solid gray;
  margin-top: 5%;
}

.wrapper input {
  padding-left: 5%;
  border: 1px solid #CDC5BF;
  border-radius: 2px;
  background: 	#F5F5F5;
}

.wrapper input::-webkit-input-placeholder {
  color: #A8A8A8;
  font-size: 13px;
  font-family: '微软雅黑';
}

.wrapper input::-moz-placeholder {
  color: #A8A8A8;
  font-size: 13px;
  font-family: '微软雅黑';
}

.wrapper input::-ms-input-placeholder {
  color: #A8A8A8;
  font-size: 13px;
  font-family: '微软雅黑';
}

.wrapper input:focus {
  border-style: solid;  
  border-color:#0f9352;  
  box-shadow: 0 0 5px #0f9352;
}


.wrapper .button {
  color: white;
  background: #0f9352;
  border-radius: 5px;
}



</style>

