import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function DriverDashboard() {

  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [requests, setRequests] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {

    if (!userId) {
      navigate("/");
      return;
    }

    loadDriver();

  }, [userId]);

  const loadDriver = async () => {

  try {

    // Get all drivers from backend
    const response = await api.get("/drivers");

    // Find the driver belonging to the logged-in user
    const loggedInDriver = response.data.find(
      (driver) =>
        String(driver.user?.id) === String(userId)
    );

    if (!loggedInDriver) {

      setError("Driver profile not found.");

      return;
    }

    setDriver(loggedInDriver);

    // Load emergency requests
    loadRequests();

  } catch (err) {

    console.error("Driver loading error:", err);

    setError(
      "Unable to load driver information."
    );
  }
};

  const loadRequests = async () => {

    try {

      const response =
        await api.get("/emergency-requests");

      setRequests(response.data);

    } catch (err) {

      console.error(err);

      setRequests([]);
    }
  };

  const completeRequest = async (requestId) => {

    setMessage("");
    setError("");

    try {

      await api.put(
        `/emergency-requests/${requestId}/complete`
      );

      setMessage(
        "Emergency request completed successfully."
      );

      await loadDriver();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data ||
        "Failed to complete emergency request."
      );
    }
  };

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  const getStatusClass = (status) => {

    if (status === "REQUESTED")
      return "status-requested";

    if (status === "ASSIGNED")
      return "status-assigned";

    if (status === "COMPLETED")
      return "status-completed";

    return "";
  };

  return (
    <div className="app-container">

      <div className="dashboard-container">

        <div className="dashboard-header">

          <h1>
            👨‍✈️ Driver Dashboard
          </h1>

          <p>
            Welcome,{" "}
            <strong>
              {driver?.user?.name || userName || "Driver"}
            </strong>
          </p>

          <button
            className="primary-button"
            style={{ marginTop: "20px" }}
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="dashboard-card">

          <h2>
            👨‍✈️ Driver Information
          </h2>

          {driver ? (

            <>
              <p style={{ marginBottom: "12px" }}>
                <strong>License Number:</strong>{" "}
                {driver.licenseNumber}
              </p>

              <p>
                <strong>Status:</strong>{" "}

                <span
                  className={`status-badge ${
                    driver.status === "AVAILABLE"
                      ? "status-completed"
                      : "status-assigned"
                  }`}
                >
                  {driver.status}
                </span>

              </p>
            </>

          ) : (

            <p>
              Loading driver information...
            </p>

          )}

        </div>

        <div className="dashboard-card">

          <h2>
            🚨 Emergency Requests
          </h2>

          {requests.length === 0 ? (

            <p>
              No emergency requests found.
            </p>

          ) : (

            <div style={{ overflowX: "auto" }}>

              <table className="data-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Pickup</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {requests.map((request) => (

                    <tr key={request.id}>

                      <td>
                        {request.id}
                      </td>

                      <td>
                        {request.pickupLocation}
                      </td>

                      <td>
                        {request.destination}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td>

                        {request.status === "ASSIGNED" ? (

                          <button
                            className="primary-button"
                            style={{
                              width: "auto",
                              padding: "9px 15px",
                            }}
                            onClick={() =>
                              completeRequest(request.id)
                            }
                          >
                            Complete
                          </button>

                        ) : (

                          request.status === "COMPLETED"
                            ? "Completed"
                            : "Waiting"

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default DriverDashboard;