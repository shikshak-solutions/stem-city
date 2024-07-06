import React from "react";
import remove_icon from "../../assets/images/cart_cross_icon.png";
import Img from "../../assets/images/product/wise-child.png";
import "./CartItems.css";

const Cart = () => {
    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            <div className='caritems-format cartitems-format-main'>
                <img src={Img} alt='' className='carticon-product-icon'/>
                <p>Wise Child</p>
                <p>Old Price</p>
                <button className='cartitems-quantity'>Qty</button>
                <p>Price*Qty</p>
                <img className='cartitems-remove-icon' src={remove_icon} alt=''  />
            </div>
            <hr/>

            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>Rs.0</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <p>Shipping Charges</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>0</h3>
                        </div>
                    </div>
                        <button>Checkout</button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, Enter it here</p>
                    <div className='cartitems-promobox'>
                        <input type='text' placeholder='Promo Code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
