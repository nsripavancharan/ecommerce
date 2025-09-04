import { useCart } from "../../context/card-context";
import { useWishlist } from "../../context/wishlist-context";
import { findProductinCart } from "../../utils/findProductinCart"; 
import { findProductInWishlist } from "../../utils/findProductInWishlist";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
    const { cart, cartDispatch } = useCart();
    const { wishlist, wishlistDispatch } = useWishlist();
    const navigate = useNavigate();

    const isProductInCart = findProductinCart(cart, product.id);
    const isProductInWishlist = findProductInWishlist(wishlist, product.id);

    const onCartClick = () => {
        !isProductInCart
            ? cartDispatch({ type: 'ADD_TO_CART', payload: { product } })
            : navigate('/cart');
    };

    const onWishlistClick = () => {
        !isProductInWishlist
            ? wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: { product } })
            : navigate('/wishlist');
    };

    return (
        <div className="card card-vertical d-flex direction-column relative shadow">
            <div className="card-image-container">
                <img className="card-image" src={product.images[0]} alt={product.title} />
            </div>
            <div className="card-details">
                <div className="card-des">{product.title}</div>
                <div className="card-description">
                    <p className="card-price">Rs.{product.price}</p>
                </div>
                <div className="cta-btn">
                    <button 
                        onClick={onWishlistClick}
                        className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                    >
                        <span className="material-icons-outlined text-3xl">
                            favorite
                        </span>
                        {isProductInWishlist ? "Go to Wishlist" : "Add to Wishlist"}
                    </button>

                    <button 
                        onClick={onCartClick} 
                        className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                    >
                        <span className="material-icons-outlined text-3xl">
                            {isProductInCart ? 'shopping_cart_checkout' : 'shopping_cart'}
                        </span>
                        {isProductInCart ? 'Go to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};
