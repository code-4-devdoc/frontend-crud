import React from "react";
import './Auth.css'; // CSS 파일 연동

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 로그인 폼 제출 처리
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    // 로그인 처리 로직 (예시)
    console.log({ email, password });
  }

  render() {
    return (
        <div className="App">
          <div className="leftPanel">
            <h1 className="devDocTitle">Dev<br />Doc</h1>
          </div>
          <div className="rightPanel">
            <div className="loginContainer">
              <h1 className="loginTitle">로그인</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일 주소"
                    required
                    className="textField"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="패스워드"
                    required
                    className="textField"
                />
                <div className="buttonContainer">
                  <button type="submit" className="loginButton">이메일 (예: example@gmail.com)</button>
                  <button
                      type="button"
                      className="signupButton"
                      onClick={() => window.location.href='/signup'}
                  >
                    회원가입
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
