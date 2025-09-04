export const findProductInWishlist = (wishlist, productId) => {
    return wishlist.some(item => item.id === productId);
};
