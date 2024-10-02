import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStripeProducts } from "../../store/actions/subscriptions.action ";
import Loading from "../Loading";

const SubscriptionCommon = ({ openModal, payNowHandler }: any) => {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const { subscriptions } = useSelector<RootState, any>(
    (state) => state.subscriptions
  );
  const [selectedSubscription, setSelectedSubscription] = useState<any>(
    subscriptionList[0] ?? {}
  );
  const [fetchSubscriptionLoading, setFetchSubscriptionLoading] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (subscriptions?.length) {
      setSubscriptionList(subscriptions);
      setSelectedSubscription(subscriptions[0]);
    } else {
      setSubscriptionList([]);
    }
    setFetchSubscriptionLoading(false);
  }, [subscriptions]);

  useEffect(() => {
    setFetchSubscriptionLoading(true);
    dispatch<any>(fetchStripeProducts());
  }, [dispatch]);

  return (
    <>
      {fetchSubscriptionLoading ? (
        <Loading isShowing={fetchSubscriptionLoading} />
      ) : (
        subscriptionList?.map((obj: any) => (
          <div
            onClick={() => setSelectedSubscription(obj)}
            key={obj?.id}
            className={`${
              obj === selectedSubscription ? "border-primary" : ""
            } border rounded-lg p-6 shadow-1xl gap-4 items-center bg-white h-full flex items-center justify-center flex-col`}
          >
            <h5 className="text-2xl font-extrabold">{obj?.name}</h5>
            <h5 className="text-2xl">
              {obj?.price?.unit_amount / 100} {obj?.price?.currency}
            </h5>
            <p className="text-center text-base">{obj?.description}</p>
            {obj === selectedSubscription ? (
              <button
                className="btn btn-primary bg-primary hover:bg-white text-white text-secondary font-medium leading-[23px] py-2 px-3 w-full hover:text-primary rounded-lg transition duration-300 border border-primary"
                onClick={() => payNowHandler(obj)}
              >
                Pay Now
              </button>
            ) : null}
          </div>
        ))
      )}
    </>
  );
};

export default SubscriptionCommon;
