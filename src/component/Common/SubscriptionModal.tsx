import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const ConfirmationModal = ({isOpen, type, title, isFunction, closeModal}:any) => {
    
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                            <h1>Confirmation</h1>
                            <div>
                                <h5>{title}</h5>
                            </div>

                            <div className="mt-7 flex gap-2 justify-end pt-1">
                                <button
                                    className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-[#6C757D] border-2 border-[#6C757D] hover:bg-white hover:text-[#6C757D] transition duration-500"
                                    onClick={() => closeModal()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-primary border-2 border-primary hover:bg-white hover:text-primary transition duration-500"
                                    onClick={() => isFunction(isOpen)}
                                    >
                                    Save
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    )
}

export default ConfirmationModal