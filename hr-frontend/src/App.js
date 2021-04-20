import React from "react";
import EmployeeModel from "./model/employee";

function App() {
    const [employee, setEmployee] = React.useState(new EmployeeModel());
    const [employees, setEmployees] = React.useState([]);

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

    function findEmployee() {
        let emp = {...employee};
        fetch(`http://localhost:4001/employees/${emp.identityNo}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            .then(res => setEmployee(res));
    }

    function fireEmployee() {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            .then(res => setEmployee(res));
    }

    function hireEmployee() {
        const emp = {...employee};
        fetch('http://localhost:4001/employees',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(emp)
            }).then(res => res.json())
            .then(res => console.log("Employee is hired!"))
    }

    function updateEmployee() {
        const emp = {...employee};
        fetch('http://localhost:4001/employees',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(emp)
            }).then(res => res.json())
            .then(res => console.log("Employee is updated!"))
    }

    function retrieveEmployees() {
        fetch(`http://localhost:4001/employees`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            .then(employees => setEmployees(employees));
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
                        <button onClick={findEmployee} className="btn btn-success">Find</button>
                        <button onClick={fireEmployee} className="btn btn-danger">Fire</button>
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
                    </div>
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
                    <div className="form-group">
                        <button onClick={hireEmployee} className="btn btn-success">Hire</button>
                        <button onClick={updateEmployee} className="btn btn-warning">Update</button>
                        <button onClick={retrieveEmployees} className="btn btn-info">Retrieve Employees</button>

                    </div>
                </div>
            </div>
            <p></p>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Employees</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Identity No</th>
                                <th>Full Name</th>
                                <th>IBAN</th>
                                <th>Salary</th>
                                <th>Birth Year</th>
                                <th>Department</th>
                                <th>Full-time?</th>
                                <th>Photo</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>{
                           employees.map( (emp,idx) =>
                                <tr key={emp.identityNo}>
                                    <td>{idx + 1}</td>
                                    <td>{emp.identityNo}</td>
                                    <td>{emp.fullname}</td>
                                    <td>{emp.iban}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.birthYear}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.fulltime ? 'FULL-TIME' : 'PART-TIME'}</td>
                                    <td><img className="img-thumbnail"
                                             src={emp.photo}
                                             style={{width: '64px', height: '64px'}}></img></td>
                                    <td><button className="btn btn-danger">Fire</button></td>
                                </tr>
                           )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
