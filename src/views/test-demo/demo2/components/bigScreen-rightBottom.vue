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
        <img class="rightTopImg" src="@/assets/imgs-bigScreen/bigScreen4.png" alt="" />
        <div class="useNum">
          <div class="lebel">今日最高</div>
          <div class="value">
            <CountTo
              ref="countRef1"
              :start-val="startVal1"
              :end-val="endVal1"
              :duration="duration"
              :decimals="decimals"
              :separator="separator"
              prefix=""
              suffix=""
              :autoplay="autoplay"
              class="text-18px font-bold text-[var(--scrollNum-00FFBC)]"
            />
          </div>
        </div>
        <div class="pieImg">
          <img src="@/assets/imgs-bigScreen/bigScreen21.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Echart } from '@/components/Echart' //引入图表
import { satisfactionOptions } from '@/views/Dashboard/components/bigScreenChart'
import { CountTo } from '@/components/CountTo'
import { ref, unref } from 'vue'

const duration = ref(3000) //数字滚动过渡时间
const decimals = ref(0) //保留几位小数
const separator = ref(',') //分隔符
const autoplay = ref(false) //是否自动播放

const countRef1 = ref<ComponentRef<typeof CountTo>>() //标记ref元素
const startVal1 = ref(0) //开始数字
const endVal1 = ref(5699) //结束数字

// 让数字动起来
function startNum() {
  unref(countRef1)?.start()
}
setTimeout(() => {
  startNum()
}, 1000)
</script>
<style lang="less" scoped>
.rightBottomBox {
  height: 100%;
  font-weight: bold;
  background-image: url('@/assets/imgs-bigScreen/bigScreen25.png');
  background-size: 100% 100%;

  .rightTopBoxTitle {
    display: flex;
    width: 100%;
    height: 35px;
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

  .mainBox {
    display: flex;
    width: 100%;
    height: calc(100% - 30px);
    padding: 10px;
    transform: translateY(-10px);
    box-sizing: border-box;
    justify-content: space-between;

    .mainLeft {
      width: calc(50% - 5px);
      height: 100%;
      overflow: hidden;
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
      position: relative;
      width: calc(50% - 5px);
      height: 100%;
      overflow: hidden;
      border: 1px solid rgb(154, 154, 154);

      .rightTitle {
        height: 25px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 25px;
        color: #fff;
      }

      .rightTopImg {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
      }

      .useNum {
        display: inline-block;
        height: 50px;
        padding: 0 20px;
        margin-top: 10px;

        .lebel {
          font-size: 12px;
          color: #fff;
        }
      }

      .pieImg {
        display: flex;
        width: 100%;
        height: calc(100% - 85px);
        align-items: center;
        justify-content: center;

        img {
          width: calc(160px * 1.2);
          height: calc(100px * 1.2);
        }
      }
    }
  }
}
</style>
