<template>
</template>
<div id="diandian">
<dd><a href="#">点点</a> </dd>
<div> <li><a href="#">  <img src="./assets/ab.jpg"></a></li></div>
<div> <li><a href="#">  <img src="./assets/90.jpg" ></a></li></div>
<div>  <li><a href="#">  <img src="./assets/60.jpg" ></a></li></div>
</div>
<script>
export default {
  name: "agb",
  computed:{
  },
  data () {
    // 注意：data即使不需要传数据，也必须return,否则会报错
    return {
    }
    }
}
</script>

<style scoped>
#diandian{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 300px;
  right: 200px;
  margin: 50px auto;
  border:solid 1px red;
  float: left;
}
#diandian dl{
  float: left;
  margin-left: 40px;
  text-align: center;
  width: 190px;
}
#diandian div img{
  display: block;
  margin-top: 8px;
  width: 300px;
  height: 200px;
}
#diandian li{
  width: 300px;
  height: 200px;
  list-style: none;
  float: left;
  margin: 10px;
  box-shadow: 0px 0px 10px white;
}
#diandian ul {
  width: 102px;
  height: 600px;
  border: white solid 5px;
  margin: 60px auto;
  box-shadow: 0px 0px 10px #ccc;
}
#diandian img:hover {
  width: 150%;
  height: 150%;
  position: relative;
  top: -40px;
  left: -40px;
}
#diandian dl dd{
  line-height: 35px;
  font-size: 12px;
  font-weight: bold;
}
</style>