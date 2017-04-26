import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Settings from '../components/Settings';
import MyColumns from '../components/MyColumns';
import Opportunities from '../components/Opportunities';
import OpportunityForm from '../components/OpportunityForm';
import MarketOpportunities from '../components/MarketOpportunities';
import store from '../store';

Vue.use(Router);

const AppRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/opportunities',
      name: 'opportunities',
      component: Opportunities,
    },
    {
      path: '/market-opportunities',
      name: 'marketOpportunities',
      component: MarketOpportunities,
    },
    {
      path: '/opportunity-form',
      name: 'opportunityForm',
      component: OpportunityForm,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/my-columns',
      name: 'myColumns',
      component: MyColumns,
    },
  ],
});

AppRouter.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/signup' && (!store.getters.user || !store.getters.user.email)) {
    next('/login');
  } else {
    next();
  }
});

export default AppRouter;
