import React, { useEffect, useState } from 'react'
import Layout from '../layout'
import { DocumentTextIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchStripeProducts } from '../store/actions/subscriptions.action ';
import PaymentModal from '../component/PaymentModall/paymentModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import useSubScriptionHook from '../hooks/subscriptionHook';
import SubscriptionCommon from '../component/Common/subscriptionCommon';

const Subscriptions = () => {
  // const [subscriptionList, setSubscriptionList] = useState([]);
  // const { documents } = useSelector<RootState, any>((state) => state.subscriptions);
  // const [selectedSubscription, setSelectedSubscription] = useState<any>(subscriptionList[0] ?? {});
  const { createSubscription, clientSecretKey, isLoading } = useSubScriptionHook();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);

  // const handleCreateNewSubscription = async () => {
  //   await createSubscription({ priceId: selectedSubscription?.default_price as string ?? "", })
  // }

  // useEffect(() => {
  //   if (selectedSubscription) {
  //     handleCreateNewSubscription();
  //   }
  // }, [selectedSubscription]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch<any>(fetchStripeProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (documents?.length) {
  //     setSubscriptionList(documents);
  //   } else {
  //     setSubscriptionList([]);
  //   }
  // }, [documents]);



  const stripePromise = loadStripe('pk_test_51IKM7hKrEzRlezT44edQI6nHYdUuUrgXSBInusN0qN8989ptaY9wstDhl5JJBmvjrY40EYq0hpZXvitpXhQSa42800pjJv1pbF');

  const options: any = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto lg:px-8 md:px-6 px-4 py-6">
        <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5">
          Dashboard
        </h2>

        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-center">

          <SubscriptionCommon
            openModal={openModal}
            />
          {/* {subscriptionList?.map((obj: any) =>
            <div onClick={() => setSelectedSubscription(obj)} key={obj?.id} className={`${obj === selectedSubscription ? 'border-primary' : ''} border rounded-lg p-6 shadow-1xl gap-4 items-center bg-white h-full flex items-center justify-center flex-col`}>
              <h5 className='text-2xl font-extrabold'>{obj?.name}</h5>
              <h5 className='text-2xl'>{obj?.price?.unit_amount / 100} {obj?.price?.currency}</h5>
              <p className='text-center text-base'>{obj?.description}</p>
              {obj === selectedSubscription ? <button className='btn btn-primary bg-primary hover:bg-white text-white text-secondary font-medium leading-[23px] py-2 px-3 w-full hover:text-primary rounded-lg transition duration-300 border border-primary' onClick={openModal}>Pay Now</button> : null}
            </div>
          )} */}

        </div>
        {clientSecretKey && !isLoading ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentModal isOpen={isOpen} closeModal={closeModal} />
          </Elements>
        ) : (
          <div className="flex text-secondary text-center  " style={{ marginTop: '100px', justifyContent: 'center' }}>
            Loading....
          </div>
        )}

      </div>
    </Layout>
  )
}

export default Subscriptions