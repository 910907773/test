<template>
 <div class="calendar">
   <div class="calendar_title"></div>
       <div class="date">11, 2021</div>
         <div class="arrow arrow-right"></div>
 </div>
  <div class="calendar_content">
    <div class="row title">
      <span>SUN</span>
      <span>MON</span>
      <span>TUE</span>
      <span>WED</span>
      <span>THU</span>
      <span>FRI</span>
      <span>SAT</span>
    </div>
    <div class="row content">
      <span class="grey">29</span>
      <span class="grey">30</span>
      <span class="grey">31</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>10</span>
      <span>11</span>
      <span>12</span>
      <span>13</span>
      <span>14</span>
      <span>15</span>
      <span>16</span>
      <span>17</span>
      <span>18</span>
      <span>19</span>
      <span>20</span>
      <span>21</span>
      <span>22</span>
      <span>12</span>
      <span>12</span>


    </div>
  </div>
</template>

<script>
export default {
  name: "calendar"
}
</script>

<style scoped>
.calendar{
  width: 400px;
  height: 400px;
  background-color: #e1e1e1;
  border-radius: 2px;
}
.calendar_title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  background-color: #00B8EC;
  color: #e1e1e1;
  font-size: 20px;
}
  .calendar .row{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 20px;
    -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  }
  .calendar .row.title{
    color: #E8F0F3;
  }
  .calendar .row .content{
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding-top: 0;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
.calendar .row .content > span{
  padding-bottom: 20px;
  width: calc(100% / 7);
  text-align: center;
}
.grey{
  color: #bbb;
}
</style>