import MVVM from '../views/mvvm/index.vue'
import DIFF from '../views/diff/index.vue'

export default [
  {
    path: '/',
    redirect: '/mvvm'
  },
  {
    path: '/mvvm',
    component: MVVM,
    name:'MVVM',
    mate:{
       title:'MVVM',
    },
  },
  {
    path: '/diff',
    component: DIFF,
    component: ()=>import('../views/diff/index.vue'),
    name:'DIFF',
    mate:{
       title:'DIFF',
    },
  },
]
