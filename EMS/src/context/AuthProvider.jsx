import React, { createContext } from 'react'
import { getLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const data = getLocalStorage();
console.log(data);

const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={"Rahul"}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider