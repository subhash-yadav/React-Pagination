import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItems] = useState([]);
  const [totalCard, setTotalCard] = useState();
  const limit= 6
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:3004/comments?_page=1&__limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count")/limit;
      setTotalCard(Math.ceil(total))

      setItems(data);
    };
    getComments()
  },[]);

  const fetchComment = async (current) =>{
    const res = await fetch(`http://localhost:3004/comments?_page=${current}&__limit=${limit}`);
    const data = await res.json();
    return data;
  }
  const handlePageClick = async(data) => {
    const currentPage = data.selected +1;
    const currentPageData = await fetchComment(currentPage);
    setItems(currentPageData)
  };
  return (
    <div className="container">
      {
        <div className="row m-2">
          {items.map((item) => {
            return (
              <div key={item.id} className="col-sm-6 col-md-4 v my-2 ">
                <div
                  className="card shadow-sm w-100"
                  style={{ minHeight: 225 }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center h2">Id: {item.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalCard}
        marginPagesDisplayed={3}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
