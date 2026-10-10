import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const user = response.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPhone", user.phone || "");
      localStorage.setItem("role", user.role);

      if (user.role === "PATIENT") {

        navigate("/patient-dashboard");

      } else if (user.role === "DRIVER") {

        navigate("/driver-dashboard");

      } else if (user.role === "ADMIN") {

        navigate("/admin-dashboard");

      } else {

        setError("Unknown user role.");

      }

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data || "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app-container">

      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
        }}
      >

        <div className="dashboard-card">

          <div style={{ textAlign: "center", marginBottom: "30px" }}>

            <div style={{ fontSize: "55px" }}>
              🚑
            </div>

            <h1
              style={{
                color: "#2563eb",
                fontSize: "38px",
                marginBottom: "8px",
              }}
            >
              Ambulance Management
            </h1>

            <p style={{ color: "#64748b" }}>
              Emergency Ambulance Service
            </p>

          </div>

          <h2 style={{ textAlign: "center" }}>
            Login
          </h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>Email</label>

              <input
                className="form-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              style={{
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;