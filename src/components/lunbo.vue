<template>
  <div class="nav">
      <div class="navPicture">
          <div class="showmeuns">
          <ul>
                <li class="catogory1">新闻</li>
                <li class="catogory2">潮流</li>
                <li class="catogory3">教育</li>
                <li class="catogory4">居家</li>
                <li class="catogory5">文学</li>
                <li class="catogory6">艺术</li>
          </ul>
      </div>
      <div class="showpicture" id="showpicture">
          <ul>
          <li><router-link to="022"><img src="../../static/1.jpg" alt=""></router-link></li>
          <li><router-link to="042"><img src="../../static/2.jpg" alt=""></router-link></li>
          <li><router-link to="052"><img src="../../static/3.jpg" alt=""></router-link></li>
          </ul>
          <div>
              <span></span>
              <span></span>
              <span></span>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "lunbo",
  data() {
    return {};
  },
  mounted() {
      this.lunbo();
  },
  methods: {
      lunbo: function() {
          var li = document.getElementById('showpicture');
          var showpicture = li.getElementsByTagName('li');
          var span = li.getElementsByTagName('span');
          var len = showpicture.length;
          var count = 1;
          function show() {

              for(var i = 0; i < len; i++) {
                  showpicture[i].style.display = "none";
                  span[i].style.background = 'white';
              }

              if (count < len) {
                 showpicture[count].style.display = "block";
                 span[count].style.background = '#0f9352';
                 count++;
              } else {
                  showpicture[0].style.display = "block";
                  span[0].style.background = '#0f9352';
                  count = 1;
              }
          }
          setInterval(show, 2000);
      }
  }
};
</script>

<style scoped>
    .nav {
        width: 100%;
        height: 400px;
    }

    .navPicture {
        width: 100%;
        height: 100%;
        background: #F4F4F4;
        border-top: 1px solid #969696;
    }

    .showmeuns {
        float: left;
        width: 12%;
        height: 100%;
        margin-left: 10%;
        background: #FFFFF0;
        box-shadow: 0px 0px 5px #FFF5EE;
    }

    .showmeuns li {
        width: 100%;
        height: 65px;
        line-height: 65px;
        list-style: none;
        border-radius: 2px;
        border: 1px dashed #E8E8E8;
        
    }

    .showpicture {
        float: left;
        width: 66%;
        height: 100%;
        margin-right: 10%;
        position: relative;
    }

    .showpicture li {
        display: none;
        width: 100%;
        height: 400px;
    }

    .showpicture li:first-child {
        display: block;
    }

    .showpicture li img {
        width: 100%;
        height: 100%;
    }

    .showpicture div {
        width: 20%;
        height: 20px;
        line-height: 20px;
        position: absolute;
        left: 40%;
        top: 85%;
    }

    .showpicture span {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-left: 10px;
        background: white;
        border-radius: 50%;
    }

    .showpicture span:first-child {
        background: #0f9352;
    }

</style>

