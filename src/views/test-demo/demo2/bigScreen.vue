<script setup lang="ts">
import leftTop from '@/views/Dashboard/components/bigScreen-leftTop.vue'
import leftBottom from '@/views/Dashboard/components/bigScreen-leftBottom.vue'
import rightTop from '@/views/Dashboard/components/bigScreen-rightTop.vue'
import rightCenter from '@/views/Dashboard/components/bigScreen-rightCenter.vue'
import rightBottom from '@/views/Dashboard/components/bigScreen-rightBottom.vue'
import parkPeople from '@/views/Dashboard/components/bigScreen-parkPeople.vue'
import environmentStatus from '@/views/Dashboard/components/bigScreen-environmentStatus.vue'
import weather from '@/views/Dashboard/components/bigScreen-weather.vue'
import LivingConsumption from '@/views/Dashboard/components/bigScreen-LivingConsumption.vue'
import sexRatio from '@/views/Dashboard/components/bigScreen-sexRatio.vue'
import worderOrder from '@/views/Dashboard/components/bigScreen-worderOrder.vue'
</script>

<template>
  <!-- 
        系统 85px
        容器内边距 40px
        headerBox 70px -->
  <div class="screenBox">
    <div class="headerbox">
      <img src="@/assets/imgs-bigScreen/bigScreen2.png" alt="" />
    </div>
    <div class="mainBox">
      <!-- 左侧区域内容 -->
      <div class="leftBox">
        <div class="leftTopbox">
          <leftTop />
        </div>
        <div class="leftBottombox">
          <leftBottom />
        </div>
      </div>
      <!-- 中间区域内容 -->
      <div class="centerBox">
        <div class="centerBgi"></div>
        <!-- 当日游园人数 -->
        <div class="parkPeopleBox">
          <parkPeople />
        </div>
        <!-- 环境状况 -->
        <div class="environmentStatusBox">
          <environmentStatus />
        </div>

        <div class="centerBottonBox">
          <!-- 智能工单 -->
          <div class="worderOrderBox">
            <worderOrder />
          </div>
          <div class="weatherAndLive">
            <!-- 天气 -->
            <div class="weatherBox">
              <weather />
            </div>
            <!-- 生活消费 -->
            <div class="LivingConsumptionBox">
              <LivingConsumption />
            </div>
          </div>
          <!-- 男女比例 -->
          <div class="sexRatioBox">
            <sexRatio />
          </div>
        </div>
      </div>
      <!-- 右侧区域内容 -->
      <div class="rightBox">
        <div class="rightTopBox">
          <rightTop />
        </div>
        <div class="rightCenterBox">
          <rightCenter />
        </div>
        <div class="rightBottomBox">
          <rightBottom />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@height1: calc(85px + 40px); //系统盒子占位高度
@height2: 70px; //header盒子高度
.screenBox {
  width: 100%;
  height: calc(100vh - @height1);
  background-image: url('@/assets/imgs-bigScreen/bigScreen18.png');
  background-size: 100% 100%;

  .headerbox {
    display: flex;
    width: 100%;
    height: @height2;
    background-image: url('@/assets/imgs-bigScreen/bigScreen19.png');
    background-size: 100% 100%;
    justify-content: center;

    img {
      width: calc(162px * 1.2);
      height: calc(100px * 1.2);
    }
  }

  .mainBox {
    // background-color: rgb(203, 255, 165);
    display: flex;
    width: 100%;
    height: calc(100vh - @height1 - @height2 - 10px);
    justify-content: space-between;
    @width: 26%;

    .leftBox {
      display: flex;
      // border: 1px solid red;
      width: @width;
      height: 100%;
      margin-bottom: 10px;
      margin-left: 10px;
      flex-direction: column;
      justify-content: space-between;

      .leftTopbox {
        height: calc((100vh - @height1 - @height2) * 0.6 - 20px);
        // border: 1px solid red;
      }

      .leftBottombox {
        height: calc((100vh - @height1 - @height2) * 0.4);
        // border: 1px solid red;
      }
    }

    .centerBox {
      position: relative;
      width: calc(100% - @width * 2 - 40px);
      height: 100%;
      // border: 1px solid red;
      .centerBgi {
        position: absolute;
        top: 80px;
        width: 100%;
        height: 60%;
        background-image: url('@/assets/imgs-bigScreen/bigScreen36.png');
        background-size: 100% 100%;
      }

      .parkPeopleBox {
        position: absolute;
        top: 30px;
        right: 10px;
      }

      .environmentStatusBox {
        position: absolute;
        top: 30px;
        left: 10px;
      }

      .centerBottonBox {
        position: absolute;
        bottom: 0px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;

        .weatherAndLive {
          width: 60%;

          .weatherBox {
            margin-bottom: 20px;
          }

          .LivingConsumptionBox {
            width: 100%;
            height: 127px;
            background-color: pink;
          }
        }

        .sexRatioBox {
          width: 10%;
          height: 250px;
        }

        .worderOrderBox {
          width: 24%;
        }
      }
    }

    .rightBox {
      width: @width;
      height: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
      // overflow: hidden;
      // border: 1px solid red;
      .rightTopBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2 - 10px) * 0.3);
        margin-bottom: 20px;
        // border: 1px solid red;
      }

      .rightCenterBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2 - 10px) * 0.3);
        margin-bottom: 20px;
        // border: 1px solid red;
      }

      .rightBottomBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2) * 0.4 - 45px);
        // border: 1px solid red;
      }
    }
  }
}
</style>
