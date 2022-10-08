import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Pagination, { dataFormatter } from './Pagination';

function TrialComponent() {
  const [posts, setPosts] = useState([]); // data to be shown
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [currentPageIndex, setCurrentPageIndex] = useState(0); //starting index
  const [totalPosts, setTotalPosts] = useState(0); //total number of data's
  const [postsPerPage, setPostsPerPage] = useState(10); // limit, or ending index
  //up to this
  useEffect(() => {
    const fetchPosts = async () => {
      let allPosts = await axios.get(
        'https://jsonplaceholder.typicode.com/comments'
      );
      setPosts(allPosts.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setTotalPosts(posts.length);
  }, [posts]);

  return(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>List goes here</h2>
          <table class="dashboard-table">
            <tr class="dashboard-tr">
              <th class="dashboard-th">Title</th>
            </tr>
            {dataFormatter(posts, currentPageIndex, postsPerPage, currentPage) //required from user to call this method
              .map((post) => {
                return (
                  <>
                    <tr class="dashboard-tr">
                      <td class="dashboard-td">{post.email}</td>
                    </tr>
                    <hr />
                  </>
                );
              })}
          </table>
          {/* { requirement from user} */}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
            TotalPosts={totalPosts}
            PostPerPage={postsPerPage}
          />
        </div>
      );
}

export default TrialComponent;
