import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../interfaces/interfaces";
import axios from "../apis/axios";

interface AuthContextProps {
    user: User | null,
    storeUser: (user: User) => void,
    deleteUser: () => void
  }


  
export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: ReactNode}>  = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);  
    
    useEffect(() => {
        user && localStorage.setItem("userEmail", user?._id)
    }, [user]);

    useEffect(() => {
        const initUserState = async () => {
            if (localStorage.getItem("userEmail")) {
                const response = await axios.get("/user", {
                    params: { email: localStorage.getItem("userEmail") } 
                });
        
                setUser(response.data);
            } else {
                setUser(null);
            }
        }

        initUserState();
    }, []);

    const storeUser = (user: User) => {
        setUser(user);
    }

    const deleteUser = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, storeUser, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export default AuthProvider;
