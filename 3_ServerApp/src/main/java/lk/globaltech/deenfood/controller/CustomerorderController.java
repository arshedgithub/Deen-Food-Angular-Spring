package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerorderDao;
import lk.globaltech.deenfood.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/customerorders")
public class CustomerorderController {

    @Autowired
    private CustomerorderDao customerorderDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Customerorder> get(@RequestParam HashMap<String, String> params) {

        List<Customerorder> customerorders = this.customerorderDao.findAll();
        if(params.isEmpty()) return customerorders;

        String statusid = params.get("custstatusid");
        String customerid = params.get("customerid");
        String doplaced = params.get("doplaced");
        String doexpect = params.get("doexpected");

        Stream<Customerorder> cstream = customerorders.stream();
        if(customerid!=null) cstream = cstream.filter(e -> e.getCustomer().getId()==Integer.parseInt(customerid));
        if(statusid!=null) cstream = cstream.filter(e -> e.getCustomerorderstatus().getId()==Integer.parseInt(statusid));
        if (doexpect != null) cstream = cstream.filter(o -> o.getDoexpected().toString().contains(doexpect));
        if (doplaced != null) cstream = cstream.filter(o -> o.getDoplaced().toString().contains(doplaced));
        return cstream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Customer-Insert')")
    public HashMap<String,String> add(@RequestBody Customerorder customerorder){

        HashMap<String,String> response = new HashMap<>();
        String errors = "";
        for (Orderproduct orderProduct : customerorder.getOrderproducts()) orderProduct.setCustomerorder(customerorder);

        //Add this after PRODUCT addition
        if (this.customerorderDao.findByNumber(customerorder.getNumber()) != null)
            errors = errors + "<br> Existing Order Number";

        if (errors.isEmpty()) {
            customerorderDao.save(customerorder);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        response.put("id",String.valueOf(customerorder.getId()));
        response.put("url","/customerorders/"+customerorder.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Customer-Update')")
    public HashMap<String,String> update(@RequestBody Customerorder customerorder){

        HashMap<String,String> response = new HashMap<>();
        String errors="";
        Customerorder emp1 = customerorderDao.findByNumber(customerorder.getNumber());
        if(emp1!=null && customerorder.getId()!=emp1.getId())
            errors = errors+"<br> Existing Customer Order Registration Number";

        if(errors=="") customerorderDao.save(customerorder);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(customerorder.getId()));
        response.put("url","/customerorders/"+customerorder.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Customerorder customerorder = customerorderDao.findByMyId(id);

        if(customerorder==null) errors = errors+"<br> Customer Order Does Not Existed";
        if(errors=="") customerorderDao.delete(customerorder);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/customerorders/"+id);
        response.put("errors",errors);

        return response;
    }

}




