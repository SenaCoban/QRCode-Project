import axios from "axios";

export class EmployeeService{

  /*   getAllEmployee(){
        return axios.get("https://localhost:7027/EmployeeList/GetEmployeeList").then(function (response){
            console.log(response);
        });
    } */
    
    
    getAllEmployee(){
        
        return axios.get("http://qrcode.karel.com.tr:5006/api/Employee/GetEmployeeList");
    }
    
    getEmployeeById(id){
        return axios.get("http://qrcode.karel.com.tr:5006/api/Employee/" + id);
    }
}
