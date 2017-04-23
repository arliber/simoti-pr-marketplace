import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Settings from '@/components/Settings';
import Opportunities from '@/components/Opportunities';
import OpportunityForm from '@/components/OpportunityForm';

Vue.use(Router);

export default new Router({
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
      path: '/opportunity-form',
      name: 'OpportunityForm',
      component: OpportunityForm,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
  ],
});
