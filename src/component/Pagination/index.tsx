import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ pagination, onPageChangeHandle }: any) {
  const { page, limit, totalPage, totaldata } = pagination;
  console.log("pagination", pagination);

  const handlePageClick = (event: any) => {
    onPageChangeHandle(event.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRightIcon className="h-4 w-4" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel={<ChevronLeftIcon className="h-4 w-4" />}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
