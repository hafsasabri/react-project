
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
 import ProductDetail from "./Pages/ProductDetail";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Checkout from "./Pages/Checkout";
import { useSelector } from "react-redux";
import PlaceOrder from "./Pages/PlaceOrder";
import OrderConfirmation from "./Pages/OrderConfirm"
import { OrderHistory } from "./Pages/OrderHistory";

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />

          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/placeorder" element={<PlaceOrder />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;