import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth.js";
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

// import Login from "./pages/auth/Login.jsx";
// import Register from "./pages/auth/Register.jsx";
// import Home from "./pages/Home.jsx";
// import RegisterComplete from "./pages/auth/RegisterComplete.jsx";
// import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
// import Header from "./components/nav/Header.jsx";
// import Shop from "./pages/Shop.jsx";
//  import Cart from "./pages/Cart.jsx";
// import UserRoute from "./components/routes/UserRoute.jsx"
//  import Checkout from "./pages/Checkout.jsx";
//  import Payment from "./pages/Payment.jsx";
//  import History from "./pages/user/History.jsx";
//  import MyProducts from "./pages/user/MyProducts.jsx";
// import ProductCreate from "./pages/user/product/ProductCreate.jsx";
// import ProductUpdate from "./pages/user/product/ProductUpdate.jsx";
//  import Product from "./pages/Product.jsx";
//  import Services from "./pages/Services.jsx";
//   import SideDrawer from "./components/drawer/SideDrawer.jsx";



const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const Services = lazy(() => import("./pages/Services"));
const MyProducts = lazy(() => import("./pages/user/MyProducts.jsx"));
const ProductCreate = lazy(() => import("./pages/user/product/ProductCreate.jsx"));

const ProductUpdate = lazy(() => import("./pages/user/product/ProductUpdate.jsx"));
const Product = lazy(() => import("./pages/Product"));

const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const Payment = lazy(() => import("./pages/Payment"));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
     <Suspense
      fallback={
        <div className="col text-center p-5">
          Book 
          Store
          <LoadingOutlined />
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/readme" component={Services} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
         <UserRoute exact path="/user/history" component={History} />
         <UserRoute exact path="/user/product" component={ProductCreate} />
          <UserRoute exact path="/user/myproducts" component={MyProducts} />
          <UserRoute exact path="/user/product/:slug" component={ProductUpdate} />
          <Route exact path="/product/:slug" component={Product} />
      </Switch>
      </Suspense>
    </>
  );
}

export default App;
