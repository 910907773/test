<script src="main.js"></script>
<template>
  <div style="width:100%;overflow: hidden;" id="div2">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <rili></rili>
    <div id="bg-blur">
      <div class="hello">
        <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" :markDate=arr :class="{yy:true}">
        </Calendar>
      </div>
    </div>
    <live2d></live2d>
    <div id="diandian">
       <dd><a href="#">点点</a> </dd>
      <div> <li><a href="#">  <img src="./assets/ab.jpg"></a></li></div>
      <div> <li><a href="#">  <img src="./assets/90.jpg" ></a></li></div>
      <div>  <li><a href="#">  <img src="./assets/60.jpg" ></a></li></div>
      </div>
    <div class="home" style="position:relative">
      <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" />
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
import * as animationData from './assets/110.json';

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
.hello{
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
  top:50px;
  right: 80px;
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

</style>
