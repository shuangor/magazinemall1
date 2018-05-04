<template>
  <div id="app">
    <router-view name="headerComponents" />
    <router-view name="inputsearch"></router-view>
    <router-view name="lunbo"></router-view>
    <router-view name="productId"></router-view>
    <router-view name="showcontent" />
    <router-view name="HelloWorld" />
    <router-view name="cart"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
