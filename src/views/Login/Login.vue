<script setup lang="ts">
import { LoginForm, RegisterForm } from './components'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { useI18n } from '@/hooks/web/useI18n'
import { underlineToHump } from '@/utils'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { ref } from 'vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')

const appStore = useAppStore()

const { t } = useI18n()

const isLogin = ref(true)

const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}
</script>

<template>
  <div
    :class="prefixCls"
    class="h-[100%] relative <sm:px-10px <md:px-10px <xl:bg-v-dark <xl:px-10px"
  >
    <div class="flex h-full mx-auto relative">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden`"
      >
        <div class="flex text-white items-center relative">
          <img src="@/assets/imgs/logo.png" alt="" class="h-48px mr-10px w-48px" />
          <span class="font-bold text-20px">{{ underlineToHump(appStore.getTitle) }}</span>
        </div>
        <div class="flex h-[calc(100%-60px)] justify-center items-center">
          <TransitionGroup
            appear
            tag="div"
            enter-active-class="animate__animated animate__bounceInLeft"
          >
            <img src="@/assets/svgs/login-box-bg.svg" key="1" alt="" class="w-350px" />
            <div class="text-white text-3xl" key="2">{{ t('login.welcome') }}</div>
            <div class="font-normal mt-5 text-white text-14px" key="3">
              <!-- {{ t('login.message') }} -->
            </div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-30px relative <sm:p-10px dark:bg-v-dark">
        <div class="flex text-white justify-between items-center @xl:justify-end @2xl:justify-end">
          <div class="flex items-center @xl:hidden @2xl:hidden">
            <img src="@/assets/imgs/logo.png" alt="" class="h-48px mr-10px w-48px" />
            <span class="font-bold text-20px">{{ underlineToHump(appStore.getTitle) }}</span>
          </div>

          <div class="flex space-x-10px justify-end items-center">
            <ThemeSwitch />
            <LocaleDropdown class="<xl:text-white dark:text-white" />
          </div>
        </div>
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div
            class="flex h-full m-auto w-[100%] items-center @md:max-w-500px @lg:max-w-500px @xl:max-w-500px @2xl:max-w-500px"
          >
            <LoginForm
              v-if="isLogin"
              class="h-auto m-auto p-20px <xl:(rounded-3xl light:bg-white)"
              @to-register="toRegister"
            />
            <RegisterForm
              v-else
              class="h-auto m-auto p-20px <xl:(rounded-3xl light:bg-white)"
              @to-login="toLogin"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';

.@{prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
</style>
