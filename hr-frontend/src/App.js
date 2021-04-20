import React from "react";
import EmployeeModel from "./model/employee";
import CardHeader from "./bootstrap/CardHeader";
import Badge from "./bootstrap/Badge";
import FormGroup from "./bootstrap/FormGroup";
import FormPhoto from "./bootstrap/FormPhoto";
import FormCheckBox from "./bootstrap/FormCheckBox";
import CardBody from "./bootstrap/CardBody";
import Card from "./bootstrap/Card";
import Container from "./bootstrap/Container";

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

    function fireEmployeeAtRow(emp) {
        fetch(`http://localhost:4001/employees/${emp.identityNo}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            .then(res => {
                setEmployee(res);
                setEmployees(employees.filter(e => e.identityNo !== emp.identityNo));
            });
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

    function copyRow(emp) {
        setEmployee(emp);
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
        <Container>
            <Card>
                <CardHeader title="Employee Panel"></CardHeader>
                <CardBody>
                    <FormGroup label="Identity No">
                        <input type="text"
                               name="identityNo"
                               className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.identityNo}></input>
                        <button onClick={findEmployee} className="btn btn-success">Find</button>
                        <button onClick={fireEmployee} className="btn btn-danger">Fire</button>
                    </FormGroup>
                    <FormGroup label="Full name">
                        <input type="text" name="fullname" className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.fullname}></input>
                    </FormGroup>
                    <FormGroup label="Iban">
                        <input type="text" name="iban" className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.iban}></input>
                    </FormGroup>
                    <FormGroup label="Salary">
                        <input type="text" name="salary" className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.salary}></input>
                    </FormGroup>
                    <FormGroup label="Birth Year">
                        <input type="text" name="birthYear" className="form-control"
                               onChange={(event) => handleChange(event)}
                               value={employee.birthYear}></input>
                    </FormGroup>
                    <FormGroup label="Department">
                        <select type="text" name="department" className="form-control"
                                onChange={(event) => handleChange(event)}
                                value={employee.department}>
                            <option>IT</option>
                            <option>Sales</option>
                            <option>HR</option>
                            <option>Finance</option>
                        </select>
                    </FormGroup>
                    <FormCheckBox name="fulltime"
                                  label="Full time?"
                                  handler={handleChange}
                                  checked={employee.fulltime}/>
                    <FormPhoto label="Photo"
                               style={{with: '128px', height: '128px'}}
                               handler={handleFileInput}
                               src={employee.photo} />
                    <FormGroup>
                        <button onClick={hireEmployee} className="btn btn-success">Hire</button>
                        <button onClick={updateEmployee} className="btn btn-warning">Update</button>
                        <button onClick={retrieveEmployees} className="btn btn-info">Retrieve Employees</button>
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title="Employees"></CardHeader>
                <CardBody>
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
                            employees.map((emp, idx) =>
                                <tr key={emp.identityNo} onMouseOver={() => copyRow(emp)}>
                                    <td>{idx + 1}</td>
                                    <td>{emp.identityNo}</td>
                                    <td>{emp.fullname}</td>
                                    <td>{emp.iban}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.birthYear}</td>
                                    <td><Badge className="badge badge-info" value={emp.department}></Badge></td>
                                    <td><Badge className="badge badge-warning"
                                               value={emp.fulltime ? 'FULL-TIME' : 'PART-TIME'}></Badge></td>
                                    <td><img className="img-thumbnail"
                                             src={emp.photo}
                                             alt=""
                                             style={{width: '64px', height: '64px'}}></img></td>
                                    <td>
                                        <button onClick={() => fireEmployeeAtRow(emp)} className="btn btn-danger">Fire
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </Container>
    );
}

export default App;
