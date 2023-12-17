import axios from "axios";

export class EmployeeService{

  /*   getAllEmployee(){
        return axios.get("https://localhost:7027/EmployeeList/GetEmployeeList").then(function (response){
            console.log(response);
        });
    } */
    
    
    getAllEmployee(){
        
        return axios.get("");
    }
    
    getEmployeeById(id){
        return axios.get("" + id);
    }
}
