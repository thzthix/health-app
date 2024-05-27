import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 수정된 부분

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 추가된 부분
  const post = { title: '게시글 제목', content: '게시글 내용...', comments: ['댓글1', '댓글2'] };

  // 수정 및 삭제 핸들러 예시 (실제 로직 구현 필요)
  const handleEdit = () => {
    console.log('수정 로직 구현');
    // navigate(`/edit/${id}`);
  };
  
  const handleDelete = () => {
    console.log('삭제 로직 구현');
    // navigate('/');
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleEdit}>수정</button> {/* 추가된 부분 */}
      <button onClick={handleDelete}>삭제</button> {/* 추가된 부분 */}
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostPage;
