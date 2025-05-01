import React from "react";

const NavPage = ({page, setPage, pages}) => {

    return (
            <div className="d-flex justify-content-center p-5">
              {/* Render your data here */}
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      disabled={page === 1}
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>
                  {pages.map((numPage, index) => (
                    <li key={index} className={`page-item ${page === numPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(numPage)}>
                        {numPage}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className="page-link"
                      disabled={page === pages.length}
                      onClick={() => setPage(prev => Math.min(prev + 1, pages.length))}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          );
        };  
    


export default NavPage;