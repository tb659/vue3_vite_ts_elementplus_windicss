import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
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
      alwaysShow: true
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
        path: 'function',
        component: () => import('@/views/adminSystemManager/Function/Function.vue'),
        name: 'Function',
        meta: {
          title: t('router.function'),
          icon: 'carbon:function'
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
  },
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    name: 'ExternalLink',
    children: [
      {
        path: 'https://element-plus-admin-doc.cn/',
        name: 'DocumentLink',
        meta: {
          title: t('router.document'),
          icon: 'clarity:document-solid'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    name: 'Guide',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Guide/Guide.vue'),
        name: 'GuideDemo',
        meta: {
          title: t('router.guide'),
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/icon',
    name: 'ComponentsDemo',
    meta: {
      title: t('router.component'),
      icon: 'bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'form',
        component: getParentLayout(),
        name: 'Form',
        meta: {
          title: t('router.form'),
          alwaysShow: true
        },
        children: [
          {
            path: 'default-form',
            component: () => import('@/views/Components/Form/DefaultForm.vue'),
            name: 'DefaultForm',
            meta: {
              title: t('router.defaultForm')
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/Components/Form/UseFormDemo.vue'),
            name: 'UseForm',
            meta: {
              title: 'UseForm'
            }
          },
          {
            path: 'ref-form',
            component: () => import('@/views/Components/Form/RefForm.vue'),
            name: 'RefForm',
            meta: {
              title: 'RefForm'
            }
          }
        ]
      },
      {
        path: 'table',
        component: getParentLayout(),
        name: 'TableDemo',
        meta: {
          title: t('router.table'),
          alwaysShow: true
        },
        children: [
          {
            path: 'default-table',
            component: () => import('@/views/Components/Table/DefaultTable.vue'),
            name: 'DefaultTable',
            meta: {
              title: t('router.defaultTable')
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/Components/Table/UseTableDemo.vue'),
            name: 'UseTable',
            meta: {
              title: 'UseTable'
            }
          },
          {
            path: 'ref-table',
            component: () => import('@/views/Components/Table/RefTable.vue'),
            name: 'RefTable',
            meta: {
              title: 'RefTable'
            }
          }
        ]
      },
      {
        path: 'editor-demo',
        component: getParentLayout(),
        name: 'EditorDemo',
        meta: {
          title: t('router.editor'),
          alwaysShow: true
        },
        children: [
          {
            path: 'editor',
            component: () => import('@/views/Components/Editor/Editor.vue'),
            name: 'Editor',
            meta: {
              title: t('router.richText')
            }
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/Components/Search.vue'),
        name: 'Search',
        meta: {
          title: t('router.search')
        }
      },
      {
        path: 'descriptions',
        component: () => import('@/views/Components/Descriptions.vue'),
        name: 'Descriptions',
        meta: {
          title: t('router.descriptions')
        }
      },
      {
        path: 'image-viewer',
        component: () => import('@/views/Components/ImageViewer.vue'),
        name: 'ImageViewer',
        meta: {
          title: t('router.imageViewer')
        }
      },
      {
        path: 'dialog',
        component: () => import('@/views/Components/Dialog.vue'),
        name: 'Dialog',
        meta: {
          title: t('router.dialog')
        }
      },
      {
        path: 'icon',
        component: () => import('@/views/Components/Icon.vue'),
        name: 'Icon',
        meta: {
          title: t('router.icon')
        }
      },
      {
        path: 'echart',
        component: () => import('@/views/Components/Echart.vue'),
        name: 'Echart',
        meta: {
          title: t('router.echart')
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/Components/CountTo.vue'),
        name: 'CountTo',
        meta: {
          title: t('router.countTo')
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/Components/Qrcode.vue'),
        name: 'Qrcode',
        meta: {
          title: t('router.qrcode')
        }
      },
      {
        path: 'highlight',
        component: () => import('@/views/Components/Highlight.vue'),
        name: 'Highlight',
        meta: {
          title: t('router.highlight')
        }
      },
      {
        path: 'infotip',
        component: () => import('@/views/Components/Infotip.vue'),
        name: 'Infotip',
        meta: {
          title: t('router.infotip')
        }
      },
      {
        path: 'input-password',
        component: () => import('@/views/Components/InputPassword.vue'),
        name: 'InputPassword',
        meta: {
          title: t('router.inputPassword')
        }
      },
      {
        path: 'sticky',
        component: () => import('@/views/Components/Sticky.vue'),
        name: 'Sticky',
        meta: {
          title: t('router.sticky')
        }
      }
    ]
  },
  {
    path: '/hooks',
    component: Layout,
    redirect: '/hooks/useWatermark',
    name: 'Hooks',
    meta: {
      title: t('router.hooks'),
      icon: 'ic:outline-webhook',
      alwaysShow: true
    },
    children: [
      {
        path: 'useWatermark',
        component: () => import('@/views/hooks/useWatermark.vue'),
        name: 'UseWatermark',
        meta: {
          title: 'useWatermark'
        }
      }
    ]
  },
  {
    path: '/level',
    component: Layout,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: t('router.level'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: getParentLayout(),
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: t('router.menu1')
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: getParentLayout(),
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: t('router.menu11'),
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: () => import('@/views/Level/Menu111.vue'),
                meta: {
                  title: t('router.menu111')
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: () => import('@/views/Level/Menu12.vue'),
            meta: {
              title: t('router.menu12')
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/Level/Menu2.vue'),
        meta: {
          title: t('router.menu2')
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/example-dialog',
    name: 'Example',
    meta: {
      title: t('router.example'),
      icon: 'ep:management',
      alwaysShow: true
    },
    children: [
      {
        path: 'example-dialog',
        component: () => import('@/views/Example/Dialog/ExampleDialog.vue'),
        name: 'ExampleDialog',
        meta: {
          title: t('router.exampleDialog')
        }
      },
      {
        path: 'example-page',
        component: () => import('@/views/Example/Page/ExamplePage.vue'),
        name: 'ExamplePage',
        meta: {
          title: t('router.examplePage')
        }
      },
      {
        path: 'example-add',
        component: () => import('@/views/Example/Page/ExampleAdd.vue'),
        name: 'ExampleAdd',
        meta: {
          title: t('router.exampleAdd'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-edit',
        component: () => import('@/views/Example/Page/ExampleEdit.vue'),
        name: 'ExampleEdit',
        meta: {
          title: t('router.exampleEdit'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-detail',
        component: () => import('@/views/Example/Page/ExampleDetail.vue'),
        name: 'ExampleDetail',
        meta: {
          title: t('router.exampleDetail'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: t('router.errorPage'),
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: () => import('@/views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '403-demo',
        component: () => import('@/views/Error/403.vue'),
        name: '403Demo',
        meta: {
          title: '403'
        }
      },
      {
        path: '500-demo',
        component: () => import('@/views/Error/500.vue'),
        name: '500Demo',
        meta: {
          title: '500'
        }
      }
    ]
  },
  {
    path: '/test-demo',
    component: Layout,
    redirect: '/test-demo/demo1',
    name: 'TestDemo',
    meta: {
      title: t('test.title'),
      icon: 'file-icons:test-go',
      alwaysShow: true
    },
    children: [
      {
        path: 'demo1',
        component: () => import('@/views/test-demo/demo1/demo1.vue'),
        name: 'Demo1',
        meta: {
          title: t('test.demo1')
        }
      },
      {
        path: 'demo2',
        component: () => import('@/views/test-demo/demo2/bigScreen.vue'),
        name: 'Demo2',
        meta: {
          title: t('test.demo2')
        }
      }
    ]
  }
  // {
  //   path: '/authorization',
  //   component: Layout,
  //   redirect: '/authorization/user',
  //   name: 'Authorization',
  //   meta: {
  //     title: t('router.authorization'),
  //     icon: 'eos-icons:role-binding',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/Authorization/User.vue'),
  //       name: 'User',
  //       meta: {
  //         title: t('router.user')
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/Authorization/Role.vue'),
  //       name: 'Role',
  //       meta: {
  //         title: t('router.role')
  //       }
  //     }
  //   ]
  // }
]
// 当前展示的导航栏
export const menuList: string[] = [
  '/dashboard',
  '/dashboard/big-screen',
  '/dashboard/analysis',
  '/dashboard/workplace'

  // 'external-link',
  // 'https://element-plus-admin-doc.cn/',

  // '/guide',
  // '/guide/index',

  // '/components',
  // '/components/form',
  // '/components/form/default-form',
  // '/components/form/use-form',
  // '/components/form/ref-form',
  // '/components/table',
  // '/components/table/default-table',
  // '/components/table/use-table',
  // '/components/table/ref-table',
  // '/components/editor-demo',
  // '/components/editor-demo/editor',
  // '/components/search',
  // '/components/descriptions',
  // '/components/image-viewer',
  // '/components/dialog',
  // '/components/icon',
  // '/components/echart',
  // '/components/count-to',
  // '/components/qrcode',
  // '/components/highlight',
  // '/components/infotip',

  // '/Components/InputPassword',
  // '/Components/Sticky',

  // '/hooks',
  // '/hooks/useWatermark',

  // '/level',
  // '/level/menu1',
  // '/level/menu1/menu1-1',
  // '/level/menu1/menu1-1/menu1-1-1',
  // '/level/menu1/menu1-2',
  // '/level/menu2',

  // '/example',
  // '/example/example-dialog',
  // '/example/example-page',
  // '/example/example-add',
  // '/example/example-edit',
  // '/example/example-detail',

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
  // '/system-manager/params',

  // 测试使用
  // '/test-demo',
  // '/test-demo/demo1',
  // '/test-demo/demo2'
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
