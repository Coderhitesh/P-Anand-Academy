import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import CourseAndCourseBundle from './CourseAndCourseBundle';

function Cart() {
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [BookBundle, setBookBundleCart] = useState([]);
    const [courseBundle, setCourseBundleCart] = useState([]);
    const [onlyCourse, setOnlyCourse] = useState([]);
    const [onlyBook, setOnlyBook] = useState([]);

    useEffect(() => {
        // Retrieve and parse cart items from session storage
        const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
        const bookCartItems = JSON.parse(sessionStorage.getItem('bookCart')) || [];
        const bookBundleItems = JSON.parse(sessionStorage.getItem('BookBundle')) || [];
        const bundleItems = JSON.parse(sessionStorage.getItem('bundle')) || [];

        // Update state with the retrieved items
        setOnlyCourse(cartItems);
        setOnlyBook(bookCartItems);
        setBookBundleCart(bookBundleItems);
        setCourseBundleCart(bundleItems);
    }, []);


    return (
        <>
            <ToastContainer />
            {/* Breadcrumb Section Start */}
            <div className="breadcrumb-wrapper">
                <div className="container">
                    <div className="page-heading">
                        <h1>Cart</h1>
                        <div className="page-header">
                            <ul className="breadcrumb-items">
                                <Link to={"/"}>
                                    Home
                                </Link>
                                <li>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </li>
                                <li>Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <CourseAndCourseBundle Course={onlyCourse} CourseBundle={courseBundle} />
        </>
    );
}

export default Cart;
