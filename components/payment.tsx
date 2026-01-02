"use client";

export default function Checkout() {
  const createOrder = async () => {
    const res = await fetch("/api/razorpay/order", { method: "POST" });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: "INR",
      name: "Surfers Editor",
      description: "Credits Example Testing Payment",
      order_id: order.id,

      handler: function (response: any) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
      },
    };

    // Load Razorpay script
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.onload = () => {
      // @ts-ignore
      const rzp = new Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(razorpayScript);
  };

  return (
    <button
      onClick={createOrder}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      Pay Now
    </button>
  );
}
