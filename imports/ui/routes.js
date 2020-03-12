// @material-ui/icons
import { lazy } from 'react'
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
import ExamIcon from '@material-ui/icons/Edit'

// core components/views for Admin layout
const DashboardPage = lazy(() => import('./views/Dashboard/Dashboard'))
const UserProfile = lazy(() => import('./views/UserProfile/UserProfile'))
const TableList = lazy(() => import('./views/TableList/TableList'))
const Typography = lazy(() => import('./views/Typography/Typography'))
const Icons = lazy(() => import('./views/Icons/Icons'))
const Maps = lazy(() => import('./views/Maps/Maps'))
const NotificationsPage = lazy(() =>
  import('./views/Notifications/Notifications')
)
const ExamPage = lazy(() => import('./views/ExamMaster/Stream'))

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/exam-master-collection',
    name: 'Exam Master Collection',
    icon: ExamIcon,
    component: ExamPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: UserProfile,
    layout: '/admin1',
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin1',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: Typography,
    layout: '/admin1',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: Icons,
    layout: '/admin1',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: Maps,
    layout: '/admin1',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin1',
  },
]

export default dashboardRoutes
