import store from "../store";
import {
  HomeOutlined,
  UserSwitchOutlined,
  FilePdfOutlined,
  FileAddOutlined,
  UserOutlined,
  SafetyOutlined,
  DotChartOutlined,
  MessageOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  LayoutOutlined,
  DeleteOutlined,
  MoneyCollectOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

import { APP_PREFIX_PATH } from 'configs/AppConfig'

const userData = store.getState() && store.getState().auth && store.getState().auth.userData && store.getState().auth.userData;
const role = userData.role;

const superAdmin = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-client',
    path: `${APP_PREFIX_PATH}/client/list`,
    title: 'sidenav.client',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-client-clientList',
        path: `${APP_PREFIX_PATH}/client/list`,
        title: 'sidenav.client.clientList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-client-clientAdd',
        path: `${APP_PREFIX_PATH}/client/add`,
        title: 'sidenav.client.clientAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-user',
    path: `${APP_PREFIX_PATH}/user/list`,
    title: 'sidenav.user',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-user-userList',
        path: `${APP_PREFIX_PATH}/user/list`,
        title: 'sidenav.user.userList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-user-userAdd',
        path: `${APP_PREFIX_PATH}/user/add`,
        title: 'sidenav.user.userAdd',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-user-userRights',
        path: `${APP_PREFIX_PATH}/user/rights`,
        title: 'sidenav.user.userRights',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-plan',
    path: `${APP_PREFIX_PATH}/plan/list`,
    title: 'sidenav.plan',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-plan-planList',
        path: `${APP_PREFIX_PATH}/plan/list`,
        title: 'sidenav.plan.planList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-plan-planAdd',
        path: `${APP_PREFIX_PATH}/plan/add`,
        title: 'sidenav.plan.planAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-document',
    path: `${APP_PREFIX_PATH}/document/list`,
    title: 'sidenav.document',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-document-documentList',
        path: `${APP_PREFIX_PATH}/document/list`,
        title: 'sidenav.document.documentList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-document-documentAdd',
        path: `${APP_PREFIX_PATH}/document/add`,
        title: 'sidenav.document.documentAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-reminder',
    path: `${APP_PREFIX_PATH}/reminder/list`,
    title: 'sidenav.reminder',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-reminder-reminderList',
        path: `${APP_PREFIX_PATH}/reminder/list`,
        title: 'sidenav.reminder.reminderList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-reminder-reminderAdd',
        path: `${APP_PREFIX_PATH}/reminder/add`,
        title: 'sidenav.reminder.reminderAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-godown',
    path: `${APP_PREFIX_PATH}/godown/list`,
    title: 'sidenav.godown',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-godown-godownList',
        path: `${APP_PREFIX_PATH}/godown/list`,
        title: 'sidenav.godown.godownList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-godown-godownAdd',
        path: `${APP_PREFIX_PATH}/godown/add`,
        title: 'sidenav.godown.godownAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-payment',
    path: `${APP_PREFIX_PATH}/payment/file`,
    title: 'sidenav.payment',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-payment-paymentFile',
        path: `${APP_PREFIX_PATH}/payment/file`,
        title: 'sidenav.payment.file',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-payment-paymentRenewal',
        path: `${APP_PREFIX_PATH}/payment/renewal`,
        title: 'sidenav.payment.renewal',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-report',
    path: `${APP_PREFIX_PATH}/report/file-collection`,
    title: 'sidenav.report',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-report-fileCollection',
        path: `${APP_PREFIX_PATH}/report/file-collection`,
        title: 'sidenav.report.fileCollection',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-client',
        path: `${APP_PREFIX_PATH}/report/client`,
        title: 'sidenav.report.client',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-renewal',
        path: `${APP_PREFIX_PATH}/report/renewal`,
        title: 'sidenav.report.renewal',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-expiring',
        path: `${APP_PREFIX_PATH}/report/expiring`,
        title: 'sidenav.report.expiring',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        title: 'sidenav.clientRequest.correction',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];

