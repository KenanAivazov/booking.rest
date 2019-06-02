import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import NotFound from '../components/global/NotFound.vue'

// Pages
import Main from '../components/pages/Main.vue'
import MainRest from '../components/pages/restPages/MainRest.vue'
import RestPage from '../components/pages/restPages/RestPage.vue'
import TableLayout from '../components/pages/restPages/TableLayout.vue'
import MenuRest from '../components/pages/restPages/MenuRest.vue'

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  routes: [{
      path: '',
      component: App,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/rest/:id',
          component: MainRest,
          children: [
            {
              path: '/',
              component: RestPage,
              name: 'RestPage',
            },
            {
              path: 'booking',
              component: TableLayout,
              name: 'booking'
            },
            {
              path: 'menu',
              component: MenuRest,
              name: 'menu'
            },
          ]
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});