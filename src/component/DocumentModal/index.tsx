import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  fetchDocuments,
  uploadDocument,
} from "../../store/actions/document.action";
import Loading from "../Loading";

export interface uploadFile {
  file?: File | null;
  fileName?: string;
}

const DocumentModal = ({ show, closeModal, fetchAllDocument, page }: any) => {
  const [uploadFileData, setUploadFileData] = useState<uploadFile>({
    file: null,
    fileName: "",
  });
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const clickHandle = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setUploadFileData({
      fileName: selectedFile?.name,
      file: selectedFile || null,
    });
  };

  const cancelHandle = () => {
    setUploadFileData({ file: null, fileName: "" });
    closeModal();
  };

  const uploadDocumentHandle = async (uploadFileData: uploadFile) => {
    setUploadLoading(true);
    let { file, fileName } = uploadFileData;

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("fileName", fileName || "");

    await dispatch<any>(uploadDocument(formData));
    cancelHandle();
    setUploadLoading(false);
    fetchAllDocument(page);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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
                {uploadLoading ? (
                  <Loading isShowing={uploadLoading} />
                ) : (
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                    <h1 className="text-gray-700 text-xl font-bold mb-6">
                      Upload CSV
                    </h1>
                    <div
                      onClick={() => clickHandle()}
                      className="rounded-md border-dashed border border-light-gray p-4 flex flex-col items-center cursor-pointer mb-4"
                    >
                      <CloudArrowUpIcon className="h-10 w-10 text-light-gray" />
                      <h5 className="text-base">Choose file</h5>
                    </div>
                    {uploadFileData?.file?.name ? (
                      <div className="flex">
                        <h6>{uploadFileData?.file?.name}</h6>
                        <XMarkIcon
                          onClick={() =>
                            setUploadFileData({ fileName: "", file: null })
                          }
                          className="h-5 w-5 text-slate"
                        />
                      </div>
                    ) : null}
                    <input
                      hidden
                      ref={inputRef}
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                    />

                    {/* <div className="border-light-gray border rounded-md p-3 flex justify-between items-center">
                                        <input placeholder="Enter file name" className="text-base text-secondary" value={uploadFileData?.fileName} onChange={(e) => setUploadFileData({ ...uploadFileData, fileName: e.target.value })}
                                        />
                                        <button>
                                            {!!uploadFileData?.fileName ? <XMarkIcon onClick={() => setUploadFileData({ ...uploadFileData, fileName: '' })} className="h-5 w-5 text-slate" /> : null}
                                        </button>
                                    </div> */}
                    <div className="mt-7 flex gap-2 justify-end pt-1">
                      <button
                        className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-[#6C757D] border-2 border-[#6C757D] hover:bg-white hover:text-[#6C757D] transition duration-500"
                        onClick={() => cancelHandle()}
                      >
                        Cancel
                      </button>
                      <button
                        className="rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-primary border-2 border-primary hover:bg-white hover:text-primary transition duration-500"
                        onClick={() => uploadDocumentHandle(uploadFileData)}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DocumentModal;
