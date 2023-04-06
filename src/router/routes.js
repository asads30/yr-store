
const routes = [
  {
    path: '/',
    component: () => import('layouts/StartLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue') }
    ],
    meta: {
      reload: true,
    }
  },

  {
    path: '/add-anons',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddAnonsePage.vue') }
    ]
  },

  {
    path: '/edit-anons',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditAnonsePage.vue') }
    ]
  },

  {
    path: '/add-category',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddCategoryPage.vue') }
    ]
  },

  {
    path: '/add-product',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddProductPage.vue') }
    ]
  },

  {
    path: '/shop/:id/settings',
    component: () => import('layouts/StartLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/category/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditCategoryPage.vue') }
    ],
    props: true
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
