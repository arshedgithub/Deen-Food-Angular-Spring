package lk.globaltech.deenfood.controller;
import lk.globaltech.deenfood.dao.EmployeeDao;
import lk.globaltech.deenfood.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.stream.Collectors;

import java.util.List;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {

    @Autowired
    private EmployeeDao employeedao;

    @GetMapping(produces = "application/json")
    @PreAuthorize("hasAuthority('employee-select')")
    public List<Employee> get(@RequestParam HashMap<String, String> params) {

        List<Employee> employees = this.employeedao.findAll();

        if(params.isEmpty())  return employees;

        String number = params.get("number");
        String genderid= params.get("genderid");
        String fullname= params.get("fullname");
        String designationid= params.get("designationid");
        String nic= params.get("nic");

        Stream<Employee> estream = employees.stream();

        if(designationid!=null) estream = estream.filter(e -> e.getDesignation().getId()==Integer.parseInt(designationid));
        if(genderid!=null) estream = estream.filter(e -> e.getGender().getId()==Integer.parseInt(genderid));
        if(number!=null) estream = estream.filter(e -> e.getNumber().equals(number));
        if(nic!=null) estream = estream.filter(e -> e.getNic().contains(nic));
        if(fullname!=null) estream = estream.filter(e -> e.getFullname().contains(fullname));

        return estream.collect(Collectors.toList());

    }

    @GetMapping(path ="/list",produces = "application/json")
    public List<Employee> get() {

        List<Employee> employees = this.employeedao.findAllNameId();

        employees = employees.stream().map(
                employee -> {
                    Employee e = new Employee(employee.getId(), employee.getCallingname());
                    return  e;
                }
        ).collect(Collectors.toList());

        return employees;

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('employee-insert')")
    public HashMap<String,String> add(@RequestBody Employee employee){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(employeedao.findByNumber(employee.getNumber())!=null)
            errors = errors+"<br> Existing Number";
        if(employeedao.findByNic(employee.getNic())!=null)
            errors = errors+"<br> Existing NIC";

        if(errors=="")
        employeedao.save(employee);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(employee.getId()));
        response.put("url","/employees/"+employee.getId());
        response.put("errors",errors);
        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('employee-update')")
    public HashMap<String,String> update(@RequestBody Employee employee){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Employee emp1 = employeedao.findByNumber(employee.getNumber());
        Employee emp2 = employeedao.findByNic(employee.getNic());

        if(emp1!=null && employee.getId()!=emp1.getId())
            errors = errors+"<br> Existing Number";
        if(emp2!=null && employee.getId()!=emp2.getId())
            errors = errors+"<br> Existing NIC";

        if(errors=="") employeedao.save(employee);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(employee.getId()));
        response.put("url","/employees/"+employee.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('employee-update')")
    public HashMap<String,String> delete(@PathVariable Integer id){

            HashMap<String,String> response = new HashMap<>();
        String errors="";

        Employee emp1 = employeedao.findByMyId(id);

        if(emp1==null)
            errors = errors+"<br>Employee Does Not Existed";

        if(errors=="") employeedao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/employees/"+id);
        response.put("errors",errors);

        return response;
    }

}




