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
