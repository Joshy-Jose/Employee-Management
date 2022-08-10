import React,{useRef, useState} from 'react';

import {isEmpty, isPhoneNumber, isEmail} from './Helpers';
import classes from './AddEmployee.module.css';
import Modal from '../UI/Modal';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const AddEmplyee = (props) => {

    const [isSubmitingModalContent,setIsSubmitingModalContent] = useState(false);
    const [submitFormStatus,setSubmitFormStatus] = useState(true);
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

    const confirmHandler = (event) => {
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

    props.onAdd({
      employeeNumber:employeeNumberInputRef.current.value,
        name:nameInputRef.current.value,
        lastName:lastNameInputRef.current.value,
        email:emailInputRef.current.value,
        phoneNumber:phoneNumberInputRef.current.value,
        id:uuidv4(),
    });
    setSubmitFormStatus(false);
    setIsSubmitingModalContent(true);          
  };

  const didSubmitingModalContent = (
  <>
      <p> Added Employee Successfully..!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </> );

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

const submitForm = (

    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={employeeNumberControlClasses}>
        <label htmlFor='employeeNumber'>Employee Number</label>
        <input type='text' id='employeeNumber' ref={employeeNumberInputRef} />
        {!formInputsValidity.employeeNumber && <p>Please enter a valid employee Number</p>}
      </div>
      <div className={nameControlClasses}>
        <label htmlFor='name'>First Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid first name</p>}
      </div>
      <div className={lastNameControlClasses}>
        <label htmlFor='lname'>Last Name</label>
        <input type='text' id='lname' ref={lastNameInputRef} />
        {!formInputsValidity.lastName && <p>Please enter a valid last name</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' ref={emailInputRef} />
        {!formInputsValidity.email && <p>Please enter a valid email</p>}
      </div>
      <div className={phoneNumberControlClasses}>
        <label htmlFor='phone'>Phone Number</label>
        <input type='text' id='phone'ref={phoneNumberInputRef}  />
        {!formInputsValidity.phoneNumber && <p>Phone number should be 10 digit</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.close} type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Add</button>
      </div>
    </form>
);
  
  return (
   < Modal onClose={props.onClose}>
      {submitFormStatus && submitForm}
     {isSubmitingModalContent && didSubmitingModalContent} 
    </Modal>
  );
};

export default AddEmplyee;