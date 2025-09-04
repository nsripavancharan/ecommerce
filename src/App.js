import { Route,Routes } from "react-router-dom";
import {Home} from "./pages/Home"
import { Cart } from "./pages/Cart";
import {Wishlist} from "./pages/Wishlist"
import { AuthLogin } from "./pages/AuthLogin";

function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/wishlist" element={<Wishlist/>}></Route>
                <Route path="/auth/login" element={<AuthLogin/>}></Route>
            </Routes>
        </>
    )
}

export default App;