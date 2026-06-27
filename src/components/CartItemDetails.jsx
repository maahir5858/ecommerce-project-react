import React, { useState } from 'react'
import axios from 'axios';
import formatMoney from '../utils/money';

function CartItemDetails({ cartItem, getCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity)

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
    }

    const updateQuantity = async () => {
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity),
            });
            await getCart();
            setIsUpdatingQuantity(false);
        } else {
            setIsUpdatingQuantity(true);
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {
                            isUpdatingQuantity
                                ? <input type="text" className="update-button"
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                    />
                                : <span className="quantity-label">{cartItem.quantity}</span>
                        }
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity} >
                        {isUpdatingQuantity ? 'Save ' : 'Update '}
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}

export default CartItemDetails