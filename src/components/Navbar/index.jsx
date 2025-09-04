import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
    const { token, loginDispatch } = useLogin();

    const onLoginClick = () => {
        if (token?.access_token) {
            // Logged in → logout and go to login
            loginDispatch({ type: 'LOGOUT' });
            navigate("/auth/login");
        } else {
            // Not logged in → just go to login
            navigate("/auth/login");
        }
    };

    return (
        <header className="flex bg-cyan-600 px-4 py-8 text-slate-100">
            <div>
                <h1
                    onClick={() => navigate("/")}
                    className="text-4xl hover:cursor-pointer"
                >
                    GenMart
                </h1>
            </div>
            <nav className="ml-auto flex gap-4">
                <span
                    onClick={() => navigate("/wishlist")}
                    className="material-icons-outlined text-3xl hover:cursor-pointer"
                >
                    favorite
                </span>
                <span
                    onClick={() => navigate("/cart")}
                    className="material-icons-outlined text-3xl hover:cursor-pointer"
                >
                    shopping_cart
                </span>
                <div className="relative">
                    <span
                        onClick={() => setIsAccountDropDownOpen(!isAccountDropDownOpen)}
                        className="material-icons-outlined text-3xl hover:cursor-pointer px-3"
                    >
                        account_circle
                    </span>
                    {isAccountDropDownOpen && (
                        <div className="absolute bg-cyan-300 p-2 rounded shadow-md">
                            <button onClick={onLoginClick}>
                                {token?.access_token ? "Logout" : "Login"}
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};
