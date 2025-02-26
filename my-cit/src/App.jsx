import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Dashboard from './Components/Dashboard'
import Reports from './Components/Reports'
import Resolved from './Components/Resolved'
import Settings from './Components/Settings'
import ReportIssues from './Components/ReportIssues'
import AuthorityDashboard from './pages/AuthorityDashboard'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/main', element: <MainPage />,
    children: [
      { index: true, element: <Dashboard /> },  // ✅ Default route for "/main"
      {path: 'dashboard', element: <Dashboard />},
      {path: 'myReports', element: <Reports />},
      {path: 'resolved', element: <Resolved />},
      {path: 'settings', element: <Settings />},
      {path: 'reportIssue', element: <ReportIssues />}
    ]
   },
   {path: '/authority', element: <AuthorityDashboard />}
])

function App() {

  return (
    < RouterProvider router={router} />
  )
}

export default App
