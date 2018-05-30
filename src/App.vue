<template>
  <div id="app">
    <div class="wow animated fadeInDown">
      <h1 style=" font-family: 'Arial Rounded MT Bold'; pointer-events: none;">{{title}}</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        title: "The List Of UK's Police"
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    border: 0;
    background-image: url("../static/bg.jpg");
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10%;
    margin-top: 5%;
  }
</style>
