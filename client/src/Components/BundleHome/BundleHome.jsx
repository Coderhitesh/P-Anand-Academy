import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BundleHome() {
  const [allBundle, setAllBundle] = useState([])
  const [allTag,setTag] = useState([])
  const [category, setCategory] = useState([])
  const handleFetchCategory = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/get-all-category')
      setCategory(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchTag = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/get-all-tag')
      setTag(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchBundle = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/get-all-Bundles')
      setAllBundle(res.data.data)
    } catch (error) {
      console.log('Error in fetchin bundle', error)
    }
  }

  const getTagNameById = (tagId) => {
    const foundTag = allTag.find((tag) => tag._id === tagId);
    return foundTag ? foundTag.tagName : 'No Tag';
  };

  const getCategorygNameById = (CategoryId) => {
    const foundCategory = category.find(category => category._id === CategoryId);
    return foundCategory ? foundCategory.categoryName : "No Category";
  };

  useEffect(() => {
    handleFetchTag()
    handleFetchCategory();
    handleFetchBundle();
  }, [])

  return (
    <section className="shop-section section-padding fix pt-0">
      <div className="container">
        <div className="section-title-area">
          <div className="section-title">
            <h2 className="wow fadeInUp mobile-title" data-wow-delay=".3s">Course Bundle</h2>
          </div>
          <Link to={'/Bundle'} className="theme-btn transparent-btn wow fadeInUp mobile-title" data-wow-delay=".5s">
            Explore More <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </div>
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
          navigation={false}
            // pagination={false}
          modules={[Navigation]}
          className="book-slider"
        >
          {
            allBundle && allBundle.slice(0, 6).map((item, index) => (
              <SwiperSlide key={index}>
                <div className="shop-box-items style-2">
                  <div className="book-thumb center">
                    <Link to={`/bundle-detail/${item._id}`}>
                      <img src={item.bundleImage.url} alt={item.bundleName} />
                    </Link>
                    <ul className="post-box">
                      <li>{getTagNameById(item.tag)}</li>
                      {/* <li>-{item.bundleDisCountPercenatgae}%</li> */}
                    </ul>
                  </div>
                  <div className="shop-content">
                    <h5>{getCategorygNameById(item.categoryId)}</h5>
                    <h3><Link to={`/bundle-detail/${item._id}`}>{item.bundleName}</Link></h3>
                    <ul className="price-list">
                      <li>Rs.{item.bundleStartingPrice} - Rs.{item.bundleEndingPrice}</li>
                      {/* <li>
                        <del>Rs.{item.bundleTotalPrice}</del>
                      </li> */}
                    </ul>
                  </div>
                  <div className="shop-button">
                    <Link to={`/bundle-detail/${item._id}`} className="theme-btn"> View Detail</Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default BundleHome
