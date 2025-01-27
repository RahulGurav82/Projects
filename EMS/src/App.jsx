import { useEffect } from 'react'
import Login from './components/Auth/Login'
import AdminDash from './components/Dashboard/AdminDash'
import EmployeeDash from './components/Dashboard/EmployeeDash'
import { setLocalStorage } from './utils/localStorage'

const App = () => {

  useEffect(() => {
    setLocalStorage();
  },)
  

  return (
    <>
    {/* <Login /> */}
    {/* <EmployeeDash /> */}
    <AdminDash />
    </>
  )
}

export default App