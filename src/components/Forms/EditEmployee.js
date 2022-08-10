import React, {useState,useRef,useEffect} from 'react';

import {isEmpty, isPhoneNumber, isEmail} from './Helpers';
import Modal from '../UI/Modal';
import classes from './AddEmployee.module.css';
import classNames from 'classnames';

const EditEmployee = (props) => {

  const [formInputsValidity, setformInputsValidity] = useState({
    name:true,
    lastName:true,
    email:true,
    employeeNumber: true,
    phoneNumber: true
});

const employeeNumberInputRef = useRef();
const nameInputRef = useRef();
const lastNameInputRef = useRef();
const emailInputRef = useRef();
const phoneNumberInputRef = useRef();

const [employee, updateEmployee] = useState(props.updateEmp);

useEffect(() => {
        updateEmployee(props)
},[props]
)

   const updateHandler = (event) => {
    event.preventDefault();

    const enteredEmpNumberIsValid = !isEmpty(employeeNumberInputRef.current.value);
    const enteredNameIsValid = !isEmpty(nameInputRef.current.value);
    const enteredLastNameIsValid = !isEmpty(lastNameInputRef.current.value);
    const enteredEmailIsValid = isEmail(emailInputRef.current.value);
    const enteredPhoneNumberIsValid = !isPhoneNumber(phoneNumberInputRef.current.value);

    setformInputsValidity({
      employeeNumber:enteredEmpNumberIsValid,
        name:enteredNameIsValid,
        lastName:enteredLastNameIsValid,
        email:enteredEmailIsValid,
        phoneNumber:enteredPhoneNumberIsValid
    
    });

    const formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredPhoneNumberIsValid 
    && enteredEmpNumberIsValid && enteredLastNameIsValid;

    if(!formIsValid) {
        return;
    }

    props.updateList({
        id:props.updateEmp.id,
        employeeNumber:employeeNumberInputRef.current.value,
        name:nameInputRef.current.value,
        lastName:lastNameInputRef.current.value,
        email:emailInputRef.current.value,
        phoneNumber:phoneNumberInputRef.current.value
    });

  };

  const employeeNumberControlClasses = classNames(
    classes.control,formInputsValidity.employeeNumber ? '': classes.invalid
  )
  const nameControlClasses = classNames(
    classes.control,formInputsValidity.name ? '': classes.invalid
  )
  const lastNameControlClasses = classNames(
    classes.control,formInputsValidity.lastName ? '': classes.invalid
  )
  const emailControlClasses = classNames(
    classes.control,formInputsValidity.email ? '': classes.invalid
  )
  const phoneNumberControlClasses = classNames(
    classes.control,formInputsValidity.phoneNumber ? '': classes.invalid
  )

  return(
  < Modal>
    <form onSubmit={updateHandler}>
    <div className={employeeNumberControlClasses}>
        <label htmlFor='employeeNumber'>Employee Number</label>
        <input type='text' id='employeeNumber' defaultValue={employee.employeeNumber} ref={employeeNumberInputRef} />
        {!formInputsValidity.employeeNumber && <p>Please enter a valid employee Number</p>}
      </div>
      <div className={nameControlClasses}>
        <label htmlFor='name'>First Name</label>
        <input type='text' id='name' defaultValue={employee.firstname}  ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid first name</p>}
      </div>
      <div className={lastNameControlClasses}>
        <label htmlFor='lname'>Last Name</label>
        <input type='text' id='lname' defaultValue={employee.lastname}   ref={lastNameInputRef} />
        {!formInputsValidity.lastName && <p>Please enter a valid last name</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' defaultValue={employee.email}  ref={emailInputRef} />
        {!formInputsValidity.email && <p>Please enter a valid email</p>}
      </div>
      <div className={phoneNumberControlClasses}>
        <label htmlFor='phone'>Phone Number</label>
        <input type='text' id='phone' defaultValue={employee.phoneNumber}  ref={phoneNumberInputRef}  />
        {!formInputsValidity.phoneNumber && <p>Please enter a valid phone number</p>}
      </div>
      <div >
      <div className={classes.actions}>
        <button type='button' className={classes.button}onClick={props.onClose} >
          Cancel
        </button>
        <button>Update</button>
        </div>
      </div>
    </form>
        </Modal>
    )
}

export default EditEmployee;