<script setup lang="ts">
import { reactive, ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox /*, ElLink */ } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi /* , getAdminRoleApi, getTestRoleApi */ } from '@/api/login'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { UserType } from '@/api/login/types'
import { useValidator } from '@/hooks/web/useValidator'
import Cookies from 'js-cookie'
// import { listToTree, handleMenuList } from '@/utils/tree'
import { menuList } from '@/router'

const { required } = useValidator()

// const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { wsCache } = useCache()

const { t } = useI18n()

const rules = {
  username: [required()],
  password: [required()]
}

const loginInfo = reactive({
  username: Cookies.get(appStore.getUsername),
  password: Cookies.get(appStore.getPassword),
  remember: Cookies.get(appStore.getRemember)
})
const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    value: loginInfo.username || '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: loginInfo.password || '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
    // },
    // {
    //   field: 'other',
    //   component: 'Divider',
    //   label: t('login.otherLogin'),
    //   componentProps: {
    //     contentPosition: 'center'
    //   }
    // },
    // {
    //   field: 'otherIcon',
    //   colProps: {
    //     span: 24
    // }
  }
])

const iconSize = 30

const remember = ref(!!loginInfo.remember)

const { register, elFormRef, methods } = useForm()

const loading = ref(false)

const iconColor = '#999'

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

