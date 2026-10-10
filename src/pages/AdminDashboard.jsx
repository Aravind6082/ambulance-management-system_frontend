import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

  const navigate = useNavigate();

  const [ambulances, setAmbulances] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const [
        ambulanceResponse,
        driverResponse,
        requestResponse
      ] = await Promise.all([

        api.get("/ambulances"),

        api.get("/drivers"),

        api.get("/emergency-requests"),

      ]);

      setAmbulances(
        ambulanceResponse.data
      );

      setDrivers(
        driverResponse.data
      );

      setRequests(
        requestResponse.data
      );

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load admin data."
      );
    }
  };

  const assignAmbulance = async (requestId) => {

    setMessage("");
    setError("");

    const availableAmbulance =
      ambulances.find(
        (ambulance) => ambulance.available === true
      );

    const availableDriver =
      drivers.find(
        (driver) =>
          driver.status?.toUpperCase() === "AVAILABLE"
      );

    if (!availableAmbulance) {

      setError(
        "No ambulance is currently available."
      );

      return;
    }

    if (!availableDriver) {

      setError(
        "No driver is currently available."
      );

      return;
    }

    try {

      await api.put(
        `/emergency-requests/${requestId}/assign`,
        null,
        {
          params: {
            ambulanceId:
              availableAmbulance.id,

            driverId:
              availableDriver.id,
          },
        }
      );

      setMessage(
        "Ambulance assigned successfully!"
      );

      await loadData();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data ||
        "Failed to assign ambulance."
      );
    }
  };

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="app-container">

      <div className="dashboard-container">

        <div className="dashboard-header">

          <h1>
            🛠️ Admin Dashboard
          </h1>

          <p>
            Ambulance Management System
          </p>

          <button
            className="primary-button"
            style={{
              marginTop: "20px",
              maxWidth: "250px",
            }}
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

        {/* Ambulances */}

        <div className="dashboard-card">

          <h2>
            🚑 Ambulances
          </h2>

          {ambulances.length === 0 ? (

            <p>
              No ambulances found.
            </p>

          ) : (

            <div style={{ overflowX: "auto" }}>

              <table className="data-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Vehicle Number</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Available</th>
                  </tr>

                </thead>

                <tbody>

                  {ambulances.map((ambulance) => (

                    <tr key={ambulance.id}>

                      <td>
                        {ambulance.id}
                      </td>

                      <td>
                        {ambulance.vehicleNumber}
                      </td>

                      <td>
                        {ambulance.type || "—"}
                      </td>

                      <td>
                        {ambulance.location}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            ambulance.available
                              ? "status-completed"
                              : "status-assigned"
                          }`}
                        >
                          {ambulance.available
                            ? "AVAILABLE"
                            : "BUSY"}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* Drivers */}

        <div className="dashboard-card">

          <h2>
            👨‍✈️ Drivers
          </h2>

          {drivers.length === 0 ? (

            <p>
              No drivers found.
            </p>

          ) : (

            <div style={{ overflowX: "auto" }}>

              <table className="data-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>License</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {drivers.map((driver) => (

                    <tr key={driver.id}>

                      <td>
                        {driver.id}
                      </td>

                      <td>
                        {driver.user?.name || "—"}
                      </td>

                      <td>
                        {driver.licenseNumber}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            driver.status === "AVAILABLE"
                              ? "status-completed"
                              : "status-assigned"
                          }`}
                        >
                          {driver.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* Emergency Requests */}

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
                    <th>Patient</th>
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
                        {request.patient?.user?.name || "—"}
                      </td>

                      <td>
                        {request.pickupLocation}
                      </td>

                      <td>
                        {request.destination}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            request.status === "COMPLETED"
                              ? "status-completed"
                              : request.status === "ASSIGNED"
                              ? "status-assigned"
                              : "status-requested"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td>

                        {request.status === "REQUESTED" ? (

                          <button
                            className="primary-button"
                            style={{
                              width: "auto",
                              padding: "9px 15px",
                            }}
                            onClick={() =>
                              assignAmbulance(
                                request.id
                              )
                            }
                          >
                            Assign Ambulance
                          </button>

                        ) : request.status === "ASSIGNED" ? (

                          <span>
                            Assigned
                          </span>

                        ) : (

                          <span>
                            Completed
                          </span>

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

export default AdminDashboard;