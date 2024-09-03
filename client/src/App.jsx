import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'
import Shop from './Components/Shop/Shop'
import Contact from './Components/Contact/Contact'
import Cart from './Components/Cart/Cart'
import Wishlist from './Components/Wishlist/Wishlist'
import StudyMaterial from './Components/StudyMaterial/StudyMaterial'
import CourseDetail from './Pages/CourseDetail/CourseDetail'
import BundlePage from './Pages/BundlePage/BundlePage'
import BundleDetail from './Pages/BundleDetail/BundleDetail'
import BookPage from './Pages/BookPage/BookPage'
import BookDetail from './Pages/BookDetail/BookDetail'
import BookBundlePage from './Pages/BookBundlePage/BookBundlePage'
import BookBundleDetail from './Pages/BookBundleDetail/BookBundleDetail'
import Login from './Components/Auth/Login'
import ForgetPassword from './Components/Auth/ForgetPassword'
import Signin from './Components/Auth/Signin'
import BookCart from './Pages/BookCart/BookCart'
// import OtpSignUp from './Components/Auth/OtpSignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forget-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Signin />} />
          {/* <Route path="/sign-up/confirm-account/:email" element={<OtpSignUp />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book-cart" element={<BookCart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/Bundle" element={<BundlePage />} />
          <Route path="/Book" element={<BookPage />} />
          <Route path="/Book-detail/:id" element={<BookDetail />} />
          <Route path='/course-detail/:id' element={<CourseDetail />} />
          <Route path='/bundle-detail/:id' element={<BundleDetail />} />
          <Route path='/category/:id' element={<StudyMaterial />} />
          <Route path='/book-bundle' element={<BookBundlePage />} />
          <Route path='/book-bundle-detail/:id' element={<BookBundleDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
