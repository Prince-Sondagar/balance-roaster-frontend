import { Dialog, Transition, Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import SubscriptionCommon from "../Common/subscriptionCommon";
import PaymentElement from "../Common/paymentelement";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserSubscriptionAction } from "../../store/actions/subscriptions.action ";

const SubscriptionModal = ({
  isOpen,
  closeModal,
  viewReportHandle,
  selectedDocument,
}) => {
  const [isPayNowCall, setIsPayNowCall] = useState(false);
  const dispatch = useDispatch();
  const { subscription, isLoading } = useSelector(
    (state) => state.subscriptions
  );

  const payNowHandler = (obj) => {
    dispatch(CreateUserSubscriptionAction(obj));
  };

  console.log("subscription", subscription);

  useEffect(() => {
    if (!!subscription?.clientSecret) {
      setIsPayNowCall(true);
    }
  }, [subscription]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Transition appear show={!!isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                <div>
                  {isPayNowCall ? (
                    <div>
                      <div>
                        <button onClick={() => setIsPayNowCall(false)}>
                          Back
                        </button>
                      </div>
                      <PaymentElement
                        clientSecretKey={subscription.clientSecret}
                        isLoading={isLoading}
                      />
                    </div>
                  ) : (
                    <Tab.Group>
                      <Tab.List className="flex space-x-1 rounded-md bg-primary/30 p-1 mb-6 w-fit mx-auto">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded py-1.5 px-6 text-sm font-medium leading-5",
                              selected
                                ? "bg-primary text-white shadow"
                                : "text-gray-700"
                            )
                          }
                        >
                          Paid
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded py-1.5 px-6 text-sm font-medium leading-5",
                              selected
                                ? "bg-primary text-white shadow"
                                : "text-gray-700"
                            )
                          }
                        >
                          {" "}
                          Free
                        </Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>
                          <div className="grid grid-cols-3 gap-4">
                            <SubscriptionCommon payNowHandler={payNowHandler} />
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <>
                            <div className="grid grid-cols-3 justify-center gap-4">
                              <card className="border rounded-lg p-6 shadow-1xl gap-4 items-center bg-white h-full items-center justify-center">
                                <h5> Free</h5>
                                <p> Limited access</p>
                              </card>
                            </div>
                            <button
                              className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-primary border-2 border-primary hover:bg-white hover:text-primary transition duration-500"
                              onClick={() => viewReportHandle(selectedDocument)}
                            >
                              View Report
                            </button>
                          </>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  )}
                </div>

                {/* <div className="mt-7 flex gap-2 justify-end pt-1">
                                    <button
                                        className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-[#6C757D] border-2 border-[#6C757D] hover:bg-white hover:text-[#6C757D] transition duration-500"
                                        onClick={() => closeModal()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-primary border-2 border-primary hover:bg-white hover:text-primary transition duration-500"
                                    onClick={() => viewReportHandle()}
                                    >
                                        View Report
                                    </button>
                                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubscriptionModal;
