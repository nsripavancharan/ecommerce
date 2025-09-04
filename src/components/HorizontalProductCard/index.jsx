import { useCart } from "../../context/card-context";
import { useWishlist } from "../../context/wishlist-context";
import { findProductInWishlist } from "../../utils/findProductInWishlist";

export const HorizontalProductCard = ({ product }) => {
    const { cartDispatch } = useCart();
    const { wishlist, wishlistDispatch } = useWishlist();

    // Check if product is already in wishlist
    const isProductInWishlist = findProductInWishlist(wishlist, product.id);

    const onRemoveClick = (product) => {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            payload: { id: product.id }
        });
    };

    const onMoveToWishlist = (product) => {
        const isProductInWishlist = findProductInWishlist(wishlist, product.id);

        if (!isProductInWishlist) {
            wishlistDispatch({
                type: "ADD_TO_WISHLIST",
                payload: { product }
            });

            // Optional: remove from cart after moving
            cartDispatch({
                type: "REMOVE_FROM_CART",
                payload: { id: product.id }
            });
        } 
    };


    return (
        <div className="card-horizontal d-flex shadow">
            <div className="card-hori-image-container relative">
                <img className="card-image" src={product.images[0]} alt={product.title} />
            </div>
            <div className="card-details d-flex direction-column">
                <div className="card-des">{product.title}</div>
                <div className="card-description">
                    <p className="card-price">Rs.{product.price}</p>
                </div>
                <div className="quantity-container d-flex gap">
                    <p className="q-title">Quantity: </p>
                    <div className="count-container d-flex align-center gap">
                        <button className="count">-</button>
                        <span className="count-value">1</span>
                        <button className="count">+</button>
                    </div>
                </div>
                <div className="cta-btn d-flex gap">
                    <div className="cta-btn">
                        <button
                            onClick={() => onRemoveClick(product)}
                            className="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin text-1xl whitespace-nowrap"
                        >
                            Remove From Cart
                        </button>
                    </div>
                    <div className="cta-btn">
                        <button
                            onClick={() => onMoveToWishlist(product)}
                            disabled={isProductInWishlist}
                            className={`button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin whitespace-nowrap ${isProductInWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProductInWishlist ? "Added to Wishlist" : "Move to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
