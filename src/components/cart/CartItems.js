import React from "react";
import remove_icon from "../../assets/images/cart_cross_icon.png";
import "./CartItems.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionToRemoveFromCart} from "../../redux/action";

const Cart = () => {
    const cartItem = useSelector((state)=> state.product.cartItems)
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(actionToRemoveFromCart(id));
    };
    return (
        <div className='cartitems'>
            {cartItem.length >0 ?
                <>
                    <div className='cartitems-format-main'>
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr/>
                    {
                        cartItem.map(items =>{
                            return <><div className='caritems-format cartitems-format-main'>
                                <img src={items.photo} alt='' className='carticon-product-icon'/>
                                <p>{items.name}</p>
                                <p>{items.price}</p>
                                <button className='cartitems-quantity'>{items.quantity}</button>
                                <p>{items.price*items.quantity}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} alt='' onClick={()=> handleRemove(items.id)} />
                            </div>
                                <hr/></>
                        })
                    }

                    <div className='cartitems-down'>
                        <div className='cartitems-promocode'>
                            <p>If you have a promo code, Enter it here</p>
                            <div className='cartitems-promobox'>
                                <input type='text' placeholder='Promo Code'/>
                                <button>Submit</button>
                            </div>
                        </div>
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
                            <Link to='/checkout'>
                                <button>Checkout</button>
                            </Link>
                        </div>
                    </div>
                </>

: <div>No item in cart</div>}
        </div>
    );
};

export default Cart;
