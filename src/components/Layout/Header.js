import { Fragment } from "react";
import classes from './Header.module.css';
import AddEmployeeButton from '../Layout/AddEmployeeButton';

const Header = (props) => {
   return <Fragment>
       <header className={classes.header}>
           <h1>Employee Details</h1>
           <AddEmployeeButton onClick={props.onShowAddEmployee}/>
       </header>
   </Fragment>
}

export default Header;