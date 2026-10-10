import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PatientDashboard() {

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [requests, setRequests] = useState([]);

  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {

    if (!userId) {
      navigate("/");
      return;
    }

    loadPatient();

  }, [userId]);

  const loadPatient = async () => {

    try {

      const response =
        await api.get(`/patients/user/${userId}`);

      setPatient(response.data);

      loadRequests(response.data.id);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load patient information."
      );
    }
  };

  const loadRequests = async (patientId) => {

    try {

      const response =
        await api.get(
          `/emergency-requests/patient/${patientId}`
        );

      setRequests(response.data);

    } catch (err) {

      console.error(err);

      setRequests([]);

    }
  };

  const requestAmbulance = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!pickupLocation || !destination) {

      setError(
        "Please enter pickup location and destination."
      );

      return;
    }

    if (!patient) {

      setError(
        "Patient information is not available."
      );

      return;
    }

    try {

      await api.post(
        "/emergency-requests",
        null,
        {
          params: {
            patientId: patient.id,
            pickupLocation,
            destination,
          },
        }
      );

      setMessage(
        "Ambulance request submitted successfully!"
      );

      setPickupLocation("");
      setDestination("");

      loadRequests(patient.id);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data ||
        "Failed to create ambulance request."
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
            🚑 Patient Dashboard
          </h1>

          <p>
            Welcome,{" "}
            <strong>
              {patient?.user?.name || userName || "Patient"}
            </strong>
          </p>

          {patient && (
            <>
              <p>
                Patient ID:{" "}
                <strong>{patient.id}</strong>
              </p>

              <p>
                Address:{" "}
                <strong>{patient.address}</strong>
              </p>
            </>
          )}

          <button
            className="primary-button"
            style={{ marginTop: "20px" }}
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="dashboard-card">

          <h2>
            🚨 Request Ambulance
          </h2>

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

          <form onSubmit={requestAmbulance}>

            <div className="form-group">

              <label>
                Pickup Location
              </label>

              <input
                className="form-input"
                type="text"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={(e) =>
                  setPickupLocation(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Hospital / Destination
              </label>

              <input
                className="form-input"
                type="text"
                placeholder="Enter hospital or destination"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="primary-button"
            >
              🚑 Request Ambulance
            </button>

          </form>

        </div>

        <div className="dashboard-card">

          <h2>
            📋 My Emergency Requests
          </h2>

          {requests.length === 0 ? (

            <p>
              No ambulance requests found.
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

export default PatientDashboard;