import {
    useStripe,
    useElements,
    PaymentElement,
  } from "@stripe/react-stripe-js";
import { toastEmitter } from "../Common/ToastContainer";

  
  
  const PaymentModal = ({ clientSecretId , isOpen}: any) => {
  
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/document",
        },
      })
  
      if (result?.error) {
        toastEmitter.error("Payment Failed ")
      } else {
        toastEmitter.success("Payment Success");
      }
    }
  
    return (
      <>
        <div className="mt-4">
          <form onSubmit={handleSubmit} >
            <PaymentElement />
            <button
              type="submit"
              className="w-full mt-4 bg-secondary border-2 border-secondary rounded-md xsm:py-1.5 py-1 text-white text-lg font-extrabold block text-center hover:bg-white hover:text-secondary transition duration-500">
              Pay Now
            </button>
            <span className="text-primary text-base block text-center my-4">
              or select other payment method
            </span>
            <button className="w-full bg-[#dddddd] rounded-md xsm:py-2 py-1.5 mb-2 text-primary text-lg font-extrabold block text-center">
              Pay with{" "}
              <span className="italic text-[#173764]">
                Pay<span className="text-[#15699c]">Pal</span>
              </span>
            </button>
          </form >
        </div>
  
      </>
    );
  }
  
  export default PaymentModal;
  