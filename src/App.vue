<script src="main.js"></script>
<template>
  <div style="width:100%;overflow: hidden;" id="div2">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <rili></rili>
    <div id="bg-blur">
      <div class="home" style="position:relative">
        <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" />
      </div>
    </div>
    <live2d></live2d>
    <div id="diandian">
       <dd><a href="https://123-two-brown.vercel.app/">点点相册</a> </dd>
      <a href="#">  <img class="pic pic1" src="./assets/ab.jpg"></a>
       <a href="#">  <img class="pic pic2" src="./assets/90.jpg" ></a>
       <a href="#">  <img class="pic pic6" src="./assets/68.jpg"></a>
       <a href="#">  <img class="pic pic3" src="./assets/60.jpg"></a>

    </div>
    <div style="position: absolute;top: 0;width: 100%;" id="div1">
      <center style="margin-top: 30px;">
        <label>
          <input type="text" v-model="text" :maxlength="15" placeholder="添加计划" @keyup.enter="addplan"/>
        </label>
        <table style="width: 50%;margin-top: 20px;" id="table">
          <tbody>
          <tr v-for="plan in plans" :key="plan.id" @dblclick="remove(plan.id)" id="tr">
            <td style="width: 40%;">{{plan.plan}}</td>
            <td style="width: 40%;">已完成 {{plan.count}} 天</td>
            <td style="width: 20%;">
              <button @click="finish(plan.id)">完成任务</button>
            </td>
          </tr>
          </tbody>
        </table>
      </center>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Calendar from "vue-calendar-component";
import lottie from 'vue-lottie';
import * as animationData from './assets/100.json';
animationData.assets.forEach((item) => {
  item.u = '';
  if (item.w && item.h) {
    item.p = require(`@/assets/6.jpg`);
  }
});

Vue.component('lottie', lottie);
Vue.use(ElementUI);
Vue.prototype.moment = moment;
export default {
  name: 'app',
  components: {Calendar},

  data() {
    return {
      url: ('images/2.gif'),
      urllist: [],
      timer: null,
      plans: JSON.parse(localStorage.getItem('plans')) || [],
      text: '',
      defaultOptions: { animationData: animationData.default,
      }
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
      方法调用
      //  this.anim.setSpeed(0.1）
    },
    clickDay(date) {
      this.date = date; //今天日期
      console.log(date);
      //  moment.locale('zh-cn');
      var t = moment(date).format('YYYY-MM-DD');//没错，此处大写，非yyyy-MM-dd
      console.log(t);
    },
    changeDate(date) {
      console.log(date); //左右点击切换月份
    },
    clickToday(date) {
      date = date
    },
    bthclick() {
    },
    },


  components: {
    Calendar
  },
  computed: {
    plan() {
      return {
        id: Number(Math.random().toString().substr(3, length) + Date.now()).toString(36),
        plan: this.text,
        count: 0,
        yesterday: '',
        today: this.moment().format('yyyy/MM/DD')
      }
    }
  },
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-z16/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '../static/live2dw/live2d-widget-model-z16/assets/z16.model.json' },
        display: { position: 'right', width: 300, height: 650 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
    this.plans.forEach(plan => {
      plan.today = this.moment().format('yyyy/MM/DD')
      this.arr = [new Date()];
    })
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: './live2dw',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2dw/live2d-widget-model-tororo/assets',
        tagMode: false,
        debug: false,
        model: { jsonPath: './live2dw/live2d-widget-model-tororo/assets/tototo.model.json' },
        display: { position: 'left', width: 150, height: 300 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
    this.arr = [new Date()];
  },
  mounted() {

  },
  components: {Calendar},
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
      方法调用
      //  this.anim.setSpeed(0.1）
    },
    setBody() {
    },
    addplan() {
      if (this.text !== '') {
        if (this.plans.length < 10) {
          this.plans.push(this.plan)
          this.setBody();
          this.text = ''
          localStorage.setItem('plans', JSON.stringify(this.plans))
        } else {
          alert('每天的计划不要太多哟')
          this.text = ''
        }
      }
    },
    finish(id) {
      this.plans.forEach(plan => {
        if (plan.id === id) {
          if (plan.today !== plan.yesterday) {
            this.$message.success('恭喜你完成了今天的' + plan.plan)
            plan.count++
            plan.yesterday = plan.today
          } else {
            this.$message.info('今天已完成' + plan.plan + '，明天再来吧，再接再厉', 2)
          }
        }
      })
      localStorage.setItem('plans', JSON.stringify(this.plans))
    },
    remove(id) {
      let result = confirm("确定要删除这条计划吗？");
      if (result) {
        this.plans = this.plans.filter(plan => plan.id !== id)
        this.setBody()
        localStorage.setItem('plans', JSON.stringify(this.plans))
      }
    },

  },

  }

