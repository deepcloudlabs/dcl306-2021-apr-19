import React from "react";
import CardHeader from "./bootstrap/CardHeader";
import FormGroup from "./bootstrap/FormGroup";
import FormPhoto from "./bootstrap/FormPhoto";
import FormCheckBox from "./bootstrap/FormCheckBox";
import CardBody from "./bootstrap/CardBody";
import Card from "./bootstrap/Card";
import Container from "./bootstrap/Container";

function App(props) {
    let employee = props.employee;

    return (
        <Container>
            <Card>
                <CardHeader title="Employee Panel"></CardHeader>
                <CardBody>
                    <FormGroup label="Identity No">
                        <input type="text"
                               name="identityNo"
                               className="form-control"
                               onChange={props.handleChange}
                               value={employee.identityNo}></input>
                        <button onClick={ () => props.findEmployee(employee.identityNo)} className="btn btn-success">Find</button>
                        <button onClick={() => props.fireEmployee(employee.identityNo)} className="btn btn-danger">Fire</button>
                    </FormGroup>
                    <FormGroup label="Full name">
                        <input type="text" name="fullname" className="form-control"
                               onChange={props.handleChange}
                               value={employee.fullname}></input>
                    </FormGroup>
                    <FormGroup label="Iban">
                        <input type="text" name="iban" className="form-control"
                               onChange={props.handleChange}
                               value={employee.iban}></input>
                    </FormGroup>
                    <FormGroup label="Salary">
                        <input type="text" name="salary" className="form-control"
                               onChange={props.handleChange}
                               value={employee.salary}></input>
                    </FormGroup>
                    <FormGroup label="Birth Year">
                        <input type="text" name="birthYear" className="form-control"
                               onChange={props.handleChange}
                               value={employee.birthYear}></input>
                    </FormGroup>
                    <FormGroup label="Department">
                        <select type="text" name="department" className="form-control"
                                onChange={props.handleChange}
                                value={employee.department}>
                            <option>IT</option>
                            <option>Sales</option>
                            <option>HR</option>
                            <option>Finance</option>
                        </select>
                    </FormGroup>
                    <FormCheckBox name="fulltime"
                                  label="Full time?"
                                  handler={props.handleChange}
                                  checked={employee.fulltime}/>
                    <FormPhoto label="Photo"
                               style={{with: '128px', height: '128px'}}
                               handler={props.handleFileInput}
                               src={employee.photo} />
                    <FormGroup>
                        <button onClick={() => props.hireEmployee(props.employee)} className="btn btn-success">Hire</button>
                        <button onClick={() => props.updateEmployee(props.employee)} className="btn btn-warning">Update</button>
                        <button className="btn btn-info">Retrieve Employees</button>
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
        </Container>
    );
}

export default App;
