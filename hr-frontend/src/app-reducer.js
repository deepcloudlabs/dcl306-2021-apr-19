import EmployeeModel from "./model/employee";
import {
    FIND_EMPLOYEE,
    FIRE_EMPLOYEE,
    HANDLE_CHANGE,
    HANDLE_FILE_CHANGE,
    HIRE_EMPLOYEE,
    UPDATE_EMPLOYEE
} from "./action-types";

// reducer: i) function ii) no side effect iii) immutable
export default function AppReducer(state, action){
    if (state === undefined){
        // initialize state
        return { employee : new EmployeeModel()};
    }
    let newState = {...state};

    switch (action.type) {
        case FIND_EMPLOYEE:
            newState.employee = action.employee;
            break;
        case FIRE_EMPLOYEE:
            newState.employee = action.employee;
            break;
        case HIRE_EMPLOYEE:
            console.log(action.status);
            break;
        case UPDATE_EMPLOYEE:
            console.log(action.status);
            break;
        case HANDLE_CHANGE:
            newState.employee = {...state.employee};
            let name = action.event.target.name;
            let value = action.event.target.value;
            if (name === "fulltime")
                newState.employee.fulltime = !newState.employee.fulltime;
            else
                newState.employee[name] = value;
            break;
        case HANDLE_FILE_CHANGE:
            newState.employee.photo = action.data;
            break;
        default:
            break;
    }
    return newState;
}