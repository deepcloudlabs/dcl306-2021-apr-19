import React from "react";
import EmployeeModel from "./model/employee";

function App() {
    const [employee, setEmployee] = React.useState(new EmployeeModel());

    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        let emp = {...employee};
        if (name === "fulltime")
            emp.fulltime = !emp.fulltime;
        else
            emp[name] = value;
        setEmployee(emp);
    }

    function handleFileInput(event) {
        let emp = {...employee};
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
            emp.photo = e.target.result;
            setEmployee(emp);
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Employee Panel</h3>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Identity No:</label>
                        <input type="text"
                               name="identityNo"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.identityNo}></input>
                    </div>
                    <div className="form-group">
                        <label>Full name:</label>
                        <input type="text"
                               name="fullname"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.fullname}></input>
                    </div>
                    <div className="form-group">
                        <label>Iban:</label>
                        <input type="text"
                               name="iban"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.iban}></input>
                    </div>
                    <div className="form-group">
                        <label>Salary:</label>
                        <input type="text"
                               name="salary"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.salary}></input>
                    </div>
                    <div className="form-group">
                        <label>Birth Year:</label>
                        <input type="text"
                               name="birthYear"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.birthYear}></input>
                    </div>
                    <div className="form-group">
                        <label>Department:</label>
                        <select type="text"
                                name="department"
                                className="form-control"
                                onChange={(event) => handleChange(event)}
                                value={employee.department}>
                            <option>IT</option>
                            <option>Sales</option>
                            <option>HR</option>
                            <option>Finance</option>
                        </select>
                        <div className="form-group">
                            <div className="form-check">
                                <input type="checkbox"
                                       name="fulltime"
                                       className="form-check-input"
                                       onChange={(event) => handleChange(event)}
                                       checked={employee.fulltime}></input>
                                <label>Full time?</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Photo:</label>
                            <img className="img-thumbnail"
                                 src={employee.photo}
                                 style={{with: '128px', height: '128px'}}
                                 alt="employee"></img>
                            <label className="btn btn-success">
                                <input type="file"
                                       style={{display: "none"}}
                                       onChange={(event) => handleFileInput(event)}
                                       className="form-control"></input>
                                <span>File</span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
