<template>
  <div class="rightBottomBox">
    <div class="rightTopBoxTitle">
      <div class="content">景点热度调查</div>
    </div>
    <div class="mainBox">
      <div class="mainLeft">
        <div class="leftTitle">景区满意度调查</div>
        <div class="increase">
          <div class="increaseItem">
            <div class="text">
              <div>较昨日增长</div>
              <div>4%</div>
            </div>
            <img src="@/assets/imgs-bigScreen/bigScreen10.png" alt="" />
          </div>
          <div class="increaseItem">
            <div class="text">较昨日增长4% </div>
            <img src="@/assets/imgs-bigScreen/bigScreen10.png" alt="" />
          </div>
        </div>
        <div class="leftChartBox">
          <Echart :options="satisfactionOptions" style="width: 100%; height: 100%" />
        </div>
      </div>
      <div class="mainRight">
        <div class="rightTitle">公众号使用量</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Echart } from '@/components/Echart' //引入图表
import { satisfactionOptions } from '@/views/Dashboard/components/bigScreenChart'
</script>
<style lang="less" scoped>
.rightBottomBox {
  height: 100%;
  font-weight: bold;

  .rightTopBoxTitle {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .content {
      padding: 0 15px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background-color: rgb(166, 166, 166);
      transform: translateY(-50%);
    }
  }

  .mainBox {
    display: flex;
    width: 100%;
    height: calc(100% - 30px);
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;

    .mainLeft {
      width: calc(50% - 5px);
      height: 100%;
      border: 1px solid rgb(154, 154, 154);

      .leftTitle {
        height: 25px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 25px;
        color: #fff;
      }

      .increase {
        display: flex;
        height: 30px;
        padding: 0 10px;
        margin-top: 10px;
        box-sizing: border-box;

        .increaseItem {
          display: flex;
          width: calc(50% - 5px);
          height: 30px;
          margin: 0 5px;
          border: 1px solid rgb(0, 255, 255);
          border-radius: 15px;
          align-items: center;
          justify-content: center;

          .text {
            font-size: 12px;
            color: #fff;
            text-align: center;
            transform: scale(0.8);
          }

          img {
            width: 15px;
            height: 15px;
            transform: translate(-2px, -2px);
          }
        }
      }

      .leftChartBox {
        width: 100%;
        height: calc(100% - 65px);
        // background-color: pink;
      }
    }

    .mainRight {
      width: calc(50% - 5px);
      height: 100%;
      border: 1px solid rgb(154, 154, 154);

      .rightTitle {
        height: 25px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 25px;
        color: #fff;
      }
    }
  }
}
</style>
