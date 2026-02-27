import { useState } from "react";
import { AuthContext } from "./auth-context.js";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null);

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: "Invalid email or password" };
        }

        localStorage.setItem("currentUserEmail", email);
        setUser({ email });

        return { success: true };
    }

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);
        setUser({ email });
        return { success: true };
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
