import React, { useState }  from "react";
import remove_icon from "../../assets/images/cart_cross_icon.png";
import Img from "../../assets/images/product/wise-child.png";
import "./CartItems.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const CheckOut = () => {
    const [savedAddresses, setSavedAddresses] = useState([
        { id: 1, name: 'Ayush',  address: 'Ayush, Suncity Avenue 76 Gurugram Haryana' },
        { id: 2, name: 'Ayush', address: 'Ayush, Suncity Avenue 76 Gurugram Haryana' },
    ]);
    const [gstBenefits, setGstBenefits] = useState(false);
    const [differentBillingAddress, setDifferentBillingAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleGstBenefitsChange = () => {
        setGstBenefits(!gstBenefits);
    };

    const handleBillingAddressChange = () => {
        setDifferentBillingAddress(!differentBillingAddress);
    };

    return (
        <>
        <div className='cartitems'>
            <div className='checkout-down'>
                <div className='cartitems-promocode'>
                    <div className="form-container2">
                        <div className="saved-addresses">
                            <h1>Saved Address :</h1>
                            {savedAddresses.map((address) => (
                                <div key={address.id} className="address-option">
                                    <label className='label'>
                                        <input
                                            type="radio"
                                            name="savedAddress"
                                            value={address.id}
                                            checked={selectedAddress === address.id.toString()}
                                            onChange={handleAddressChange}
                                        />
                                        {address.name} : {address.address}
                                    </label>
                                </div>
                            ))}
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
                                <p>Applied Coupon Discount</p>
                                <p>%</p>
                            </div>
                            <hr/>
                            <div className='cartitems-total-item'>
                                <h3>Total</h3>
                                <h3>0</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='address-container'>
                    <div className="checkout-container">
                        <div className="form-container">
                            <h1>Shipping Address </h1>
                            <form className="address-form">
                                <input type="text" placeholder="Full Name" required />
                                <input type="text" placeholder="Mobile Number" required />
                                <input type="text" placeholder="Address" required />
                                <input type="text" placeholder="City" required />
                                <input type="text" placeholder="State" required />
                                <input type="text" placeholder="Country" required />
                                <input type="text" placeholder="Pin Code" required />
                            </form>
                            <div className="checkbox-container">
                                <label className='label'>
                                    <input type="checkbox" onChange={handleGstBenefitsChange} />
                                    GST Benefits
                                </label>
                            </div>
                            {gstBenefits && (
                                <>
                                <h1>GST Details </h1>
                                <div className="gst-form">
                                    <input type="text" placeholder="GST Number" required />
                                    <input type="text" placeholder="Company Name" required />
                                </div>
                                </>
                            )}
                            <div className="checkbox-container">
                                <label className='label'>
                                    <input type="checkbox" onChange={handleBillingAddressChange} />
                                    Billing address is different
                                </label>
                            </div>
                            {differentBillingAddress && (
                                <div className="billing-address-form">
                                    <h1>Billing Address</h1>
                                    <form className="address-form">
                                        <input type="text" placeholder="Full Name" required />
                                        <input type="text" placeholder="Mobile Number" required />
                                        <input type="text" placeholder="Address" required />
                                        <input type="text" placeholder="City" required />
                                        <input type="text" placeholder="State" required />
                                        <input type="text" placeholder="Country" required />
                                        <input type="text" placeholder="Pin Code" required />
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    <button>Place your Order</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default CheckOut;
