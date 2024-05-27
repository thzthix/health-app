
const authProvider = {
    isAuthenticated: false,
    login(callback) {
      authProvider.isAuthenticated = true;
      setTimeout(callback, 100); // 비동기 로그인 시뮬레이션
    },
    logout(callback) {
      authProvider.isAuthenticated = false;
      setTimeout(callback, 100); // 비동기 로그아웃 시뮬레이션
    }
  };
  
  export default authProvider;
  