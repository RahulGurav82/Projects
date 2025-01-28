import { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import AdminDash from './components/Dashboard/AdminDash'
import EmployeeDash from './components/Dashboard/EmployeeDash'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  
  const [user, setUser] = useState('');

  let HandleLogin = (email, pass) => {
    if(email === "admin@gmail.com" && pass === "123") {
      setUser("admin");
    } else if (email === "empl@gmail.com" && pass === "123") {
      setUser("employee");
    } else {
      alert("wrong credentials");
    }
  }

  const data = useContext(AuthContext)
  console.log(data);
  return (
    <>
    {!user ? <Login HandleLogin={HandleLogin} /> : '' }
    {user == "admin" ? <AdminDash /> : <EmployeeDash />}

    {/* <EmployeeDash /> */}
    {/* <AdminDash /> */}
    </>
  )
}

export default App