import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import {
  MainScreenWithSidebar,
  ErrorScreen,
  SecondScreenWithSidebar,
  PreferenceScreenWithSidebar,
  TestScreenWithSidebar,
  ScreenAccessScenario,
  ScreenRunScenario,
  ScreenPrepareOnTheGo,
  ScreenWorkOnDb,
  ScreenWorkOnDbDetail,
  ScreenAccessDocu,
  ScreenCultureHints,
  ScreenTest2
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
      path: '/accessscenario',
      component: ScreenAccessScenario /* ScreenAccessScenario */,
      meta: {
        titleKey: 'title.accessscenario'
      }
    },
    {
      path: '/runscenario',
      component: ScreenRunScenario,
      meta: {
        titleKey: 'title.runscenario'
      }
    },
    {
      path: '/prepareonthego',
      component: ScreenPrepareOnTheGo,
      meta: {
        titleKey: 'title.prepareonthego'
      }
    },
    {
      path: '/workondb',
      component: ScreenWorkOnDb,
      meta: {
        titleKey: 'title.workondb'
      }
    },
    {
      path: '/workondbdetail',
      component: ScreenWorkOnDbDetail,
      meta: {
        titleKey: 'title.workondbdetail'
      }
    },
    {
      path: '/accessdocu',
      component: ScreenAccessDocu,
      meta: {
        titleKey: 'title.accessdocu'
      }
    },
    {
      path: '/culturehints',
      component: ScreenCultureHints,
      meta: {
        titleKey: 'title.culturehints'
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
      path: '/test2',
      component: ScreenTest2,
      meta: {
        titleKey: 'title.test2'
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
