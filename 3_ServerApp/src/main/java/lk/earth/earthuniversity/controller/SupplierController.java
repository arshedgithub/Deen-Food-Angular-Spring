package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EmployeeDao;
import lk.earth.earthuniversity.dao.SupplierDao;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/suppliers")
public class SupplierController {

    @Autowired
    private SupplierDao supplierDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Supplier> get(@RequestParam HashMap<String, String> params) {

        List<Supplier> suppliers = this.supplierDao.findAll();

        if(params.isEmpty())  return suppliers;

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

        List<Employee> employees = this.supplierDao.findAllNameId();

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
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Supplier supplier){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(supplierDao.findByRegno(supplier.getRegno())!=null)
            errors = errors+"<br> Existing Number";

        System.out.println(employee.getDoassignment());

        if(errors=="")
        supplierDao.save(supplier);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(employee.getId()));
        response.put("url","/suppliers/"+employee.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Employee employee){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Employee emp1 = supplierDao.findByNumber(employee.getNumber());
        Employee emp2 = supplierDao.findByNic(employee.getNic());

        if(emp1!=null && employee.getId()!=emp1.getId())
            errors = errors+"<br> Existing Number";
        if(emp2!=null && employee.getId()!=emp2.getId())
            errors = errors+"<br> Existing NIC";

        if(errors=="") supplierDao.save(employee);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(employee.getId()));
        response.put("url","/employees/"+employee.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Employee emp1 = supplierDao.findByMyId(id);

        if(emp1==null)
            errors = errors+"<br> Employee Does Not Existed";

        if(errors=="") supplierDao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/employees/"+id);
        response.put("errors",errors);

        return response;
    }

}




