<template>
  <div class="leftTopBox">
    <div class="title">实时数据监测</div>
    <div class="chartBox">
      <div class="chart1 chartItem">
        <div class="itemTitle">租赁信息</div>
        <div class="chart1Box">
          <div class="chart1Item">
            <div class="imgBox">
              <img src="@/assets/imgs-bigScreen/bigScreen16.png" alt="" />
            </div>
            <div class="chart1ItemBottom">
              <div class="dayLabel">今日平均</div>
              <div class="CountToBox">
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
                  class="text-15px font-bold text-[var(--scrollNum-fff)]"
              /></div>
            </div>
          </div>
          <div class="chart1Item">
            <div class="imgBox">
              <img src="@/assets/imgs-bigScreen/bigScreen17.png" alt="" />
            </div>
            <div class="chart1ItemBottom">
              <div class="dayLabel">今日最高</div>
              <div class="CountToBox">
                <CountTo
                  ref="countRef2"
                  :start-val="startVal2"
                  :end-val="endVal2"
                  :duration="duration"
                  :decimals="decimals"
                  :separator="separator"
                  prefix=""
                  suffix=""
                  :autoplay="autoplay"
                  class="text-15px font-bold text-[var(--scrollNum-fff)]"
              /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart2 chartItem">
        <div class="itemTitle">实时客流量</div>
        <div class="chart2Box">
          <div class="sumBox">
            <div class="label">游客总量</div>
            <div class="value">
              <CountTo
                ref="countRef3"
                :start-val="startVal3"
                :end-val="endVal3"
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
          <div class="carouselBox">
            <div class="carouselBoxTitle">
              <div class="label">景点</div>
              <div class="value">人数</div>
            </div>
            <div class="carouselMain">
              <div class="dataItem" v-for="(item, index) in chart2Data" :key="index">
                <div class="dataItem_l">{{ item.name }}</div>
                <div class="dataItem_R">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chartBox chartBox2">
      <div class="chart3 chartItem">
        <div class="itemTitle">实时门票销量</div>
        <div class="chart3Box">
          <Echart :options="pieOptions" style="width: 100%; height: 100%" />
        </div>
      </div>
      <div class="chart4 chartItem">
        <div class="itemTitle">停车场使用率</div>
        <div class="chart4Box">
          <Echart :options="carOptions" style="width: 100%; height: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CountTo } from '@/components/CountTo'
import { tempObj } from '@/views/Dashboard/components/bigScreen'
import { pieOptions, carOptions } from '@/views/Dashboard/components/bigScreenChart'
import { Echart } from '@/components/Echart' //引入图表
// import { ElRow, ElCol, ElInputNumber, ElInput, ElButton } from 'element-plus'
import { ref, unref, reactive } from 'vue'

const duration = ref(3000) //数字滚动过渡时间
const decimals = ref(0) //保留几位小数
const separator = ref(',') //分隔符
const autoplay = ref(false) //是否自动播放

const countRef1 = ref<ComponentRef<typeof CountTo>>() //标记ref元素
const startVal1 = ref(0) //开始数字
const endVal1 = ref(1314512) //结束数字

const countRef2 = ref<ComponentRef<typeof CountTo>>() //标记ref元素
const startVal2 = ref(0) //开始数字
const endVal2 = ref(1314512) //结束数字

const countRef3 = ref<ComponentRef<typeof CountTo>>() //标记ref元素
const startVal3 = ref(0) //开始数字
const endVal3 = ref(1314512) //结束数字
// 让数字动起来
function startNum() {
  unref(countRef1)?.start()
  unref(countRef2)?.start()
  unref(countRef3)?.start()
}
setTimeout(() => {
  startNum()
}, 1000)
// 创建chart2的数据
let chart2Data: Array<tempObj> = reactive([])
function setChart2Data() {
  for (let i = 0; i < 15; i++) {
    let single = {
      name: '景点' + i,
      value: Math.round(Math.random() * 1000)
    }
    chart2Data.push(single)
  }
}
setChart2Data()
</script>
<style lang="less" scoped>
.leftTopBox {
  height: 100%;
  font-weight: bold;
  background-image: url('@/assets/imgs-bigScreen/bigScreen25.png');
  background-size: 100% 100%;

  .title {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
    text-align: center;
  }

  .chartBox {
    display: flex;
    width: calc(100% - 20px);
    height: calc((100% - 50px) / 2 - 25px);
    margin: 10px auto;
    justify-content: space-between;

    .chartItem {
      width: calc(50% - 5px);
      height: 100%;
      overflow: hidden;
      background-color: #325048;

      .itemTitle {
        height: 30px;
        padding-left: 10px;
        font-size: 16px;
        line-height: 30px;
        color: #fff;
        // background-color: pink;
      }
    }

    .chart1 {
      .chart1Box {
        display: flex;
        height: calc(100% - 30px);

        .chart1Item {
          width: 50%;
          height: 100%;
          align-items: center;

          .imgBox {
            display: flex;
            height: calc(100% - 70px);
            align-items: center;
            justify-content: center;

            img {
              width: calc(51px * 1);
              height: calc(44px * 1);
            }
          }

          .chart1ItemBottom {
            height: 50px;

            .dayLabel {
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              color: #fff;
              text-align: center;
            }

            .CountToBox {
              display: flex;
              height: 30px;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }

    .chart2 {
      height: 100%;

      .chart2Box {
        height: calc(100% - 30px);

        .sumBox {
          display: flex;
          align-items: center;
          height: 30px;

          .label {
            width: 40%;
            font-size: 12px;
            color: #fff;
            text-align: center;
          }
        }

        .carouselBox {
          height: calc(100% - 30px);
          // background-color: green;
          .carouselBoxTitle {
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 12px;
            color: gray;
            text-align: center;

            .label {
              width: 40%;
            }

            .value {
              width: 60%;
            }
          }

          .carouselMain {
            width: 100%;
            height: calc(100% - 20px);
            overflow: auto;

            .dataItem {
              display: flex;
              height: 20px;
              color: #fff;
              text-align: center;
              align-items: center;

              .dataItem_l {
                width: 40%;
                font-size: 12px;
              }

              .dataItem_R {
                width: 60%;
                font-size: 16px;
              }
              // background-color: aquamarine;
            }
          }
          /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
          .carouselMain::-webkit-scrollbar {
            width: 2px;
            height: 7px;
          }
          /*定义滑块 内阴影+圆角*/
          .carouselMain::-webkit-scrollbar-thumb {
            background-color: #01a283;
          }
        }
      }
    }

    .chart3 {
      height: 100%;

      .chart3Box {
        width: 100%;
        height: calc(100% - 30px);
      }
    }

    .chart4 {
      height: 100%;

      .chart4Box {
        width: 100%;
        height: calc(100% - 30px);
      }
    }
  }

  .chartBox2 {
    margin-top: 10px;
  }
}
</style>
