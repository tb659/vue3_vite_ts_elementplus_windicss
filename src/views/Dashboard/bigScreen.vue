<script setup lang="ts">
import LeftTop from '@/views/Dashboard/components/bigScreen-leftTop.vue'
import LeftBottom from '@/views/Dashboard/components/bigScreen-leftBottom.vue'
import RightTop from '@/views/Dashboard/components/bigScreen-rightTop.vue'
import RightCenter from '@/views/Dashboard/components/bigScreen-rightCenter.vue'
import RightBottom from '@/views/Dashboard/components/bigScreen-rightBottom.vue'
import ParkPeople from '@/views/Dashboard/components/bigScreen-parkPeople.vue'
import EnvironmentStatus from '@/views/Dashboard/components/bigScreen-environmentStatus.vue'
import Weather from '@/views/Dashboard/components/bigScreen-weather.vue'
import LivingConsumption from '@/views/Dashboard/components/bigScreen-LivingConsumption.vue'
import SexRatio from '@/views/Dashboard/components/bigScreen-sexRatio.vue'
import WorderOrder from '@/views/Dashboard/components/bigScreen-worderOrder.vue'
import { ref, onUnmounted, onDeactivated, onActivated, provide } from 'vue'

const isFullScreen = ref(true)

provide('isFullScreen', isFullScreen)

const toggleFull = () => {
  isFullScreen.value = !isFullScreen.value
}

onUnmounted(() => {
  isFullScreen.value = false
})

onDeactivated(() => {
  isFullScreen.value = false
})

onActivated(() => {
  isFullScreen.value = true
})
</script>

<template>
  <!-- 
        系统 85px
        容器内边距 40px
        headerBox 70px -->
  <div class="screenBox" :class="isFullScreen ? 'fullScreen' : ''">
    <Icon
      class="cursor-pointer is-hover fullIcon"
      :icon="isFullScreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
      color="var(--el-color-info)"
      :size="20"
      @click="toggleFull"
    />
    <div class="headerbox">
      <img src="@/assets/imgs-bigScreen/bigScreen2.png" alt="" />
    </div>
    <div class="mainBox">
      <!-- 左侧区域内容 -->
      <div class="leftBox">
        <div class="leftTopbox">
          <LeftTop />
        </div>
        <div class="leftBottombox">
          <LeftBottom />
        </div>
      </div>
      <!-- 中间区域内容 -->
      <div class="centerBox">
        <div class="centerBgi"></div>
        <!-- 当日游园人数 -->
        <div class="parkPeopleBox">
          <ParkPeople />
        </div>
        <!-- 环境状况 -->
        <div class="environmentStatusBox">
          <EnvironmentStatus />
        </div>

        <div class="centerBottonBox">
          <!-- 智能工单 -->
          <div class="worderOrderBox">
            <WorderOrder />
          </div>
          <div class="weatherAndLive">
            <!-- 天气 -->
            <div class="weatherBox">
              <Weather />
            </div>
            <!-- 生活消费 -->
            <div class="LivingConsumptionBox">
              <LivingConsumption />
            </div>
          </div>
          <!-- 男女比例 -->
          <div class="sexRatioBox">
            <SexRatio />
          </div>
        </div>
      </div>
      <!-- 右侧区域内容 -->
      <div class="rightBox">
        <div class="rightTopBox">
          <RightTop />
        </div>
        <div class="rightCenterBox">
          <RightCenter />
        </div>
        <div class="rightBottomBox">
          <RightBottom />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@height1: v-bind("isFullScreen ? '0px': '85px'"); //系统盒子占位高度
@height2: 70px; //header盒子高度

.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
}

.fullIcon {
  position: absolute;
  top: 8px;
  right: 6px;
}

.screenBox {
  width: calc(100% + 40px);
  height: calc(100vh - @height1);
  margin: -20px;
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
      // border: 1px solid red;
      display: flex;
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
