import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 수정된 부분

const BoardPage = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 게시글', author: '작성자1' },
    { id: 2, title: '두 번째 게시글', author: '작성자2' },
  ]);
  const navigate = useNavigate(); // 수정된 부분

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} onClick={() => navigate(`/board/${post.id}`)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => navigate('/board/write')}>글쓰기</Button> 
    </div>
  );
}

export default BoardPage;
