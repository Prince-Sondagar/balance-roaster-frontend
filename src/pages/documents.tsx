import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout";
import Pagination from "../component/Pagination";
import DocumentModal from "../component/DocumentModal";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusSmallIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Document, DocumentState } from "../store/reducers/document.reducer";
import {
  deleteDocument,
  fetchDocuments,
  generateReport,
  updateDocument,
} from "../store/actions/document.action";
import ConfirmationModal from "../component/Common/confirmationModal";
import SubscriptionModal from "../component/SubscriptionModal/index.tsx";
import Loading from "../component/Loading";

interface intialConfirmModal {
  open: string | undefined;
  type: string | undefined;
}

const Documents = () => {
  const intialConfirmModal = { open: "", type: "" };
  const [documentList, setDocumentList] = useState<Document[]>([]);
  const [uploadCsvModalHandle, setUploadCsvModalHandle] = useState(false);
  const [confirmModal, setConfirmModal] =
    useState<intialConfirmModal>(intialConfirmModal);
  const { documents, pagination, isLoading } = useSelector<
    RootState,
    DocumentState
  >((state) => {
    return state.document;
  });
  const [subscriptionModal, setSubscriptionModal] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("user") as string);
  const isSubscribed = !!userInfo?.subscription;
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [documentPagination, setDocumentPagination] = useState({
    page: 1,
    limit: 4,
    totalPage: 1,
    totalData: 0,
  });

  const fetchAllDocument = (page: number) => {
    setFetchLoading(true);
    dispatch<any>(
      fetchDocuments({
        page: page,
        limit: documentPagination?.limit,
      })
    );
  };

  useEffect(() => {
    fetchAllDocument(documentPagination?.page);
  }, []);

  useEffect(() => {
    if (documents?.length) {
      setDocumentList(documents);
    } else setDocumentList([]);
    setFetchLoading(false);
  }, [documents]);

  useEffect(() => {
    setDocumentPagination(pagination);
  }, [pagination]);

  const onPageChangeHandle = (value: any) => {
    setDocumentPagination({ ...documentPagination, page: value });
    fetchAllDocument(value);
  };

  const deleteHandle = async (id: string | undefined) => {
    closeConfirmationModal();
    await dispatch<any>(deleteDocument({ id }));
    setDocumentList((prevDocumentList) =>
      prevDocumentList?.filter((obj) => obj?.id !== id)
    );
  };

  const closeUploadModal = () => {
    setUploadCsvModalHandle(false);
  };

  const openUploadModal = () => {
    setUploadCsvModalHandle(true);
  };

  const closeConfirmationModal = () => {
    setConfirmModal(intialConfirmModal);
  };

  const closeSubscriptionModal = () => {
    setSubscriptionModal(null);
  };

  const generateReportHandle = async (obj: any) => {
    if (isSubscribed) {
      let { payload } = await dispatch<any>(generateReport(obj));
      console.log("payload", payload);

      setDocumentList((prevDocumentList) =>
        prevDocumentList?.map((item) =>
          item?.id === obj?.id
            ? {
                ...item,
                isReportGenerated: true,
                reportAwsName: payload.reportAwsName,
                reportKey: payload?.reportKey,
                reportLocation: payload?.reportLocation,
              }
            : item
        )
      );
    } else {
      setSubscriptionModal(obj?.id);
      setSelectedDocument(obj);
    }
  };

  const deleteReportHandle = async (obj: any) => {
    await dispatch<any>(updateDocument({ id: obj?.id }));
    setDocumentList((prevDocumentList) =>
      prevDocumentList?.map((item) =>
        item?.id === obj?.id
          ? {
              ...item,
              isReportGenerated: false,
              reportAwsName: "",
              reportKey: "",
              reportLocation: "",
            }
          : item
      )
    );
  };

  const viewReportHandle = async (obj: any) => {
    let { payload } = await dispatch<any>(generateReport(obj));
    setDocumentList((prevDocumentList) =>
      prevDocumentList?.map((item) =>
        item?.id === obj?.id
          ? {
              ...item,
              isReportGenerated: true,
              reportAwsName: payload.reportAwsName,
              reportKey: payload?.reportKey,
              reportLocation: payload?.reportLocation,
            }
          : item
      )
    );
    closeSubscriptionModal();
    window.open(payload?.reportLocation);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto lg:px-8 md:px-6 px-4 py-6">
        <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5">
          Document
        </h2>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => openUploadModal()}
            className="group rounded-md py-1.5 px-4 text-white font-extrabold text-center bg-primary border-2 border-primary hover:bg-white hover:text-primary transition duration-500 flex "
          >
            <PlusSmallIcon className="h-5 w-5 text-white group-hover:text-primary transition duration-500" />
            Add Document
          </button>
        </div>
        <div className="bg-white shadow-xl border border-gray-300 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[942px]">
              <thead>
                <tr>
                  <th className="py-4 px-6">File Name</th>
                  <th className="py-4 px-6 w-52">Report</th>
                  <th colSpan={2} className="py-4 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!!fetchLoading ? (
                  <Loading isShowing={fetchLoading} />
                ) : (
                  documentList.map((list) => (
                    <tr key={list.id}>
                      <td className="py-3 px-6 text-[#005DBA] transition duration-400 hover:text-[#023e7a]">
                        <Link to={`/documents/${list.id}`}>{list.name}</Link>
                      </td>
                      <td className="py-3 px-6 text-center w-52 flex gap-1">
                        <button
                          disabled={list.isReportGenerated}
                          onClick={() => generateReportHandle(list as any)}
                          className={`text-white py-1 px-3 rounded-md ${
                            list.isReportGenerated
                              ? "bg-slate-500"
                              : "bg-primary"
                          }`}
                        >
                          Generate Report
                        </button>
                        {list.isReportGenerated ? (
                          <>
                            <EyeIcon
                              onClick={() => viewReportHandle(list as any)}
                              className="w-6 h-6 text-[]"
                            />
                            <XCircleIcon
                              onClick={() => deleteReportHandle(list as any)}
                              className="w-6 h-6 text-[]"
                            />
                          </>
                        ) : null}
                      </td>
                      <td className="py-3 px-6 text-center w-[75px]">
                        <button>
                          <PencilSquareIcon className="w-6 h-6 text-[#005DBA]" />
                        </button>
                      </td>
                      <td className="py-3 px-6 text-center w-[75px]">
                        <button
                          onClick={() =>
                            setConfirmModal({ open: list.id, type: "delete" })
                          }
                        >
                          <TrashIcon className="w-6 h-6 text-[#DC3545]" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 flex items-center justify-end gap-2 pagination">
            <Pagination
              pagination={documentPagination}
              onPageChangeHandle={onPageChangeHandle}
            />
          </div>
        </div>
      </div>
      <DocumentModal
        show={uploadCsvModalHandle}
        closeModal={closeUploadModal}
        fetchAllDocument={fetchAllDocument}
        page={documentPagination?.page}
      />
      <ConfirmationModal
        isOpen={confirmModal.open}
        type={confirmModal.type}
        title={
          (confirmModal.type === "edit" && "Are you sure you want to Edit") ||
          (confirmModal.type === "delete" && "Are you sure you want to Delete?")
        }
        isFunction={confirmModal.type === "edit" ? null : deleteHandle}
        button={confirmModal.type === "edit" ? "Update" : "Delete"}
        closeModal={closeConfirmationModal}
      />
      <SubscriptionModal
        isOpen={!!subscriptionModal?.length}
        closeModal={closeSubscriptionModal}
        viewReportHandle={viewReportHandle}
        selectedDocument={selectedDocument}
      />
    </Layout>
  );
};

export default Documents;
