import React, { useEffect, useState } from 'react';

function Pagination({
  currentPage,
  TotalPosts,
  PostPerPage, // limit, or ending index
  setCurrentPageIndex, //starting index
  setCurrentPage, // page number
}) {
  const [paginationStrip, setPaginationStrip] = useState([]);

  const styles = {
    paginationButton: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      color: 'blue',
      borderRadius: '0.25rem',
      backgroundColor: 'white',
      marginInline: '0.5rem',
      border: 'none',
      outline: 'none',
    },
    paginationButtonActive: {
      backgroundColor: 'black',
      color: 'white',
    },
    paginationBarContainer: {
      whiteSpace: 'nowrap',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100vw',
    },
  };

  useEffect(() => {
    let numbers = [];

    for (let i = 1; i <= TotalPosts / PostPerPage; i++) {
      numbers.push(i);
    }
    //if remaining records are there
    if (TotalPosts / PostPerPage < PostPerPage)
      numbers.push(numbers.length + 1);
    setPaginationStrip(numbers);
  }, [TotalPosts]);

  return (
    <div
      style={styles.paginationBarContainer}
      // style={{
      //   whiteSpace: 'nowrap',
      //   overflowX: 'auto',
      //   overflowY: 'hidden',
      //   width: '100vw',
      // }}
    >
      {paginationStrip &&
        paginationStrip.map((page) => {
          return (
            <button
              id={page}
              type="button"
              style={
                page === currentPage
                  ? {
                      ...styles.paginationButton,
                      ...styles.paginationButtonActive,
                    }
                  : styles.paginationButton
              }
              onClick={() => {
                setCurrentPage(page);
                setCurrentPageIndex(PostPerPage * page - PostPerPage);
              }}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
}

export function dataFormatter(
  data,
  currentPageIndex,
  postsPerPage,
  currentPage
) {
  if (data && data.length > 0)
    return data.slice(currentPageIndex, postsPerPage * currentPage);
  else return [];
}

export default Pagination;
