import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import emailIndex from './apps/mail/pages/email-index.cmp.js'
import emailDetails from './apps/mail/pages/email-details.cmp.js'
// import emailCompose from './apps/mail/cmps/email-compose.cms.js'
import noteIndex from './apps/keep/pages/note-index.cmp.js'
// import noteDetails from './apps/keep/pages/note-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: homePage,
    },
    {
      path: '/books',
      component: aboutPage,
    },
    {
      path: '/email',
      component: emailIndex,

      children: [
        {
          path: '/email/:id',
          component: emailDetails
        }],
    },
    {
      path: '/email/:subject?/:body?',
      component: emailIndex,
    },
    {
      path: '/note',
      component: noteIndex,
    },
    {
      path: '/note/:id/:title?/:txt?',
      component: noteIndex,
    },
  ],
}

export const router = createRouter(routerOptions)
