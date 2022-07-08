<template>
  <div class="rightCenterBox">
    <div class="rightCenterBoxTitle">
      <div class="content">男女比例统计</div>
    </div>
    <div class="rightCenterChart">
      <Echart :options="sexOptions" style="width: 100%; height: 100%" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Echart } from '@/components/Echart' //引入图表
import { sexOptions } from '@/views/Dashboard/components/bigScreenChart'
</script>
<style lang="less" scoped>
.rightCenterBox {
  height: 100%;
  font-weight: bold;
  background-image: url('@/assets/imgs-bigScreen/bigScreen25.png');
  background-size: 100% 100%;

  .rightCenterBoxTitle {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .content {
      padding: 0 15px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background-image: url('@/assets/imgs-bigScreen/bigScreen23.png');
      background-size: 100% 100%;
      transform: translateY(-50%);
    }
  }

  .rightCenterChart {
    width: 100%;
    height: calc(100% - 30px);
  }
}
</style>
