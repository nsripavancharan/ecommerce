import { useCart } from "../../context/card-context"
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import { useNavigate } from "react-router-dom";

export const PriceDetails = () => {
  const { cart } = useCart();
  const totalCartAmount = getTotalCartAmount(cart);
  const deliveryCharge = 39;
  const navigate = useNavigate();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // 👉 replace with your test key
      amount: (totalCartAmount + deliveryCharge) * 100, // amount in paisa
      currency: "INR",
      name: "Genmart",
      description: "Test Transaction",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate("/");
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="w-[500px] bg-[#fafafa] p-4">
      <p className="text-2xl border-b p-2">Price Details</p>
      <div className="flex flex-col gap-5 border-b p-2">
        <div className="flex">
          <p>Price ({cart.length}) items</p>
          <p className="ml-auto">Rs.{totalCartAmount}</p>
        </div>
        <div className="flex">
          <p>Delivery Charge</p>
          <p className="ml-auto">Rs.{deliveryCharge}</p>
        </div>
      </div>
      <div className="flex border-b p-2">
        <p>Total Amount</p>
        <p className="ml-auto">Rs.{deliveryCharge + totalCartAmount}</p>
      </div>
      <div className="p-2">
        <button
          onClick={displayRazorpay}
          className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
        >
          PLACE_ORDER
        </button>
      </div>
    </div>
  );
};
