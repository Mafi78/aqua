import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import {
  MainScreenWithSidebar,
  ErrorScreen,
  SecondScreenWithSidebar,
  PreferenceScreenWithSidebar,
  TestScreenWithSidebar
} from '@/renderer/screens'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainScreenWithSidebar,
      meta: {
        titleKey: 'title.main'
      }
    },
    {
      path: '/second',
      component: SecondScreenWithSidebar,
      meta: {
        titleKey: 'title.second'
      }
    },
    {
      path: '/preferences',
      component: PreferenceScreenWithSidebar,
      meta: {
        titleKey: 'title.preferences'
      }
    },
    {
      path: '/test',
      component: TestScreenWithSidebar,
      meta: {
        titleKey: 'title.test'
      }
    },
    {
      path: '/error',
      component: ErrorScreen,
      meta: {
        titleKey: 'title.error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
