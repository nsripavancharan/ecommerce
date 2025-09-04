import { createContext, useContext, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlistReducer";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [state, wishlistDispatch] = useReducer(wishlistReducer, {
        wishlist: []
    });

    return (
        <WishlistContext.Provider value={{ ...state, wishlistDispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
