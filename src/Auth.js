import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* Left Panel */}
        <div className="auth-left">
          <h1>🚦 Smart Traffic</h1>
          <p>Real-time traffic monitoring & smart routing</p>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {!isLogin && <input placeholder="Full Name" />}

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          {!isLogin && <input type="password" placeholder="Confirm Password" />}

          <button
            className="auth-btn"
            onClick={() => navigate("/home")}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Auth;