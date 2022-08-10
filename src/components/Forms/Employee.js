import React, { useState } from "react";

import Modal from "../UI/Modal";
import classes from './Employee.module.css';

const Employee = (props) => {

    const fullName = `${props.firstname} ${props.lastname}`;
    const latname = props.lastname;
    const employeeBadge = (latname.charAt(0));

    const [isDeleteEmployee,setDeleteEmployee] = useState(false);

    const deleteHandler = () => {

        setDeleteEmployee(true);
    }

    const deleteEmployee = () => {
        props.deleteEmp(props.id);
    }
    const editHandler = () => {
        props.editEmp(props);
    }
    const cancelDeletionHandler = () => {
        setDeleteEmployee(false);
    }

    return (
        <li>
            {isDeleteEmployee && <Modal>
            <p>Do you want to delete Employee?</p>
            <div 
                className={classes.actions}>
               <button className={classes.close} type='button' onClick={cancelDeletionHandler}>
                No
               </button>
               <button className={classes.close} onClick={deleteEmployee}>Yes</button>
            </div>
            </Modal>}
            <div>
                <div className={classes.badge}><b>{employeeBadge}</b></div>
                <div>{props.employeeNumber}</div>
                <div>{fullName}</div>
                <div>{props.email}</div>
                <div>{props.phoneNumber}</div>
                <div className={classes.actions}>
                <button className={classes.button} onClick={deleteHandler}>Delete</button>
                <button className={classes.button} onClick={editHandler}>Edit</button>
                </div>
            </div>
        </li>
    )
}  

export default Employee;