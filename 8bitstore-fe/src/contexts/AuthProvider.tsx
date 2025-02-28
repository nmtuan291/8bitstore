import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../interfaces/interfaces";
import axios from "../apis/axios";

interface AuthContextProps {
    user: User | null,
    storeUser: (user: User) => void,
  }

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: ReactNode}>  = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);  
    
    useEffect(() => {
        const initUserState = async () => {
            try {
                console.log("sdadas");
                const response = await axios.get("api/User/get-user");
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                setUser(null);
            }
        }

        initUserState();
    }, []);

    const storeUser = (user: User) => {
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{ user, storeUser }}>
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
