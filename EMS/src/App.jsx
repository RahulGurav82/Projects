import { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import AdminDash from './components/Dashboard/AdminDash'
import EmployeeDash from './components/Dashboard/EmployeeDash'
import { AuthContext } from './context/AuthProvider'
import { setLocalStorage } from './utils/localStorage'

const App = () => {
  
  // setLocalStorage();

  const [user, setUser] = useState('');
  const Authdata = useContext(AuthContext)
  console.log(Authdata);
  

  // Check and parse employee data if it's a valid string
if (Authdata.employee && typeof Authdata.employee === 'string') {
  try {
    const employees = JSON.parse(Authdata.employee);
    employees.forEach((employee) => {
      console.log("Employee Email: ", employee.email);
    });
  } catch (e) {
    console.error("Error parsing employee data:", e);
  }
}

  let HandleLogin = (email, pass) => {
    if (email === "admin@gmail.com" && pass === "123") {
      setUser("admin");
    } else if (Authdata) {

      setUser("employee");
    } else {
      alert("wrong credentials");
    }
  };
  

  return (
    <>
    {!user ? <Login HandleLogin={HandleLogin} /> : '' }

    {user == "admin" ? <AdminDash /> : '<EmployeeDash />'}

    {/* <EmployeeDash /> */}
    {/* <AdminDash /> */}
    </>
  )
}

export default App