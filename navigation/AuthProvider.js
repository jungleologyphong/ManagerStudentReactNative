import React, { useState,createContext } from "react";
import { ToastAndroid } from "react-native";

 
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register:() =>{},
});
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (email, password)=> {
         
          if (email == "admin" && password == "admin"){
            setUser({ username: email });
            console.log("Login success!");
            ToastAndroid.show("Login success!", ToastAndroid.SHORT);
          } else{
            console.log("Login fail!");
            ToastAndroid.show("Login fail!", ToastAndroid.SHORT);
          }
          
        },
        register: async (email, password) => {
          
          
        },
        logout: async() => {
          setUser(null);
          ToastAndroid.show("Logout!", ToastAndroid.SHORT);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};