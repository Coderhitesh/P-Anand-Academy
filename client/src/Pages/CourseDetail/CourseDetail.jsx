import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './courseDetail.css';
import { toast, ToastContainer } from 'react-toastify';

function CourseDetail() {
    const { id } = useParams();
    const [allTeacher, setTeacher] = useState([]);
    const [category, setCategory] = useState([]);
    const [course, setCourse] = useState(null);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMode, setSelectedMode] = useState(null);
    const [cartItems, setCartItem] = useState([{
        ProductId: '',
        PriceDetails: '',
        ProductType: ''
    }])
    const navigate = useNavigate()
    const handleFetchCourse = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/api/v1/single-course/${id}`);
            setCourse(res.data.data);
            if (res.data.data.courseMode.length > 0) {
                setSelectedMode(res.data.data.courseMode[0]._id);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchTeacher = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/get-all-teacher');
            setTeacher(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchAllCourse = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/get-all-course');
            if (course) {
                const category = course.courseCategory;
                const allData = res.data.data;
                const filter = allData.filter((item) => item.courseCategory === category);
                setFilterData(filter);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/get-all-category');
            setCategory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryNameById = (CategoryId) => {
        const foundCategory = category.find(category => category._id === CategoryId);
        return foundCategory ? foundCategory.categoryName : "No Category";
    };

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const getPriceDetails = () => {
        if (!course || !selectedMode) return { price: 0, discountedPrice: 0 };

        const mode = course.courseMode.find(mode => mode._id === selectedMode);
        if (mode) {
            return {
                price: mode.coursePrice,
                discountedPrice: mode.coursePriceAfterDiscount
            };
        }

        return { price: course.startingPrice, discountedPrice: course.endingPrice };
    };

    const getTeacherNameById = (TeacherId) => {
        const foundTeacher = allTeacher.find(teacher => teacher._id === TeacherId);
        return foundTeacher ? foundTeacher.teacherName : "No Teacher assigned";
    };
    
    const handleAddToCart = (product) => {
        let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
       
        if (product) {
            const productIndex = cartItems.findIndex(item => item.product._id === product._id);
    
            if (productIndex !== -1) {
               
                alert('Product is already in the cart. Updating the quantity.');
    
                cartItems[productIndex] = {
                    ...cartItems[productIndex],
                    quantity:1,
                    isCourse:true,
                    price: product.price,
                    mode: selectedMode,
                };
            } else {
                const newCartItem = {
                    product,
                    quantity:1,
                    isCourse:true,
                    price: product.price,
                    mode: selectedMode
                };
                cartItems.push(newCartItem);
            }
    
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
            toast.success('Course added to cart successfully.');

        }
    };
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        handleFetchTeacher();
        handleFetchCategory();
        handleFetchCourse();
    }, [id]);

    useEffect(() => {
        if (course) {
            handleFetchAllCourse();
        }
    }, [course]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>No course data available</div>;
    }

    const renderStars = (rating) => {
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            rating = 0;
        }

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


    const { price, discountedPrice } = getPriceDetails();

    return (
        <>
        <ToastContainer />
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                {course.courseImage && course.courseImage.url ? (
                                    <a data-fslightbox="mygalley" className="rounded-4" target="_blank" rel="noopener noreferrer" data-type="image" href={course.courseImage.url}>
                                        <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={course.courseImage.url} alt={course.courseName} />
                                    </a>
                                ) : (
                                    <div>No image available</div>
                                )}
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 style={{ fontWeight: '700', fontSize: '30px' }} className="course-title text-dark">
                                    {course.courseName}
                                </h4>
                                <p>By: {getTeacherNameById(course.courseTeacherName)}</p>
                                <p className="text-muted mb-4"><strong>Category:</strong> {getCategoryNameById(course.courseCategory)}</p>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        {renderStars(course.courseRating)}
                                        <span style={{ color: '#A46023' }} className="ms-1">({course.courseCountRating ? course.courseCountRating : '0'} customer review)</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        <p><strong>How do you want it?</strong></p>
                                    </div>
                                    <div>
                                        <select className="form-select" aria-label="Default select example" onChange={handleModeChange} value={selectedMode}>
                                            {course.courseMode.map(mode => (
                                                <option key={mode._id} value={mode._id}>{mode.modeType}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <div className="mainprice mt-3">
                                            <p style={{ fontSize: '20px' }}><strong>Price :</strong> Rs:{price}</p>
                                        </div>
                                        {discountedPrice !== price && (
                                            <div className="discountPrice">
                                                <del>Rs:{discountedPrice}</del>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <hr />
                                <div className="shop-button">
                                    <button type='button' onClick={()=>handleAddToCart(course)} className="theme-btn">Add To Cart</button>
                                </div>
                                <p className='mt-4'><strong>All Categories: </strong>{category && category.map((item, index) => (
                                    <Link key={index} to={`/category/${item._id}`} >{item.categoryName}, </Link>
                                ))}</p>
                            </div>
                        </main>
                    </div>
                </div>

                <div className="container py-5 course-description">
                    <div className="course-container">
                        <h4 className="title text-dark">Course Description</h4>
                        <div dangerouslySetInnerHTML={{ __html: course.courseDescription }} />
                    </div>
                </div>

                <div className="container py-5">
                    <h4 className="title text-dark mb-4">Similar Courses</h4>
                    <div className="row">
                        {filterData && filterData.slice(0, 4).map((item, index) => (
                            <div key={index} className="col-lg-3 col-sm-6 mb-4">
                                <Link to={`/course-detail/${item._id}`} className="card">
                                    <img src={item.courseImage.url} className="card-img-top" alt={item.courseName} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.courseName}</h5>
                                        <p className="card-text">
                                            <strong>Price:</strong> Rs: {item.startingPrice} - Rs: {item.endingPrice}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default CourseDetail;
