<template>
  <div class="leftBottom">
    <div class="leftBottomTitle">人流量分区段</div>
    <div class="chartBox">
      <Echart :options="peopleOptions" style="width: 100%; height: 100%" />
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
</template>
<script setup lang="ts">
import { peopleOptions } from '@/views/Dashboard/components/bigScreenChart'
import { Echart } from '@/components/Echart' //引入图表
</script>
<style lang="less" scoped>
.leftBottom {
  position: relative;
  height: 100%;

  .leftBottomTitle {
    height: 50px;
    padding-left: 10px;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
    box-sizing: border-box;
  }

  .chartBox {
    width: 100%;
    height: calc(100% - 50px);
    // background-color: pink;
  }

  .circle1 {
    position: absolute;
    top: 16%;
    left: 16%;
    width: 20px;
    height: 20px;
    background-color: rgb(155, 178, 0);
    border-radius: 50%;
  }

  .circle2 {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 40px;
    height: 40px;
    background-color: rgb(0, 137, 33);
    border-radius: 50%;
  }

  .circle3 {
    position: absolute;
    bottom: 3%;
    left: 30%;
    width: 10px;
    height: 10px;
    background-color: rgb(130, 144, 170);
    border-radius: 50%;
  }

  .circle4 {
    position: absolute;
    bottom: 7%;
    left: 65%;
    width: 30px;
    height: 30px;
    background-color: rgb(0, 200, 151);
    border-radius: 50%;
  }
}
</style>
