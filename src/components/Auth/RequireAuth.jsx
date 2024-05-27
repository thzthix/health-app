import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const { loading, authToken } = useAuth();
  let location = useLocation();

  if (loading) {
    // 로딩 중이면 아무것도 표시하지 않거나 로딩 인디케이터를 표시할 수 있습니다.
    return <div>Loading...</div>;
  }

  if (!authToken) {
    // 로딩이 완료되었으나 토큰이 없는 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default RequireAuth;
