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
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/opportunities',
      name: 'Opportunities',
      component: Opportunities,
    },
    {
      path: '/market-opportunities',
      name: 'MarketOpportunities',
      component: MarketOpportunities,
    },
    {
      path: '/opportunity-form',
      name: 'OpportunityForm',
      component: OpportunityForm,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/my-columns',
      name: 'MyColumns',
      component: MyColumns,
    },
  ],
});

/* AppRouter.afterEach((to) => { //TODO: Find out why the event is not fired. Find a way to do so.
  if (to.path === '/login' || to.path === 'signup') {
    this.$emit('toggleView', false);
  } else {
    this.$emit('toggleView', true);
  }
});*/

AppRouter.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/signup' && (!store.getters.user || !store.getters.user.email)) {
    next('/login');
  } else {
    next();
  }
});

export default AppRouter;
