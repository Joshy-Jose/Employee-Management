
import classes from './EmployeeInformation.module.css';
import Card from '../UI/Card';
import Employee from './Employee';

const EmployeeInformation = (props) => {
let arrayLength = 0;
arrayLength = props.emplist.length;

  const employeeInformation = props.emplist.map((employee) =>(
    <Employee
    key={employee.id}
    id = {employee.id}
    employeeNumber = {employee.employeeNumber}
    email={employee.email}
    editEmp={props.editEmp}
    deleteEmp={props.deleteEmp}
    firstname={employee.firstname}
    lastname={employee.lastname}
    phoneNumber={employee.phoneNumber}
    />
));

  return <section className={classes.employee}>
   
    <Card>
      <ul>
          {arrayLength >= 0 && employeeInformation}
          {arrayLength <= 0 && <p>No record found</p>}
      </ul>
    </Card>
   
  </section>
}

export default EmployeeInformation;
