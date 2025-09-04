import { Navbar } from "../../components/Navbar";
import { useWishlist } from "../../context/wishlist-context";
import { WishlistProductCard } from "../../components/WishlistProductCard";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
    const { wishlist } = useWishlist();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center pt-6">
                {wishlist?.length > 0 ? (
                    <>
                        <h1 className="text-5xl">My Wishlist</h1>
                        <div className="pt-7 flex flex-col gap-4">
                            {wishlist.map(product => (
                                <WishlistProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex-row">
                        <h1 className="text-4xl gap-3 p-3 font-bold text-cyan-900">
                            Wishlist empty
                        </h1>
                        <p
                            className="text-cyan-600 underline hover:cursor-pointer font-semibold"
                            onClick={() => navigate("/")}
                        >
                            Click to add items to wishlist
                        </p>
                    </div>
                )}
            </main>
        </>
    );
};