</script>

<style scoped>
calendar{

}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


html {
  width: 100%;
  height: 100%;
}
#bg-blur {
  background: url("./assets/ag.png");
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
   position:fixed;
  background-size:cover;

}
* {
  margin: 0;
  padding: 0;
}
#diandian{
  width: 650px;
  height: 350px;
  position: absolute;
  top: 600px;
  right: -75px;
  margin: 50px 60px 10px 40px;
  float: left;
  background-image: url("./assets/120.jpg");
}
#diandian dl{
  float: left;
  margin-left: 40px;
  text-align: center;
  width: 190px;
}
#diandian  img{
  padding: 10px 10px 15px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 3px rgba(50,50,50,0.4);
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  -ms-transition: all 0.5s ease-in;
  -o-transition: all 0.5s ease-in;
  transition: all 0.5s ease-in;
  position: absolute;
  z-index: 1;
}
.pic{
  width: 160px;
}
#diandian img:hover {
  box-shadow: 15px 15px 20px rgba(50,50,50,0.4);
  transform:rotate(0deg) scale(2.20);
  -webkit-transform:rotate(0deg) scale(1.20);
  z-index: 1000;
}
.pic1{
  left: 400px;
  top: 200px;
  transform:rotate(-5deg);
  -webkit-transform:rotate(-5deg);
}

.pic2{
  left: 400px;
  top: 0px;
  transform:rotate(-10deg);
  -webkit-transform:rotate(-10deg);
}
.pic3{
  top: 80px;
  right: 250px;
  height: 200px;
  width: 200px;
}

.pic4{
  top: 130px;
  left: 550px;
  width: 80px;
  height: 180px;
  transform:rotate(-10deg);
  -webkit-transform:rotate(-10deg);
}

.pic5{
  top: 220px;
  right: 500px;
  transform:rotate(-10deg);
  -webkit-transform:rotate(-10deg);
  width: 50px;
  height: 100px;
}
.pic6{
  left: 0px;
  top: 100px;
  transform:rotate(5deg);
  -webkit-transform:rotate(5deg);
  height: 200px;
  width: 150px;
}

.pic7{
  left: 550px;
  top: 0;
  transform:rotate(20deg);
  -webkit-transform:rotate(20deg);
  width: 80px;
  height: 200px;
}

input {
  border: none;
  border-bottom: 2px solid #80848f;
  width: 40%;
  height: 30px;
  text-align: center;
  outline: none;
  font: 500 15px "微软雅黑 Light";
  color: #1c2438;
  background: none;
}

input:focus {
  border-bottom: 2px solid #01AAED;
}

button {
  border: none;
  background-color: #ffffff;
  outline: none;
  width: 100px;
  height: 40px;
  color: #2F4056;
  font: 500 16px "微软雅黑 Light";
  border-radius: 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
}
#hello{
  height: 500px;
  width: 600px;
  position: fixed;
  top:300px;
  right: 750px;

}
calender{
  background-color: aqua;
}
button:hover {
  box-shadow: 0 0 10px #F0F0F0;
}
.home{
  height: 500px;
  width: 600px;
  position: fixed;
  top:500px;
  right: -500px;
}
tr {
  display: block;
  border: 3px solid #4a677d;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
}

td {
  text-align: center;
  padding: 10px 50px;
}

</style>
