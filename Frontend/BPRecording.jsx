import { useEffect, useState } from "react";
import "./BPRecording.css";

function BPRecording() {

    const [patientId, setPatientId] = useState("");
    const [bpValue, setBpValue] = useState("");

    const [recordings, setRecordings] = useState([]);

    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:8080/api/bp";

    const loadRecordings = async () => {

        try {

            setLoading(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to load BP records");
            }

            const data = await response.json();

            setRecordings(data);

        } catch (error) {

            console.error("Error:", error);

            alert("Cannot connect to Spring Boot server");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadRecordings();

    }, []);

    const registerBP = async (event) => {

        event.preventDefault();

        if (patientId === "" || bpValue === "") {

            alert("Please enter Patient ID and BP Value");

            return;
        }


        const newBP = {

            patientId: Number(patientId),

            bpValue: bpValue

        };


        try {

            const response = await fetch(
                `${API_URL}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(newBP)
                }
            );


            if (!response.ok) {

                throw new Error("Failed to register BP");

            }


            const savedRecord = await response.json();

            setRecordings((previousRecords) => [
                ...previousRecords,
                savedRecord
            ]);

            setBpValue("");


            alert("BP Registered Successfully!");

        } catch (error) {

            console.error("Error:", error);

            alert("Cannot register BP");

        }

    };

    const addNewValue = (record) => {

        setPatientId(record.patientId);

        setBpValue("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    return (

        <div className="bp-container">

            <h1>BP Recording</h1>

            <div className="form-card">

                <h2>Register BP</h2>


                <form onSubmit={registerBP}>


                    {/* PATIENT ID */}

                    <label>
                        Patient ID
                    </label>

                    <input
                        type="number"
                        placeholder="Enter Patient ID"
                        value={patientId}
                        onChange={(event) =>
                            setPatientId(event.target.value)
                        }
                    />


                    {/* BP VALUE */}

                    <label>
                        BP Value
                    </label>

                    <input
                        type="text"
                        placeholder="Example: 120/80"
                        value={bpValue}
                        onChange={(event) =>
                            setBpValue(event.target.value)
                        }
                    />


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>


                </form>

            </div>

            <div className="list-card">

                <div className="list-header">

                    <h2>BP Recording List</h2>

                    <button
                        onClick={loadRecordings}
                        className="refresh-button"
                    >
                        Refresh
                    </button>

                </div>


                {loading ? (

                    <p className="loading">
                        Loading BP records...
                    </p>

                ) : recordings.length === 0 ? (

                    <p className="empty">
                        No BP recordings found.
                    </p>

                ) : (

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Patient ID</th>

                                <th>Previous BP Value</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {recordings.map((record) => (

                                <tr key={record.id}>

                                    <td>
                                        {record.id}
                                    </td>

                                    <td>
                                        {record.patientId}
                                    </td>

                                    <td className="bp-value">
                                        {record.bpValue}
                                    </td>

                                    <td>

                                        <button
                                            className="add-button"
                                            onClick={() =>
                                                addNewValue(record)
                                            }
                                        >
                                            Add New Value
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default BPRecording;