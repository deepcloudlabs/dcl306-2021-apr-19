import App from "./App";
import {connect} from "react-redux";
import {
    FIND_EMPLOYEE,
    FIRE_EMPLOYEE,
    HANDLE_CHANGE,
    HANDLE_FILE_CHANGE,
    HIRE_EMPLOYEE,
    UPDATE_EMPLOYEE
} from "./action-types";

let mapStateToProps = function (state) {
    return {
        employee: state.appStore.employee
    }
};

let mapDispatchToProps = function (dispatch) {
    return {
        findEmployee: async function (identity) {
            let employee = await fetch(`http://localhost:4001/employees/${identity}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(res => res.json());
            return dispatch({type: FIND_EMPLOYEE, employee});
        },
        fireEmployee: async function (identity) {
            let employee = fetch(`http://localhost:4001/employees/${identity}`,
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(res => res.json());
            return dispatch({type: FIRE_EMPLOYEE, employee});
        },
        hireEmployee: async function (employee) {
            let status = await fetch('http://localhost:4001/employees',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(employee)
                });
            return dispatch({type: HIRE_EMPLOYEE, status});
        },
        updateEmployee: async function (employee) {
            let status = await fetch('http://localhost:4001/employees',
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(employee)
                }).then(res => res.json())
            return dispatch({type: UPDATE_EMPLOYEE, status});
        },
        handleChange: function (event) {
            return dispatch({type: HANDLE_CHANGE, event});
        },
        handleFileInput: function (event) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e) => {
                dispatch({type: HANDLE_FILE_CHANGE, data: e.target.result});
            };
        }
    }
}

const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnector;