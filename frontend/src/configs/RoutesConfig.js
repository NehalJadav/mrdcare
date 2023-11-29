import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    }
]

export const protectedRoutes = [
    {
        key: 'sidenav.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(() => import('views/app-views/dashboard')),
    },
    {
        key: 'sidenav.user',
        path: `${APP_PREFIX_PATH}/user/list`,
        component: React.lazy(() => import('views/app-views/user')),
    },
    {
        key: 'sidenav.user.userAdd',
        path: `${APP_PREFIX_PATH}/user/add`,
        component: React.lazy(() => import('views/app-views/user/manage')),
    },
    {
        key: 'sidenav.user.userEdit',
        path: `${APP_PREFIX_PATH}/user/edit/:editId`,
        component: React.lazy(() => import('views/app-views/user/manage')),
    },
    {
        key: 'sidenav.user.userRights',
        path: `${APP_PREFIX_PATH}/user/rights`,
        component: React.lazy(() => import('views/app-views/user/rights')),
    },
    {
        key: 'sidenav.client',
        path: `${APP_PREFIX_PATH}/client/list`,
        component: React.lazy(() => import('views/app-views/client')),
    },
    {
        key: 'sidenav.client.clientAdd',
        path: `${APP_PREFIX_PATH}/client/add`,
        component: React.lazy(() => import('views/app-views/client/manage')),
    },
    {
        key: 'sidenav.client.clientEdit',
        path: `${APP_PREFIX_PATH}/client/edit/:editId`,
        component: React.lazy(() => import('views/app-views/client/manage')),
    },
    {
        key: 'sidenav.plan',
        path: `${APP_PREFIX_PATH}/plan/list`,
        component: React.lazy(() => import('views/app-views/plan')),
    },
    {
        key: 'sidenav.plan.planAdd',
        path: `${APP_PREFIX_PATH}/plan/add`,
        component: React.lazy(() => import('views/app-views/plan/manage')),
    },
    {
        key: 'sidenav.plan.planEdit',
        path: `${APP_PREFIX_PATH}/plan/edit/:editId`,
        component: React.lazy(() => import('views/app-views/plan/manage')),
    },
    {
        key: 'sidenav.document',
        path: `${APP_PREFIX_PATH}/document/list`,
        component: React.lazy(() => import('views/app-views/document')),
    },
    {
        key: 'sidenav.document.documentAdd',
        path: `${APP_PREFIX_PATH}/document/add`,
        component: React.lazy(() => import('views/app-views/document/manage')),
    },
    {
        key: 'sidenav.document.documentEdit',
        path: `${APP_PREFIX_PATH}/document/edit/:editId`,
        component: React.lazy(() => import('views/app-views/document/manage')),
    },
    {
        key: 'sidenav.reminder',
        path: `${APP_PREFIX_PATH}/reminder/list`,
        component: React.lazy(() => import('views/app-views/reminder')),
    },
    {
        key: 'sidenav.reminder.reminderAdd',
        path: `${APP_PREFIX_PATH}/reminder/add`,
        component: React.lazy(() => import('views/app-views/reminder/manage')),
    },
    {
        key: 'sidenav.reminder.reminderEdit',
        path: `${APP_PREFIX_PATH}/reminder/edit/:editId`,
        component: React.lazy(() => import('views/app-views/reminder/manage')),
    },
    {
        key: 'sidenav.godown',
        path: `${APP_PREFIX_PATH}/godown/list`,
        component: React.lazy(() => import('views/app-views/godown')),
    },
    {
        key: 'sidenav.godown.godownAdd',
        path: `${APP_PREFIX_PATH}/godown/add`,
        component: React.lazy(() => import('views/app-views/godown/manage')),
    },
    {
        key: 'sidenav.godown.godownEdit',
        path: `${APP_PREFIX_PATH}/godown/edit/:editId`,
        component: React.lazy(() => import('views/app-views/godown/manage')),
    },
    {
        key: 'sidenav.payment.file',
        path: `${APP_PREFIX_PATH}/payment/file`,
        component: React.lazy(() => import('views/app-views/payment/filePayment')),
    },
    {
        key: 'sidenav.payment.renewal',
        path: `${APP_PREFIX_PATH}/payment/renewal`,
        component: React.lazy(() => import('views/app-views/payment/renewalPayment')),
    },
    {
        key: 'sidenav.report.fileCollection',
        path: `${APP_PREFIX_PATH}/report/file-collection`,
        component: React.lazy(() => import('views/app-views/report/fileCollection')),
    },
    {
        key: 'sidenav.report.client',
        path: `${APP_PREFIX_PATH}/report/client`,
        component: React.lazy(() => import('views/app-views/report/client')),
    },
    {
        key: 'sidenav.report.renewal',
        path: `${APP_PREFIX_PATH}/report/renewal`,
        component: React.lazy(() => import('views/app-views/report/renewal')),
    },
    {
        key: 'sidenav.report.expiring',
        path: `${APP_PREFIX_PATH}/report/expiring`,
        component: React.lazy(() => import('views/app-views/report/expiring')),
    },
    {
        key: 'sidenav.clientRequest.correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        component: React.lazy(() => import('views/app-views/clientRequest/correction')),
    },
    {
        key: 'sidenav.clientRequest.retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        component: React.lazy(() => import('views/app-views/clientRequest/retrival')),
    },
]