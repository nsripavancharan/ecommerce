import { useWishlist } from "../../context/wishlist-context";
import { useCart } from "../../context/card-context";

export const WishlistProductCard = ({ product }) => {
    const { wishlistDispatch } = useWishlist();
    const { cart,cartDispatch } = useCart();

    const onRemoveFromWishlist = (product) => {
        wishlistDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { id: product.id }
        });
    };

    const onMoveToCart = (product) => {
    // const productToAdd = { ...product }; // safe copy

    wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id: product.id }
    });

    const isInCart = cart.some(item => item.id === product.id);
    if (!isInCart) {
        cartDispatch({
            type: "ADD_TO_CART",
            payload: {product}
        });
    }
};



    return (
        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 shadow-md w-[600px]">
            <div className="flex gap-4 items-center">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                />
                <div>
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">₹{product.price}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Remove
                </button>
                <button
                    onClick={() => onMoveToCart(product)}
                    className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
                >
                    Move to Cart
                </button>
            </div>
        </div>
    );
};
