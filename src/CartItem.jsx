import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const [totalQuantity, serTotalQuantity] = useState(0) // state to track total

    useEffect(() => {
        //Update total quantity whenever the cart items change
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        serTotalQuantity(total)
    }, [cart])

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            // Convert item cost to a number by removing non-numeric characters like '$'
            const itemCost = parseFloat(item.cost.replace(/[^0-9.-]+/g, ''));
            // Multiply cost by quantity and add to total
            return total + itemCost * item.quantity;
        }, 0); // Initialize total as 0


    };
    // Continue Shopping - Trigger parent function to navigate back to plant listings
    const handleContinueShopping = (e) => {
        e.preventDefault(); // Prevent the default action, if needed
        onContinueShopping(); // Call the parent function to show the product list


    };
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // Increment item quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }))
    };

    // Decrement item quantity, if quantity is 0, remove item
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }

    };
    // Remove item from cart
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        // Convert item cost to a number by removing non-numeric characters like '$'
        const itemCost = parseFloat(item.cost.replace(/[^0-9.-]+/g, ''));

        // Get item quantity
        const itemQuantity = item.quantity;

        // Calculate total cost by multiplying cost and quantity
        const totalCost = itemCost * itemQuantity;

        return totalCost;
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


