import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
import FlexibleMain from '@/views/flexible-interest/flexible_main.vue'
import MainStaff from '@/views/flexible-interest/main_staff.vue';
import MainLeader from '@/views/flexible-interest/main_leader.vue';
import MainReport from '@/views/flexible-interest/main_report.vue';
import FlexibleProcess from '@/views/flexible-interest/flexible_process.vue';
//import Login from '@/views/flexible-interest/login.vue';
import ReportPending from '@/views/flexible-interest/report_pending.vue';
import ReportApproved from '@/views/flexible-interest/report_approved.vue';
import ReportRejected from '@/views/flexible-interest/report_rejected.vue';
const Home = ()=> import('@/views/home/Home.vue')

Vue.use(Router)
sessionStorage.setItem('flexible_root_router', '');
console.log("OK")
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: 'chats'
      },
    },
    {
      path: '/chats',
      name: 'chats',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/flexible',
      name: 'flexible',
      component: FlexibleMain,
      children: [
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: Login,
        // },
        {
          path: 'staff',
          name: 'staff',
          meta: { 
            permissionStaff: true
          },
          component: MainStaff,
          children: [
            {
              path: 'progress',
              name: 'progress',
              meta: { 
                permissionStaff: true
              },
              component: FlexibleProcess,
              children: [
                {
                  path: 'info',
                  name: 'info',
                  meta: { 
                    permissionStaff: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/customer_info.vue')
                },
                {
                  path: 'product',
                  name: 'product',
                  meta: { 
                    permissionStaff: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/customer_product.vue')
                },
                {
                  path: 'interest',
                  name: 'interest',
                  meta: { 
                    permissionStaff: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/flexible_interest.vue')
                },
                {
                  path: 'document/attach',
                  name: 'document_attach',
                  meta: { 
                    permissionStaff: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/document_attach.vue')
                },
                {
                  path: 'interest/approve',
                  name: 'approve',
                  meta: { 
                    permissionStaff: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/request_approve.vue')
                }
              ]
            },
            {
              path: 'request/history/approved',
              name: 'request_history_approve',
              meta: { 
                permissionStaff: true
              },
              component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/staff_approved.vue')
            },
            {
              path: 'request/history/pending',
              name: 'request_history_pending',
              meta: { 
                permissionStaff: true
              },
              component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/staff_pending.vue')
            },
            {
              path: 'request/history/rejected',
              name: 'request_history_reject',
              meta: { 
                permissionStaff: true
              },
              component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/staff_rejected.vue')
            }
          ]
        },
        {
          path: 'leader',
          name: 'leader',
          meta: { 
            permissionLeader: true
          },
          component: MainLeader,
          children: [
            {
              path: 'approve',
              name: 'leader_approve',
              meta: { 
                permissionLeader: true
              },
              component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/request_approve_leader.vue')
            },
            {
              path: 'approve/history',
              name: 'leader_approve_history',
              meta: { 
                permissionLeader: true
              },
              component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/leader_approve_history.vue')
            }
          ]
        },
        {
          path: 'report',
          name: 'report',
          meta: { 
            permissionLeader: true,
            permissionReport: true
          },
          component: MainReport,
          children: [
            {
              path: 'pending',
              name: 'report_pending',
              meta: { 
                permissionLeader: true,
                permissionReport: true
              },
              component: ReportPending,
              children: [
                {
                  path: 'all',
                  name: 'report_pending_all',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_pending/report_pending_all.vue')
                },
                {
                  path: 'dialy',
                  name: 'report_pending_dialy',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_pending/report_pending_dialy.vue')
                },
                {
                  path: 'monthly',
                  name: 'report_pending_monthly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_pending/report_pending_monthly.vue')
                },
                {
                  path: 'yearly',
                  name: 'report_pending_yearly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_pending/report_pending_yearly.vue')
                }
              ]
            },
            {
              path: 'approve',
              name: 'report_approved',
              meta: { 
                permissionLeader: true,
                permissionReport: true
              },
              component: ReportApproved,
              children: [
                {
                  path: 'all',
                  name: 'report_approved_all',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_approved/report_approved_all.vue')
                },
                {
                  path: 'dialy',
                  name: 'report_approved_dialy',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_approved/report_approved_dialy.vue')
                },
                {
                  path: 'monthly',
                  name: 'report_approved_monthly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_approved/report_approved_monthly.vue')
                },
                {
                  path: 'yearly',
                  name: 'report_approved_yearly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_approved/report_approved_yearly.vue')
                }
              ]
            },
            {
              path: 'reject',
              name: 'report_rejected',
              meta: { 
                permissionLeader: true,
                permissionReport: true
              },
              component: ReportRejected,
              children: [
                {
                  path: 'all',
                  name: 'report_rejected_all',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_rejected/report_rejected_all.vue')
                },
                {
                  path: 'dialy',
                  name: 'report_rejected_dialy',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_rejected/report_rejected_dialy.vue')
                },
                {
                  path: 'monthly',
                  name: 'report_rejected_monthly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_rejected/report_rejected_monthly.vue')
                },
                {
                  path: 'yearly',
                  name: 'report_rejected_yearly',
                  meta: { 
                    permissionLeader: true,
                    permissionReport: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/report_rejected/report_rejected_yearly.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'customer/requirement/detail/:id',
          name: 'requirement_detail',
          meta: { 
            permissionStaff: true,
            permissionLeader: true
          },
          component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/request_approve_detail.vue')
        },
        {
          path: 'customer/requirement/edit/:id',
          name: 'edit',
          meta: { 
            permissionStaff: true
          },
          component: () => import(/* webpackChunkName: "about" */ '@/views/flexible-interest/edit_flexible.vue')
        }
      ]
    },
  ]
});
router.beforeEach(
  function(to, from , next){
    // if(window.sessionStorage.getItem('permission')){
    //   next();
    // } else {
    //   if(!window.sessionStorage.getItem('login')){
    //     window.sessionStorage.setItem('login', 'true');
    //     next({
    //       name: 'login', 
    //       params: { nextUrl: to.fullPath }
    //     })
    //   } else {
    //     next();
    //   }
    // }
    if(to['name'] == null){
      if(window.sessionStorage.getItem('permission') == 'true'){
        next({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve',
            params: { nextUrl: to.fullPath }
        })
      } else if(window.sessionStorage.getItem('permission') == 'false'){
        next({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info',
            params: { nextUrl: to.fullPath }
        }) 
      } else if(window.sessionStorage.getItem('permission') == 'report'){
        next({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all',
            params: { nextUrl: to.fullPath }
        })
      }
    }
    
    if(to.matched.some(record => record.meta.permissionLeader)){
      if((window.sessionStorage.getItem('permission') == 'false') && !(to.matched.some(record => record.meta.permissionStaff))){
        next({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info',
          params: { nextUrl: to.fullPath }
        }) 
      } else if((window.sessionStorage.getItem('permission') == 'report') && !(to.matched.some(record => record.meta.permissionReport))){
        next({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next();
      }
    } else if(to.matched.some(record => record.meta.permissionReport)){
      if(window.sessionStorage.getItem('permission') == 'false'){
        next({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next();
      }
    } else if(to.matched.some(record => record.meta.permissionStaff)){
      if((window.sessionStorage.getItem('permission') == 'true') && !(to.matched.some(record => record.meta.permissionLeader))){
        next({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve',
          params: { nextUrl: to.fullPath }
        })
      }else if(window.sessionStorage.getItem('permission') == 'report'){
        next({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next();
        // if(window.sessionStorage.getItem('actionProgress')){
        //   var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
        //   for(var i = 0; i < stepAction.length; i++){
        //     if(!stepAction[i]['active-after']){
        //       if(i==0){
        //         next({name: 'info', params: { nextUrl: to.fullPath }});
        //       } else if(i==1){
        //         next({name: 'product', params: { nextUrl: to.fullPath }});
        //       } else if(i==2){
        //         next({name: 'interest', params: { nextUrl: to.fullPath }});
        //       } else if(i==3){
        //         next({name: 'document_attach', params: { nextUrl: to.fullPath }});
        //       }  else if(i==4){
        //         next({name: 'approve', params: { nextUrl: to.fullPath }});
        //       }
        //       break;
        //     }
        //   }
        //   next();
        // } else {
        //   next();
        // }
      }
    } else {
      next();
    }
  }
);
export default router;

