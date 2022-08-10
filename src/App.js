import React,{ useState } from "react";

import AddEmplyee from './components/Forms/AddEmployee';
import EmployeeInformation from "./components/Forms/EmployeeInformation";
import EditEmployee from './components/Forms/EditEmployee';
import Header from "./components/Layout/Header";

const App = () => {

const initialEmployee = { 
  id: '',
  employeeNumber: '',
  firstname: '',
  lastname: '',
  phoneNumber: '',
  email: '' 
};  

const [employeeAddIsShown, setEmployeeAddIsShown] = useState(false); // isAddEmployeeModalPopUpShown
const [employeeList, setEmployeeList] = useState([]);
const [currentEmployee, setCurrentEmployee] = useState(initialEmployee);
const [employeeEditIsShown, setEditEmployeeIsShown] = useState(false); // isEditEmployeeModalPopUpShown

const showAddEmployeeHandler = () => {
  setEmployeeAddIsShown(true);
}
const hideAddEmployeeHandler = () => {
  setEmployeeAddIsShown(false);
}
const hideEditEmployeeHandler = () => {
  setEditEmployeeIsShown(false);
}
/*
* Add new employee to the existing list of employees.
* New employee will be added at position zero of employeeArray
* */

const addEmployeeToList = (list) => {
  setEmployeeList(prevList => {
    const updatedList = [...prevList];
    updatedList.unshift({ 
      id:list.id,
      employeeNumber: list.employeeNumber,
      email:list.email,
      firstname:list.name,
      lastname:list.lastName,
      phoneNumber:list.phoneNumber
      });

    return updatedList;
  });
}

const deleteEmployeeHandler = id => {
  setEmployeeList(prevList => {
    const updatedList = prevList.filter(emp => emp.id !== id);
    return updatedList;
  });
};

const showEditEmplyeeHandler = (employee) => {
  setEditEmployeeIsShown(true);
  setCurrentEmployee({ id:employee.id, employeeNumber:employee.employeeNumber, firstname:employee.firstname, lastname: employee.lastname, phoneNumber: employee.phoneNumber, email:employee.email });
}

const updateEmployeeHandler = (updateEmp) => {
  setEditEmployeeIsShown(false);
  setEmployeeList(prevList => {
    const updatedList = [...prevList];
    updatedList.map((employee) => ( employee.id === updateEmp.id ? (
      employee.employeeNumber= updateEmp.employeeNumber,
      employee.firstname=updateEmp.name,
      employee.lastname=updateEmp.lastName,
      employee.phoneNumber=updateEmp.phoneNumber,
      employee.email=updateEmp.email ) : employee
    ));  
      return updatedList;
    });
}

  return (
    <>
      <Header onShowAddEmployee={showAddEmployeeHandler}/>
        {employeeAddIsShown && <AddEmplyee 
        onAdd={addEmployeeToList} 
        onClose={hideAddEmployeeHandler}
      />} 

      <EmployeeInformation emplist={employeeList}
        deleteEmp={deleteEmployeeHandler} 
        editEmp={showEditEmplyeeHandler}
      />

       {employeeEditIsShown &&<EditEmployee 
       updateEmp={currentEmployee} 
       updateList={updateEmployeeHandler} 
       onClose={hideEditEmployeeHandler}/> }
    </>
  );
}

export default App;
