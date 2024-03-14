import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
function CartPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((product) => {
        total = total + product.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartProduct = (id) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // GET PAYMENT GETWAY TOKEN

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Payment

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}api/v1/product/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfully Completed");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  return (
    <Layout title={"cart-page"}>
      <div className="container mt-3">
        {/* <h3 className="text-center">Cart</h3> */}
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h2>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart?.length} in your cart ${
                    auth?.token ? " " : "Please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((product) => (
              <div className="row card p-3 mb-2 flex-row" key={product._id}>
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                    className="card-img-top mx-auto rounded pointer"
                    style={{ width: "10rem", height: "10rem" }}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.slug}`)}
                  />
                </div>
                <div className="col-md-8 flex-row">
                  <h5
                    className="pointer"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {product.name}
                  </h5>
                  <h5>Price : {product.price}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartProduct(product._id)}
                    disabled={!auth?.token}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {auth?.token && cart?.length > 0 && (
            <div className="col-md-4 text-center">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h5>Total : {totalPrice()}</h5>
              {auth?.user?.address ? (
                <>
                  <div className="row mb-3">
                    <h6 className="col-sm-6 mt-1">Current Address</h6>
                    <h5 className="col-sm-6 bg-success text-white rounded p-1">
                      {auth?.user?.address}
                    </h5>
                    <button
                      className="btn btn-outline-success p-2 mx-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-success p-2 mx-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success p-2 mx-3"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-success"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? (
                        <div
                          class="spinner-border text-white"
                          role="status"
                        ></div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
