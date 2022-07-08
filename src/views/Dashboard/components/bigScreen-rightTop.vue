<template>
  <div class="rightTopBox">
    <div class="rightTopBoxTitle">
      <div class="content">VR全景设备监控</div>
    </div>
    <div class="cameraBox">
      <div class="cameraItem">
        <img src="@/assets/imgs-bigScreen/bigScreen20.png" alt="" />
      </div>
      <div class="cameraItem">
        <img src="@/assets/imgs-bigScreen/bigScreen20.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.rightTopBox {
  height: 100%;
  font-weight: bold;
  background-image: url('@/assets/imgs-bigScreen/bigScreen25.png');
  background-size: 100% 100%;

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
      background-image: url('@/assets/imgs-bigScreen/bigScreen23.png');
      background-size: 100% 100%;
      transform: translateY(-50%);
    }
  }

  .cameraBox {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    padding: 0 10px;
    box-sizing: border-box;
    justify-content: space-between;

    .cameraItem {
      width: calc(50% - 5px);
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
