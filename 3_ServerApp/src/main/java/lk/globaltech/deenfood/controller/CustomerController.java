package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerDao;
import lk.globaltech.deenfood.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/customers")
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Customer> get(@RequestParam HashMap<String, String> params) {

        List<Customer> customers = this.customerDao.findAll();
        if(params.isEmpty()) return customers;

        String genderid = params.get("genderid");
        String statusid = params.get("custstatusid");

        Stream<Customer> estream = customers.stream();

        if(genderid!=null) estream = estream.filter(e -> e.getGender().getId()==Integer.parseInt(genderid));
        if(statusid!=null) estream = estream.filter(e -> e.getCustomerstatus().getId()==Integer.parseInt(statusid));
        return estream.collect(Collectors.toList());

    }

//    @GetMapping(path ="/list",produces = "application/json")
//    public List<Customer> get() {
//
//        List<Customer> customers = this.customerDao.findAllNameId();
//
//        customers = customers.stream().map(
//                customer -> {
//                    Customer e = new Customer(customer.getId(), customer.getCustomername());
//                    return e;
//                }
//        ).collect(Collectors.toList());
//        return customers;
//    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Customer-Insert')")
    public HashMap<String,String> add(@RequestBody Customer customer){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(customerDao.findByCustomernumber(customer.getCustomernumber())!=null)
            errors = errors+"<br> Existing Number";

        if(errors=="")
        customerDao.save(customer);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(customer.getId()));
        response.put("url","/customers/"+customer.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Customer-Update')")
    public HashMap<String,String> update(@RequestBody Customer customer){

        HashMap<String,String> response = new HashMap<>();
        String errors="";
        Customer emp1 = customerDao.findByCustomernumber(customer.getCustomernumber());
        if(emp1!=null && customer.getId()!=emp1.getId())
            errors = errors+"<br> Existing Customer Registration Number";

        if(errors=="") customerDao.save(customer);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(customer.getId()));
        response.put("url","/customers/"+customer.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Customer emp1 = customerDao.findByMyId(id);
        System.out.println(emp1.getCallingname());

        if(emp1==null) errors = errors+"<br> Customer Does Not Existed";
        if(errors=="") customerDao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/customers/"+id);
        response.put("errors",errors);

        return response;
    }

}




