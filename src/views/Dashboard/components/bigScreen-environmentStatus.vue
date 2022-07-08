<template>
  <!-- 环境状况 -->
  <div class="centerLeftTop2">
    <div class="centerLeftTop2_title">环境状况</div>
    <div class="mainBox">
      <div class="itemBox">
        <div class="itemLabel">风速</div>
        <div class="itemValue">0.2m/s</div>
      </div>
      <div class="itemBox">
        <div class="itemLabel">光照强度</div>
        <div class="itemValue">0.2m/s</div>
      </div>
      <div class="itemBox">
        <div class="itemLabel">风向</div>
        <div class="itemValue">东南风</div>
      </div>
      <div class="itemBox">
        <div class="itemLabel">降雨量</div>
        <div class="itemValue">45mm</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.centerLeftTop2 {
  .centerLeftTop2_title {
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }

  .mainBox {
    display: flex;
    width: 150px;
    flex-wrap: wrap;

    .itemBox {
      width: 50%;
      margin: 3px 0;

      .itemLabel {
        font-size: 18px;
        color: rgb(246, 197, 1);
      }

      .itemValue {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
