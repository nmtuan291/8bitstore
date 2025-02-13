import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../interfaces/interfaces"

interface AuthContextProps {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
  }
  
export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: ReactNode}>  = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
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