// 登录
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<UserType>()

      try {
        const res = await loginApi(formData)
        // const res = {
        //   data: {
        //     id: 1,
        //     corpId: 1,
        //     dataVersion: null,
        //     username: 'admin',
        //     password: '$2a$10$rEYO2.OawwE..gDIJ2gd.ebk/BbcGdp//x.KjMX1c0vc5ZtdS9piK',
        //     status: 1,
        //     roleList: null,
        //     openId: null,
        //     resourceList: [
        //       {
        //         id: 1,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '200',
        //         name: '基础管理',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-basic',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: 'test',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 2,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '201',
        //         name: '风险等级',
        //         icon: null,
        //         type: 1,
        //         href: 'riskGrade',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 3,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '202',
        //         name: '医院机构',
        //         icon: null,
        //         type: 1,
        //         href: 'hospital',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 4,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '203',
        //         name: '证件类型',
        //         icon: null,
        //         type: 1,
        //         href: 'certificateType',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 5,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '204',
        //         name: '与本人关系',
        //         icon: '',
        //         type: 1,
        //         href: 'relationType',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 6,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '205',
        //         name: '首页顶部',
        //         icon: null,
        //         type: 1,
        //         href: 'homeTop',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 7,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '206',
        //         name: '患者列表',
        //         icon: null,
        //         type: 1,
        //         href: 'user',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 34,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '207',
        //         name: '随访周期',
        //         icon: '',
        //         type: 1,
        //         href: 'secondTestingPeriod',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 33,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '208',
        //         name: '图片管理',
        //         icon: null,
        //         type: 1,
        //         href: 'imageFile',
        //         status: null,
        //         note: null,
        //         parentId: 1,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 8,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '300',
        //         name: '筛前须知',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-before-screening',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 9,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '301',
        //         name: '筛前顶部',
        //         icon: null,
        //         type: 1,
        //         href: 'screeningTop',
        //         status: null,
        //         note: null,
        //         parentId: 8,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 10,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '302',
        //         name: '筛前须知',
        //         icon: null,
        //         type: 1,
        //         href: 'beforeScreening',
        //         status: null,
        //         note: null,
        //         parentId: 8,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 11,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '400',
        //         name: '科普宣教',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-knowledge',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 12,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '401',
        //         name: '科普宣教',
        //         icon: null,
        //         type: 1,
        //         href: 'knowledge',
        //         status: null,
        //         note: null,
        //         parentId: 11,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 13,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '500',
        //         name: '筛查问卷',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-questionnanre',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 14,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '501',
        //         name: '筛查问卷类型',
        //         icon: null,
        //         type: 1,
        //         href: 'questionnaireType',
        //         status: null,
        //         note: null,
        //         parentId: 13,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 15,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '502',
        //         name: '筛查问卷管理',
        //         icon: null,
        //         type: 1,
        //         href: 'questionnaire',
        //         status: null,
        //         note: null,
        //         parentId: 13,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 16,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '503',
        //         name: '筛查结果管理',
        //         icon: null,
        //         type: 1,
        //         href: 'questionnaireResult',
        //         status: null,
        //         note: null,
        //         parentId: 13,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 17,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '504',
        //         name: '随访结果管理',
        //         icon: null,
        //         type: 1,
        //         href: 'followUpVisitResult',
        //         status: null,
        //         note: null,
        //         parentId: 13,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 18,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '600',
        //         name: '检查预约',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-examine-reserve',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 19,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '601',
        //         name: '病种管理',
        //         icon: null,
        //         type: 1,
        //         href: 'disease',
        //         status: null,
        //         note: null,
        //         parentId: 18,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 20,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '602',
        //         name: '检查预约管理',
        //         icon: null,
        //         type: 1,
        //         href: 'examineReserve',
        //         status: null,
        //         note: null,
        //         parentId: 18,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 21,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '603',
        //         name: '成功预约二维码',
        //         icon: null,
        //         type: 1,
        //         href: 'RQCode',
        //         status: null,
        //         note: null,
        //         parentId: 18,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 22,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '700',
        //         name: '关爱交流',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-making-friends',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 23,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '701',
        //         name: '关爱交流群',
        //         icon: null,
        //         type: 1,
        //         href: 'groupChat',
        //         status: null,
        //         note: null,
        //         parentId: 22,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 24,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '800',
        //         name: '系统运营',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-system-operation',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 25,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '801',
        //         name: '订单管理',
        //         icon: null,
        //         type: 1,
        //         href: 'orderForm',
        //         status: null,
        //         note: null,
        //         parentId: 24,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 26,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '802',
        //         name: '早筛结果列表',
        //         icon: null,
        //         type: 1,
        //         href: 'EarlyQuestionnaireList',
        //         status: null,
        //         note: null,
        //         parentId: 24,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 27,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '803',
        //         name: '随访结果列表',
        //         icon: null,
        //         type: 1,
        //         href: 'follow-up-list',
        //         status: null,
        //         note: null,
        //         parentId: 24,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 28,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '900',
        //         name: '系统管理',
        //         icon: null,
        //         type: 1,
        //         href: '/admin-system-account',
        //         status: null,
        //         note: null,
        //         parentId: 0,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 29,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '901',
        //         name: '角色管理',
        //         icon: null,
        //         type: 1,
        //         href: 'role',
        //         status: null,
        //         note: null,
        //         parentId: 28,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 30,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '902',
        //         name: '账号管理',
        //         icon: null,
        //         type: 1,
        //         href: 'account',
        //         status: null,
        //         note: null,
        //         parentId: 28,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       },
        //       {
        //         id: 31,
        //         crtTime: null,
        //         modTime: null,
        //         crtUser: null,
        //         modUser: null,
        //         corpId: null,
        //         dataVersion: null,
        //         dataState: null,
        //         sequence: null,
        //         code: '903',
        //         name: '资源管理',
        //         icon: null,
        //         type: 1,
        //         href: 'resouce',
        //         status: null,
        //         note: null,
        //         parentId: 28,
        //         parentName: null,
        //         defaultAssign: null,
        //         domain: '',
        //         permissions: null,
        //         linkedPermissions: 'Q'
        //       }
        //     ]
        //   }
        // }
        if (res) {
          setLoginInfoCookie(formData)
          wsCache.set(appStore.getUserInfo, res.data)
          getRole()
        }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
const getRole = async () => {
  const res = {
    data: menuList
  }
  if (res) {
    // const menuList = handleMenuList(res.data)
    // console.log(menuList)
    // const routers = listToTree(res.data) || []

    const routers = res.data || []
    // console.log(routers)
    wsCache.set('roleRouters', routers)

    await permissionStore.generateRoutes('test', routers).catch(() => {})
    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}

const setLoginInfoCookie = (formData) => {
  if (remember.value) {
    Cookies.set(appStore.getUsername, formData.username, {
      expires: appStore.getIParkRememberTime
    })
    Cookies.set(appStore.getPassword, formData.password, {
      expires: appStore.getIParkRememberTime
    })
    Cookies.set(appStore.getRemember, remember.value.toString(), {
      expires: appStore.getIParkRememberTime
    })
  } else {
    Cookies.remove(appStore.getUsername)
    Cookies.remove(appStore.getPassword)
    Cookies.remove(appStore.getRemember)
  }
}

// 去注册页面
// const toRegister = () => {
//   emit('to-register')
// }
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h1 class="text-2xl font-bold text-center w-[100%]">{{ t('login.login') }}</h1>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <!-- <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink> -->
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          {{ t('login.login') }}
        </ElButton>
      </div>
      <!-- <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister">
          {{ t('login.register') }}
        </ElButton>
      </div> -->
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
      </div>
    </template>
  </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
