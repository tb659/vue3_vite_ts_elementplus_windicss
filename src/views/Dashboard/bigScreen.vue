<script setup lang="ts">
import leftTop from '@/views/Dashboard/components/bigScreen-leftTop.vue'
import leftBottom from '@/views/Dashboard/components/bigScreen-leftBottom.vue'
import rightTop from '@/views/Dashboard/components/bigScreen-rightTop.vue'
import rightCenter from '@/views/Dashboard/components/bigScreen-rightCenter.vue'
import rightBottom from '@/views/Dashboard/components/bigScreen-rightBottom.vue'
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
      <div class="leftBox">
        <div class="leftTopbox">
          <leftTop />
        </div>
        <div class="leftBottombox">
          <leftBottom />
        </div>
      </div>
      <div class="centerBox"></div>
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
      width: calc(162px * 1.4);
      height: calc(100px * 1.4);
    }
  }

  .mainBox {
    // background-color: rgb(203, 255, 165);
    display: flex;
    width: 100%;
    height: calc(100vh - @height1 - @height2);
    justify-content: space-between;
    @width: 26%;

    .leftBox {
      // border: 1px solid red;
      display: flex;
      width: @width;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;

      .leftTopbox {
        height: calc((100vh - @height1 - @height2) * 0.6 - 20px);
        border: 1px solid red;
        // background-image: url('@/assets/imgs-bigScreen/bigScreen15.png');
        // background-size: 100% 100%;
      }

      .leftBottombox {
        height: calc((100vh - @height1 - @height2) * 0.4);
        border: 1px solid red;
      }
    }

    .centerBox {
      width: calc(100% - @width * 2 - 20px);
      height: 100%;
      border: 1px solid red;
    }

    .rightBox {
      width: @width;
      height: 100%;
      // border: 1px solid red;
      .rightTopBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2) * 0.3);
        margin-bottom: 10px;
        border: 1px solid red;
      }

      .rightCenterBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2) * 0.3);
        margin-bottom: 10px;
        border: 1px solid red;
      }

      .rightBottomBox {
        width: 100%;
        height: calc((100vh - @height1 - @height2) * 0.4 - 20px);
        border: 1px solid red;
      }
    }
  }
}
</style>
