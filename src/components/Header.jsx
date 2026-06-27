import { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import './Header.css';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';

export default function Header({ cart }) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('searchQuery');

    const [searchQuery, setSearchQuery] = useState(searchText || '');

    let totalCartQuantity = 0;
    cart.map((cartItem) => {
        totalCartQuantity += cartItem.quantity;
    })

    const searchProducts = () => {
        console.log(searchQuery);
        navigate(`/?search=${searchQuery}`)
        // setSearchQuery('');
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                <button className="search-button"
                    onClick={searchProducts} >
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalCartQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}