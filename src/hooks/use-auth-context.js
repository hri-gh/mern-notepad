import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within the AuthContext Provider")
    }

    return context
}
