import React, { useState } from "react";
import "./BPRecording.css";

const API_URL = "http://localhost:8080/api/bp";

function BPRecording() {
    const [patientId, setPatientId] = useState("");
    const [bpValue, setBpValue] = useState("");

    const [searchPatientId, setSearchPatientId] = useState("");
    const [recordings, setRecordings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // =========================================================
    // SEARCH PATIENT - BACKEND / DATABASE SEARCH
    // =========================================================
    const searchPatient = async () => {
        const id = searchPatientId.trim();

        if (id === "") {
            alert("Please enter Patient ID");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/search?patientId=${encodeURIComponent(id)}`
            );

            if (!response.ok) {
                throw new Error("Failed to search patient");
            }

            const data = await response.json();

            // Only records returned by backend are displayed
            setRecordings(data);
        } catch (error) {
            console.error("Search error:", error);
            alert("Cannot search patient");
            setRecordings([]);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // CLEAR SEARCH
    // =========================================================
    const clearSearch = () => {
        setSearchPatientId("");
        setRecordings([]);
    };

    // =========================================================
    // BACKEND SEARCH HELPER
    // =========================================================
    const searchPatientFromBackend = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/search?patientId=${encodeURIComponent(id)}`
            );

            if (!response.ok) {
                throw new Error("Failed to search patient");
            }

            const data = await response.json();

            setRecordings(data);
        } catch (error) {
            console.error("Search error:", error);
            setRecordings([]);
        }
    };

    // =========================================================
    // REGISTER BP RECORD
    // =========================================================
    const registerBP = async (e) => {
        e.preventDefault();

        if (patientId.trim() === "") {
            alert("Please enter Patient ID");
            return;
        }

        if (bpValue.trim() === "") {
            alert("Please enter BP Value");
            return;
        }

        const newBP = {
            patientId: patientId.trim(),
            bpValue: bpValue.trim()
        };

        const registeredPatientId = patientId.trim();

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBP)
            });

            if (!response.ok) {
                throw new Error("Failed to save BP record");
            }

            await response.json();

            alert("BP Record saved successfully");

            setPatientId("");
            setBpValue("");

            // Refresh only the currently searched patient
            if (
                searchPatientId.trim() !== "" &&
                searchPatientId.trim() === registeredPatientId
            ) {
                await searchPatientFromBackend(
                    searchPatientId.trim()
                );
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Cannot save BP record");
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // OPEN ADD POPUP
    // =========================================================
    const openAddPopup = () => {
        // Use searched Patient ID automatically
        if (searchPatientId.trim() !== "") {
            setPatientId(searchPatientId.trim());
        }

        setBpValue("");
        setShowPopup(true);
    };

    // =========================================================
    // CLOSE ADD POPUP
    // =========================================================
    const closePopup = () => {
        setShowPopup(false);
        setPatientId("");
        setBpValue("");
    };

    // =========================================================
    // ADD NEW BP VALUE
    // =========================================================
    const addNewBP = async (e) => {
        e.preventDefault();

        if (patientId.trim() === "") {
            alert("Please enter Patient ID");
            return;
        }

        if (bpValue.trim() === "") {
            alert("Please enter BP Value");
            return;
        }

        const newBP = {
            patientId: patientId.trim(),
            bpValue: bpValue.trim()
        };

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBP)
            });

            if (!response.ok) {
                throw new Error("Failed to add BP record");
            }

            await response.json();

            alert("New BP value added successfully");

            setShowPopup(false);
            setPatientId("");
            setBpValue("");

            // Refresh only currently searched patient
            if (searchPatientId.trim() !== "") {
                await searchPatientFromBackend(
                    searchPatientId.trim()
                );
            } else {
                setRecordings([]);
            }
        } catch (error) {
            console.error("Add BP error:", error);
            alert("Cannot add BP record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bp-page">

            {/* =====================================================
                PAGE TITLE
            ====================================================== */}
            <div className="bp-header">
                <h1>Blood Pressure Recording</h1>

                <p>
                    Register and search patient blood pressure records
                </p>
            </div>

            {/* =====================================================
                MAIN 50 / 50 LAYOUT
            ====================================================== */}
            <div className="bp-main-container">

                {/* =================================================
                    LEFT SIDE - REGISTER BP
                ================================================== */}
                <div className="bp-card">

                    <h2>Register BP</h2>

                    <form onSubmit={registerBP}>

                        {/* Patient ID */}
                        <div className="form-group">

                            <label>
                                Patient ID
                            </label>

                            <input
                                type="text"
                                value={patientId}
                                onChange={(e) =>
                                    setPatientId(e.target.value)
                                }
                                placeholder="Enter Patient ID"
                            />

                        </div>

                        {/* BP Value */}
                        <div className="form-group">

                            <label>
                                BP Value
                            </label>

                            <input
                                type="text"
                                value={bpValue}
                                onChange={(e) =>
                                    setBpValue(e.target.value)
                                }
                                placeholder="Example: 120/80"
                            />

                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="btn btn-primary register-button"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Register BP"}
                        </button>

                    </form>

                </div>

                {/* =================================================
                    RIGHT SIDE - BP RECORD LIST
                ================================================== */}
                <div className="bp-card">

                    <h2>BP Record List</h2>

                    {/* Search */}
                    <div className="search-container">

                        <input
                            type="text"
                            value={searchPatientId}
                            onChange={(e) =>
                                setSearchPatientId(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchPatient();
                                }
                            }}
                            placeholder="Search Patient ID"
                        />

                        <button
                            onClick={searchPatient}
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            Search
                        </button>

                        <button
                            onClick={clearSearch}
                            className="btn btn-secondary"
                        >
                            Clear
                        </button>

                    </div>

                    {/* Record Table */}
                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient ID</th>
                                    <th>BP Value</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recordings.length > 0 ? (

                                    recordings.map((record) => (

                                        <tr key={record.id}>

                                            <td>
                                                {record.id}
                                            </td>

                                            <td>
                                                {record.patientId}
                                            </td>

                                            <td>
                                                {record.bpValue}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="no-records"
                                        >
                                            {searchPatientId
                                                ? "No records found"
                                                : "Search a Patient ID to view BP records"}
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Add New Value */}
                    <button
                        onClick={openAddPopup}
                        className="btn btn-success add-value-button"
                    >
                        + Add New Value
                    </button>

                </div>

            </div>

            {/* =====================================================
                POPUP
            ====================================================== */}
            {showPopup && (

                <div className="popup-overlay">

                    <div className="popup-box">

                        <h2>
                            Add New BP Value
                        </h2>

                        <form onSubmit={addNewBP}>

                            {/* Patient ID */}
                            <div className="form-group">

                                <label>
                                    Patient ID
                                </label>

                                <input
                                    type="text"
                                    value={patientId}
                                    onChange={(e) =>
                                        setPatientId(e.target.value)
                                    }
                                    placeholder="Enter Patient ID"
                                />

                            </div>

                            {/* BP Value */}
                            <div className="form-group">

                                <label>
                                    BP Value
                                </label>

                                <input
                                    type="text"
                                    value={bpValue}
                                    onChange={(e) =>
                                        setBpValue(e.target.value)
                                    }
                                    placeholder="Example: 120/80"
                                />

                            </div>

                            {/* Popup Buttons */}
                            <div className="popup-buttons">

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default BPRecording;