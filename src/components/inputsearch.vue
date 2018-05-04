<template>
  <div class="inputsearch">
      <div class="searchbar">
        <select >
            <option value="index">商品</option>
            <option value="store">店铺</option>
        </select>
        <input type="text" placeholder="请输入关键字" />
        <div>搜索</div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'inputsearch',
    data() {
          return {
              
        }
    }
}
</script>

<style scoped>
    .inputsearch {
        width: 100%;    
        height: 100px;
    }

    .searchbar {
        width: 600px;
        height: 35px;
        margin: 30px auto;
        border: 3px solid #0F9352;
    }

    .searchbar select {
        float: left;
        width: 60px;
        height: 36px;
        color: white;
        border: 0px;
        text-align: center;
        background: #0F9352;
        appearance: none;
        -moz-appearance: none;
        padding: 0px 0px 0px 15px;
    }

    .searchbar option {
        display: block;
        width: 60px;
        height: 35px;
        color: black;
        text-align: center;
        background-color: #fff;
        appearance:none;
        -moz-appearance: none;  
        padding: 0px 0px 0px 15px;
    }

    .searchbar input {
        float: left;
        width: 420px;
        height: 26px;
        padding-left: 10px;
        padding-top: 3px;
        outline: none;
        border: 0px;
    }

    .searchbar div {
        float: left;
        width: 110px;
        height: 35px;
        color: white;
        background: #0F9352;
        text-align: center;
        line-height: 35px;
    }
</style>

