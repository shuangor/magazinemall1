import Vue from 'vue'
import Router from 'vue-router'
import lunbo from '@/components/lunbo'
import headerComponents from '@/components/headerComponents'
import showcontent from '@/components/showcontent'
import cart from '@/components/cart'
import productId from '@/components/productId'
import inputsearch from '@/components/inputsearch'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
          headerComponents: headerComponents,
          inputsearch: inputsearch,
          lunbo: lunbo,
          showcontent: showcontent
      }
    },
    {
      path: '/:id',
      name: 'production',
      components: {
          headerComponents: headerComponents,
          inputsearch: inputsearch,
          productId: productId 
      }
    },
    {
      path: '/user/cart',
      name: 'cart',
      components: {
        cart: cart
      } 
    }
  ]
})