const boardMember = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-client',
    path: `${APP_PREFIX_PATH}/client/list`,
    title: 'sidenav.client',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-client-clientList',
        path: `${APP_PREFIX_PATH}/client/list`,
        title: 'sidenav.client.clientList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-client-clientAdd',
        path: `${APP_PREFIX_PATH}/client/add`,
        title: 'sidenav.client.clientAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-user',
    path: `${APP_PREFIX_PATH}/user/list`,
    title: 'sidenav.user',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-user-userList',
        path: `${APP_PREFIX_PATH}/user/list`,
        title: 'sidenav.user.userList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-user-userAdd',
        path: `${APP_PREFIX_PATH}/user/add`,
        title: 'sidenav.user.userAdd',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-user-userRights',
        path: `${APP_PREFIX_PATH}/user/rights`,
        title: 'sidenav.user.userRights',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-plan',
    path: `${APP_PREFIX_PATH}/plan/list`,
    title: 'sidenav.plan',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-plan-planList',
        path: `${APP_PREFIX_PATH}/plan/list`,
        title: 'sidenav.plan.planList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-plan-planAdd',
        path: `${APP_PREFIX_PATH}/plan/add`,
        title: 'sidenav.plan.planAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-document',
    path: `${APP_PREFIX_PATH}/document/list`,
    title: 'sidenav.document',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-document-documentList',
        path: `${APP_PREFIX_PATH}/document/list`,
        title: 'sidenav.document.documentList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-document-documentAdd',
        path: `${APP_PREFIX_PATH}/document/add`,
        title: 'sidenav.document.documentAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-reminder',
    path: `${APP_PREFIX_PATH}/reminder/list`,
    title: 'sidenav.reminder',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-reminder-reminderList',
        path: `${APP_PREFIX_PATH}/reminder/list`,
        title: 'sidenav.reminder.reminderList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-reminder-reminderAdd',
        path: `${APP_PREFIX_PATH}/reminder/add`,
        title: 'sidenav.reminder.reminderAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-godown',
    path: `${APP_PREFIX_PATH}/godown/list`,
    title: 'sidenav.godown',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-godown-godownList',
        path: `${APP_PREFIX_PATH}/godown/list`,
        title: 'sidenav.godown.godownList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-godown-godownAdd',
        path: `${APP_PREFIX_PATH}/godown/add`,
        title: 'sidenav.godown.godownAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-payment',
    path: `${APP_PREFIX_PATH}/payment/file`,
    title: 'sidenav.payment',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-payment-paymentFile',
        path: `${APP_PREFIX_PATH}/payment/file`,
        title: 'sidenav.payment.file',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-payment-paymentRenewal',
        path: `${APP_PREFIX_PATH}/payment/renewal`,
        title: 'sidenav.payment.renewal',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-report',
    path: `${APP_PREFIX_PATH}/report/file-collection`,
    title: 'sidenav.report',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-report-fileCollection',
        path: `${APP_PREFIX_PATH}/report/file-collection`,
        title: 'sidenav.report.fileCollection',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-client',
        path: `${APP_PREFIX_PATH}/report/client`,
        title: 'sidenav.report.client',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-renewal',
        path: `${APP_PREFIX_PATH}/report/renewal`,
        title: 'sidenav.report.renewal',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-report-expiring',
        path: `${APP_PREFIX_PATH}/report/expiring`,
        title: 'sidenav.report.expiring',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        title: 'sidenav.clientRequest.correction',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];


