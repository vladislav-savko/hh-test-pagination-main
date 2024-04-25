import React, { useMemo, memo } from "react";

const MAX_DISPLAYED_PAGES = 10;

export interface IPagination {
  nav: {
    current: number;
    total: number;
    perPage: number;
  };
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onLastPageClick: () => void;
  onFirstPageClick: () => void;
  onPageClick: (page: number) => void;
}

const Pagination = ({
  nav,
  onNextPageClick,
  onPrevPageClick,
  onFirstPageClick,
  onLastPageClick,
  onPageClick,
}: IPagination) => {
  const handleNextPageClick = () => {
    onNextPageClick();
  };

  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  const handlePageClick = (page: number) => {
    onPageClick(page);
  };

  const handleLastPageClick = () => {
    onLastPageClick();
  };

  const handleFirstPageClick = () => {
    onFirstPageClick();
  };

  const displayedPageNumbers = useMemo(() => {
    const totalPages = nav.total;
    const currentPage = nav.current;

    const halfDisplayedPages = Math.floor(MAX_DISPLAYED_PAGES / 2);

    let startPage = currentPage - halfDisplayedPages;
    let endPage = currentPage + halfDisplayedPages;

    if (totalPages <= MAX_DISPLAYED_PAGES) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, currentPage - Math.floor(MAX_DISPLAYED_PAGES / 2));
      endPage = Math.min(startPage + MAX_DISPLAYED_PAGES - 1, totalPages);
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - MAX_DISPLAYED_PAGES + 1);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [nav.current, nav.total, nav.perPage]);

  return (
    <section className="pagination">
      <button className="pagination__button" type="button" onClick={handleFirstPageClick}>
        &#171;
      </button>
      <button className="pagination__button" type="button" onClick={handlePrevPageClick}>
        &lsaquo;
      </button>
      {displayedPageNumbers.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            className={`pagination__button ${pageNumber === nav.current ? "pagination__button--active" : ""}`}
            type="button"
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button className="pagination__button" type="button" onClick={handleNextPageClick}>
        &rsaquo;
      </button>
      <button className="pagination__button" type="button" onClick={handleLastPageClick}>
        &#187;
      </button>
    </section>
  );
};

export default memo(Pagination);
