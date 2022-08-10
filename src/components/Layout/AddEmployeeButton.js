import classes from '../Layout/AddEmployeeButton.module.css';

const AddEmployeeButton = (props) => {
    return (
        <button className={classes.button} onClick={props.onClick}>Add New</button>
    )
}

export default AddEmployeeButton;