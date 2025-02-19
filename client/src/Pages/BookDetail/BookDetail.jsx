import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';
import { ToastContainer, toast } from 'react-toastify';

function BookDetail() {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleFetchCourse = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/api/v1/get-single-book/${id}`);
            setBook(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchAllBook = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/get-all-book');
            setFilterData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/get-all-book-category');
            setCategory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryNameById = (CategoryId) => {
        const foundCategory = category.find((category) => category._id === CategoryId);
        return foundCategory ? foundCategory.categoryName : 'No Category';
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}
                {halfStar && <i className="fa-solid fa-star-half-stroke"></i>}
                {[...Array(emptyStars)].map((_, index) => (
                    <i key={index} className="fa-regular fa-star"></i>
                ))}
            </>
        );
    };

    const handleAddToCart = (book) => {
    
        const bookItems = JSON.parse(sessionStorage.getItem('bookCart')) || [];
    
        if (book) {
            const BookIndex = bookItems.findIndex((item) => item.book._id === book._id);
    
            if (BookIndex !== -1) {
                toast.success('Product is already in the cart. Updating the quantity.');
    
                bookItems[BookIndex] = {
                    ...bookItems[BookIndex],
                    quantity: 1,
                    isBook:true,
                    price: book.bookAfterDiscount
                };
            } else {
                const newBookItem = {
                    book,
                    quantity: 1,
                    price: book.bookAfterDiscount
                };
                bookItems.push(newBookItem);
            }
    
            sessionStorage.setItem('bookCart', JSON.stringify(bookItems));
            toast.success('Book added to cart successfully.');
        }
    };
    

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        handleFetchAllBook();
        handleFetchCategory();
        handleFetchCourse();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>No book data available</div>;
    }

    return (
        <>
            <ToastContainer />
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                {book.bookImage && book.bookImage.url ? (
                                    <a
                                        data-fslightbox="mygalley"
                                        className="rounded-4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-type="image"
                                        href={book.bookImage.url}
                                    >
                                        <img
                                            style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                                            className="rounded-4 fit"
                                            src={book.bookImage.url}
                                            alt={book.bookName}
                                        />
                                    </a>
                                ) : (
                                    <div>No image available</div>
                                )}
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <p><strong>HSN:</strong> {book.BookHSNCode}</p>
                                <h4 style={{ fontSize: '30px' }} className="course-title text-dark">{book.bookName}</h4>
                                <ul className="price-list px-0">
                                    <li style={{ color: '#A46023' }}>
                                        {renderStars(book.bookRating)}
                                        ({book.bookCountRating} customer review)
                                    </li>
                                </ul>
                                <p className="text-muted my-4">
                                    <strong>Category:</strong> {getCategoryNameById(book.bookCategory)}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
                                    <p style={{ fontSize: '22px', fontWeight: "700", color: "#404040" }}>Rs.{book.bookAfterDiscount}</p>
                                    <p><del>Rs.{book.bookPrice}</del></p>
                                </div>

                                <hr />

                                <div className="shop-button mt-3">
                                    <Link onClick={() => handleAddToCart(book)} className="theme-btn">Add To Cart</Link>
                                </div>

                                <p className='mt-4'><strong>All Categories: </strong>{category && category.map((item, index) => (
                                    <Link key={index} to={`/category/${item._id}`}>{item.categoryName}, </Link>
                                ))}</p>
                            </div>
                        </main>
                    </div>
                </div>

                <div className="container py-4 course-description">
                    <h4 className="title text-dark mb-4">Course Description</h4>
                    <div dangerouslySetInnerHTML={{ __html: book.bookDescription }} />
                </div>

                <div className="container py-5">
                    <h4 className="title text-dark">Similar Book</h4>
                    <div className="row">
                        {filterData &&
                            filterData.slice(0, 4).map((item, index) => (
                                <div key={index} className="col-lg-3 col-sm-6 mb-4">
                                    <div className="card">
                                        <img src={item.bookImage.url} className="card-img-top" alt={item.bookName} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.bookName}</h5>
                                            <ul style={{ display: 'flex', padding: '0%', gap: '8px' }} className="price-list">
                                                <li style={{ fontWeight: '700', fontSize: '20px' }}>Rs.{item.bookAfterDiscount}</li>
                                                <li>
                                                    <del style={{ color: '#595C5F' }}>Rs.{item.bookPrice}</del>
                                                </li>
                                            </ul>
                                            <div className="shop-button">
                                                <Link to={`/Book-detail/${item._id}`} className="theme-btn">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BookDetail;
