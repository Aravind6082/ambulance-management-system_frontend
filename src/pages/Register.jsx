import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("PATIENT");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      await api.post("/auth/register", {
        name,
        email,
        password,
        phone,
        role,
      });

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data || "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app-container">

      <div
        style={{
          maxWidth: "550px",
          margin: "40px auto",
        }}
      >

        <div className="dashboard-card">

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: "50px" }}>
              🚑
            </div>

            <h1
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              Create Account
            </h1>

            <p style={{ color: "#64748b" }}>
              Join Ambulance Management System
            </p>

          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <div className="form-group">

              <label>Full Name</label>

              <input
                className="form-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>

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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Phone Number</label>

              <input
                className="form-input"
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Account Type</label>

              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="PATIENT">
                  Patient
                </option>

                <option value="DRIVER">
                  Driver
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Already have an account?{" "}

            <Link
              to="/"
              style={{
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;