const salesOfficer = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-client',
    path: `${APP_PREFIX_PATH}/client/list`,
    title: 'sidenav.client',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-client-clientList',
        path: `${APP_PREFIX_PATH}/client/list`,
        title: 'sidenav.client.clientList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-client-clientAdd',
        path: `${APP_PREFIX_PATH}/client/add`,
        title: 'sidenav.client.clientAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-plan',
    path: `${APP_PREFIX_PATH}/plan/list`,
    title: 'sidenav.plan',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-plan-planList',
        path: `${APP_PREFIX_PATH}/plan/list`,
        title: 'sidenav.plan.planList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-plan-planAdd',
        path: `${APP_PREFIX_PATH}/plan/add`,
        title: 'sidenav.plan.planAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-godown',
    path: `${APP_PREFIX_PATH}/godown/list`,
    title: 'sidenav.godown',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-godown-godownList',
        path: `${APP_PREFIX_PATH}/godown/list`,
        title: 'sidenav.godown.godownList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-godown-godownAdd',
        path: `${APP_PREFIX_PATH}/godown/add`,
        title: 'sidenav.godown.godownAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-payment',
    path: `${APP_PREFIX_PATH}/payment/file`,
    title: 'sidenav.payment',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-payment-paymentFile',
        path: `${APP_PREFIX_PATH}/payment/file`,
        title: 'sidenav.payment.file',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-payment-paymentRenewal',
        path: `${APP_PREFIX_PATH}/payment/renewal`,
        title: 'sidenav.payment.renewal',
        icon: '',
        submenu: []
      },
    ]
  },
];

const scanOfficer = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-document',
    path: `${APP_PREFIX_PATH}/document/list`,
    title: 'sidenav.document',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-document-documentList',
        path: `${APP_PREFIX_PATH}/document/list`,
        title: 'sidenav.document.documentList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-document-documentAdd',
        path: `${APP_PREFIX_PATH}/document/add`,
        title: 'sidenav.document.documentAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        title: 'sidenav.clientRequest.correction',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];

const collectionOfficer = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];

const clientAdmin = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-user',
    path: `${APP_PREFIX_PATH}/user/list`,
    title: 'sidenav.user',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-user-userList',
        path: `${APP_PREFIX_PATH}/user/list`,
        title: 'sidenav.user.userList',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-user-userAdd',
        path: `${APP_PREFIX_PATH}/user/add`,
        title: 'sidenav.user.userAdd',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-document',
    path: `${APP_PREFIX_PATH}/document/list`,
    title: 'sidenav.document',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-document-documentList',
        path: `${APP_PREFIX_PATH}/document/list`,
        title: 'sidenav.document.documentList',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-payment',
    path: `${APP_PREFIX_PATH}/payment/file`,
    title: 'sidenav.payment',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-payment-paymentFile',
        path: `${APP_PREFIX_PATH}/payment/file`,
        title: 'sidenav.payment.file',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-payment-paymentRenewal',
        path: `${APP_PREFIX_PATH}/payment/renewal`,
        title: 'sidenav.payment.renewal',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        title: 'sidenav.clientRequest.correction',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];

const mrdOfficer = [
  {
    key: 'sidenav-dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'sidenav-document',
    path: `${APP_PREFIX_PATH}/document/list`,
    title: 'sidenav.document',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-document-documentList',
        path: `${APP_PREFIX_PATH}/document/list`,
        title: 'sidenav.document.documentList',
        icon: '',
        submenu: []
      },
    ]
  },
  {
    key: 'sidenav-clientRequest',
    path: `${APP_PREFIX_PATH}/clientRequest/correction`,
    title: 'sidenav.clientRequest',
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'sidenav-clientRequest-correction',
        path: `${APP_PREFIX_PATH}/client-request/correction`,
        title: 'sidenav.clientRequest.correction',
        icon: '',
        submenu: []
      },
      {
        key: 'sidenav-clientRequest-retrival',
        path: `${APP_PREFIX_PATH}/client-request/retrival`,
        title: 'sidenav.clientRequest.retrival',
        icon: '',
        submenu: []
      },
    ]
  },
];

var navigationConfig = [];

if (["Super Admin", "Admin"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...superAdmin,
  ]
}

if (["Board Member"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...boardMember,
  ]
}

if (["Sales Officer"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...salesOfficer,
  ]
}

if (["Scan Officer"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...scanOfficer,
  ]
}

if (["Collection Officer"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...collectionOfficer,
  ]
}

if (["Client Admin"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...clientAdmin,
  ]
}

if (["MRD Officer"].includes(role)) {
  navigationConfig = [
    ...navigationConfig,
    ...mrdOfficer,
  ]
}

export default navigationConfig;
