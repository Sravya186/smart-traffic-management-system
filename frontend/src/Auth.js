import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    // Validation
    if (!email || !password || (!isLogin && !name)) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);

        // Redirect after success
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

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

          {!isLogin && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button className="auth-btn" onClick={handleSubmit}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>

          {message && <p className="auth-message">{message}</p>}

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