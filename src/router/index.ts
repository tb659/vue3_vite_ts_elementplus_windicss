import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
// 基础路由
export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/big-screen',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]
// 全部的路由
export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/big-screen',
    name: 'Dashboard',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'big-screen',
        component: () => import('@/views/Dashboard/bigScreen.vue'),
        name: 'BigScreen',
        meta: {
          title: t('router.bigScreen'),
          icon: 'el:screen',
          noCache: true
        }
      },
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.analysis'),
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: () => import('@/views/Dashboard/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: t('router.workplace'),
          noCache: true
        }
      }
    ]
  },
  {
    path: '/shop-manager',
    component: Layout,
    redirect: '/shop-manager/shop-info',
    meta: {
      title: t('router.shopManager'),
      icon: 'maki:commercial',
      alwaysShow: true
    },
    name: 'ShopManager',
    children: [
      {
        path: 'shop-info',
        component: () => import('@/views/adminShopManager/ShopInfo/ShopInfo.vue'),
        name: 'ShopInfo',
        meta: {
          title: t('router.shopInfo'),
          icon: 'bi:shop'
        }
      },
      {
        path: 'good-info',
        component: () => import('@/views/adminShopManager/GoodInfo/GoodInfo.vue'),
        name: 'GoodInfo',
        meta: {
          title: t('router.goodInfo'),
          icon: 'uil:file-info-alt'
        }
      },
      {
        path: 'good-category',
        component: () => import('@/views/adminShopManager/GoodCategory/GoodCategory.vue'),
        name: 'GoodCategory',
        meta: {
          title: t('router.goodCategory'),
          icon: 'carbon:data-class'
        }
      },
      {
        path: 'good-order',
        component: () => import('@/views/adminShopManager/GoodOrder/GoodOrder.vue'),
        name: 'GoodOrder',
        meta: {
          title: t('router.goodOrder'),
          icon: 'clarity:form-line'
        }
      }
    ]
  },
  {
    path: '/venue-manager',
    component: Layout,
    redirect: '/venue-manager/venue-info',
    meta: {
      title: t('router.venueManager'),
      icon: 'dashicons:admin-multisite',
      alwaysShow: true
    },
    name: 'VenueManager',
    children: [
      {
        path: 'venue-info',
        component: () => import('@/views/adminVenueManager/VenueInfo/VenueInfo.vue'),
        name: 'VenueInfo',
        meta: {
          title: t('router.venueInfo'),
          icon: 'ooui:view-details-ltr'
        }
      },
      {
        path: 'lease-good',
        component: () => import('@/views/adminVenueManager/LeaseGood/LeaseGood.vue'),
        name: 'LeaseGood',
        meta: {
          title: t('router.leaseGood'),
          icon: 'icon-park-outline:commodity'
        }
      },
      {
        path: 'lease-order',
        component: () => import('@/views/adminVenueManager/LeaseOrder/LeaseOrder.vue'),
        name: 'LeaseOrder',
        meta: {
          title: t('router.leaseOrder'),
          icon: 'clarity:form-line'
        }
      }
    ]
  },
  {
    path: '/tourist-manager',
    component: Layout,
    redirect: '/tourist-manager/tourist-info',
    meta: {
      title: t('router.touristManager'),
      icon: 'fa6-solid:people-group',
      alwaysShow: true
    },
    name: 'TouristManager',
    children: [
      {
        path: 'tourist-info',
        component: () => import('@/views/adminTouristManager/TouristInfo/TouristInfo.vue'),
        name: 'TouristInfo',
        meta: {
          title: t('router.touristInfo'),
          icon: 'mdi:card-account-details-outline'
        }
      },
      {
        path: 'epidemic-manager',
        component: () => import('@/views/adminTouristManager/EpidemicManager/EpidemicManager.vue'),
        name: 'EpidemicManager',
        meta: {
          title: t('router.epidemicManager'),
          icon: 'fa6-solid:shield-virus'
        }
      },
      {
        path: 'tickets-manager',
        component: () => import('@/views/adminTouristManager/TicketsManager/TicketsManager.vue'),
        name: 'TicketsManager',
        meta: {
          title: t('router.ticketsManager'),
          icon: 'majesticons:tickets'
        }
      },
      {
        path: 'tickets-order',
        component: () => import('@/views/adminTouristManager/TicketsOrder/TicketsOrder.vue'),
        name: 'TicketsOrder',
        meta: {
          title: t('router.ticketsOrder'),
          icon: 'fluent:form-24-regular'
        }
      }
    ]
  },
  {
    path: '/staff-manager',
    component: Layout,
    redirect: '/staff-manager/staff-info',
    meta: {
      title: t('router.staffManager'),
      icon: 'mdi:account-cog-outline',
      alwaysShow: true
    },
    name: 'StaffManager',
    children: [
      {
        path: 'staff-info',
        component: () => import('@/views/adminStaffManager/StaffInfo/StaffInfo.vue'),
        name: 'StaffInfo',
        meta: {
          title: t('router.staffInfo'),
          icon: 'mdi:account-details'
        }
      },
      {
        path: 'epartment',
        component: () => import('@/views/adminStaffManager/Epartment/Epartment.vue'),
        name: 'Epartment',
        meta: {
          title: t('router.epartment'),
          icon: 'akar-icons:people-group'
        }
      }
    ]
  },
  {
    path: '/garden-device',
    component: Layout,
    redirect: '/garden-device/energy-sensor',
    meta: {
      title: t('router.gardenDevice'),
      icon: 'map:amusement-park',
      alwaysShow: true
    },
    name: 'GardenDevice',
    children: [
      {
        path: 'energy-sensor',
        component: () => import('@/views/adminGardenDevice/EnergySensor/EnergySensor.vue'),
        name: 'EnergySensor',
        meta: {
          title: t('router.energySensor'),
          icon: 'ri:sensor-line'
        }
      },
      {
        path: 'energy-statistic',
        component: () => import('@/views/adminGardenDevice/EnergyStatistic/EnergyStatistic.vue'),
        name: 'EnergyStatistic',
        meta: {
          title: t('router.energyStatistic'),
          icon: 'wpf:statistics'
        }
      }
    ]
  },
  {
    path: '/queue-manager',
    component: Layout,
    redirect: '/queue-manager/queue-terminal',
    meta: {
      title: t('router.queueManager'),
      icon: 'healthicons:young-people',
      alwaysShow: true
    },
    name: 'QueueManager',
    children: [
      {
        path: 'queue-terminal',
        component: () => import('@/views/adminQueueManager/QueueTerminal/QueueTerminal.vue'),
        name: 'QueueTerminal',
        meta: {
          title: t('router.queueTerminal'),
          icon: 'bi:terminal'
        }
      },
      {
        path: 'queue-info',
        component: () => import('@/views/adminQueueManager/QueueInfo/QueueInfo.vue'),
        name: 'QueueInfo',
        meta: {
          title: t('router.queueInfo'),
          icon: 'bx:message-alt-detail'
        }
      }
    ]
  },
  {
    path: '/work-order',
    component: Layout,
    redirect: '/work-order/work-process',
    meta: {
      title: t('router.workOrder'),
      icon: 'fluent:text-word-count-24-filled',
      alwaysShow: false
    },
    name: 'WorkOrder',
    children: [
      {
        path: 'work-process',
        component: () => import('@/views/adminWorkOrder/WorkProcess/WorkProcess.vue'),
        name: 'WorkProcess',
        meta: {
          title: t('router.workProcess'),
          icon: 'fluent:text-word-count-24-filled'
        }
      }
    ]
  },
  {
    path: '/system-manager',
    component: Layout,
    redirect: '/system-manager/user',
    meta: {
      title: t('router.systemManager'),
      icon: 'eos-icons:rotating-gear',
      alwaysShow: true
    },
    name: 'SystemManager',
    children: [
      {
        path: 'user',
        component: () => import('@/views/adminSystemManager/User/User.vue'),
        name: 'User',
        meta: {
          title: t('router.user'),
          icon: 'line-md:account-add'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/adminSystemManager/Role/Role.vue'),
        name: 'Role',
        meta: {
          title: t('router.role'),
          icon: 'clarity:tree-view-line'
        }
      },
      {
        path: 'resource',
        component: () => import('@/views/adminSystemManager/Resource/Resource.vue'),
        name: 'Resource',
        meta: {
          title: t('router.resource'),
          icon: 'fa6-solid:folder-tree'
        }
      },
      {
        path: 'params',
        component: () => import('@/views/adminSystemManager/Params/Params.vue'),
        name: 'Params',
        meta: {
          title: t('router.params'),
          icon: 'carbon:parameter'
        }
      }
    ]
  }
]
// 当前展示的导航栏
export const menuList: string[] = [
  '/dashboard',
  '/dashboard/big-screen'
  // '/dashboard/analysis',
  // '/dashboard/workplace',
  // '/error',
  // '/error/404-demo',
  // '/error/403-demo',
  // '/error/500-demo',
  // '/shop-manager',
  // '/shop-manager/shop-info',
  // '/shop-manager/good-info',
  // '/shop-manager/good-category',
  // '/shop-manager/good-order',
  // '/venue-manager',
  // '/venue-manager/venue-info',
  // '/venue-manager/lease-good',
  // '/venue-manager/lease-order',
  // '/tourist-manager',
  // '/tourist-manager/tourist-info',
  // '/tourist-manager/epidemic-manager',
  // '/tourist-manager/tickets-manager',
  // '/tourist-manager/tickets-order',
  // '/staff-manager',
  // '/staff-manager/staff-info',
  // '/staff-manager/epartment',
  // '/garden-device',
  // '/garden-device/energy-sensor',
  // '/garden-device/energy-statistic',
  // '/queue-manager',
  // '/queue-manager/queue-terminal',
  // '/queue-manager/queue-info',
  // '/work-order',
  // '/work-order/work-process',
  // '/system-manager',
  // '/system-manager/user',
  // '/system-manager/role',
  // '/system-manager/resource',
  // '/system-manager/function',
  // '/system-manager/params'
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
