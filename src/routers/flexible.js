const FlexibleMain = () => import('@/views/flexible-interest/flexible_main.vue')
const MainStaff = () => import('@/views/flexible-interest/main_staff.vue')
const MainLeader = () => import('@/views/flexible-interest/main_leader.vue')
const MainReport = () => import('@/views/flexible-interest/main_report.vue')
const FlexibleProcess = () => import('@/views/flexible-interest/flexible_process.vue')
//import Login from '@/views/flexible-interest/login.vue';
const ReportPending = () => import('@/views/flexible-interest/report_pending.vue')
const ReportApproved = () => import('@/views/flexible-interest/report_approved.vue')
const ReportRejected = () => import('@/views/flexible-interest/report_rejected.vue')

const router = [{
    path: 'flexible',
    name: 'flexible',
    component: FlexibleMain,
    children: [
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
                component: () => import('@/views/flexible-interest/customer_info.vue')
              },
              {
                path: 'product',
                name: 'product',
                meta: { 
                  permissionStaff: true
                },
                component: () => import('@/views/flexible-interest/customer_product.vue')
              },
              {
                path: 'interest',
                name: 'interest',
                meta: { 
                  permissionStaff: true
                },
                component: () => import('@/views/flexible-interest/flexible_interest.vue')
              },
              {
                path: 'document/attach',
                name: 'document_attach',
                meta: { 
                  permissionStaff: true
                },
                component: () => import('@/views/flexible-interest/document_attach.vue')
              },
              {
                path: 'interest/approve',
                name: 'approve',
                meta: { 
                  permissionStaff: true
                },
                component: () => import('@/views/flexible-interest/request_approve.vue')
              }
            ]
          },
          {
            path: 'request/history/approved',
            name: 'request_history_approve',
            meta: { 
              permissionStaff: true
            },
            component: () => import('@/views/flexible-interest/staff_approved.vue')
          },
          {
            path: 'request/history/pending',
            name: 'request_history_pending',
            meta: { 
              permissionStaff: true
            },
            component: () => import('@/views/flexible-interest/staff_pending.vue')
          },
          {
            path: 'request/history/rejected',
            name: 'request_history_reject',
            meta: { 
              permissionStaff: true
            },
            component: () => import('@/views/flexible-interest/staff_rejected.vue')
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
            component: () => import('@/views/flexible-interest/request_approve_leader.vue')
          },
          {
            path: 'approve/history',
            name: 'leader_approve_history',
            meta: { 
              permissionLeader: true
            },
            component: () => import('@/views/flexible-interest/leader_approve_history.vue')
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
                component: () => import('@/views/flexible-interest/report_pending/report_pending_all.vue')
              },
              {
                path: 'dialy',
                name: 'report_pending_dialy',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_pending/report_pending_dialy.vue')
              },
              {
                path: 'monthly',
                name: 'report_pending_monthly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_pending/report_pending_monthly.vue')
              },
              {
                path: 'yearly',
                name: 'report_pending_yearly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_pending/report_pending_yearly.vue')
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
                component: () => import('@/views/flexible-interest/report_approved/report_approved_all.vue')
              },
              {
                path: 'dialy',
                name: 'report_approved_dialy',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_approved/report_approved_dialy.vue')
              },
              {
                path: 'monthly',
                name: 'report_approved_monthly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_approved/report_approved_monthly.vue')
              },
              {
                path: 'yearly',
                name: 'report_approved_yearly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_approved/report_approved_yearly.vue')
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
                component: () => import('@/views/flexible-interest/report_rejected/report_rejected_all.vue')
              },
              {
                path: 'dialy',
                name: 'report_rejected_dialy',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_rejected/report_rejected_dialy.vue')
              },
              {
                path: 'monthly',
                name: 'report_rejected_monthly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_rejected/report_rejected_monthly.vue')
              },
              {
                path: 'yearly',
                name: 'report_rejected_yearly',
                meta: { 
                  permissionLeader: true,
                  permissionReport: true
                },
                component: () => import('@/views/flexible-interest/report_rejected/report_rejected_yearly.vue')
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
        component: () => import('@/views/flexible-interest/request_approve_detail.vue')
      },
      {
        path: 'customer/requirement/edit/:id',
        name: 'edit',
        meta: { 
          permissionStaff: true
        },
        component: () => import('@/views/flexible-interest/edit_flexible.vue')
      }
    ]
  }
]

export default router