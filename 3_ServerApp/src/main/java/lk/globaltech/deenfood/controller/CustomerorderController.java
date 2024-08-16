package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerorderDao;
import lk.globaltech.deenfood.dao.ProductDao;
import lk.globaltech.deenfood.entity.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    @Autowired
    private ProductDao productDao;

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
    public HashMap<String, String> add(@RequestBody Customerorder customerorder) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        for (Orderproduct orderProduct : customerorder.getOrderproducts()) {
            orderProduct.setCustomerorder(customerorder);

            Product product = productDao.findById(orderProduct.getProduct().getId()).orElse(null);

            if (product == null) {
                errors += "<br> Product with ID " + orderProduct.getProduct().getId() + " not found.";
            } else {
                BigDecimal newQuantity = product.getQuantity().subtract(BigDecimal.valueOf(orderProduct.getAmount()));

                if (newQuantity.compareTo(BigDecimal.ZERO) < 0) {
                    errors += "<br> Not enough stock for product ID " + product.getId() + ".";
                } else {
                    product.setQuantity(newQuantity);
                    productDao.save(product);
                }
            }
        }

        // Check if the order number already exists
        if (this.customerorderDao.findByNumber(customerorder.getNumber()) != null) {
            errors += "<br> Existing Order Number";
        }

        if (errors.isEmpty()) {
            customerorderDao.save(customerorder);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        response.put("id", String.valueOf(customerorder.getId()));
        response.put("url", "/customerorders/" + customerorder.getId());
        response.put("errors", errors);

        return response;
    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Customer-Update')")
    public HashMap<String,String> update(@RequestBody Customerorder customerorder){

        HashMap<String,String> response = new HashMap<>();
        String errors="";
        Customerorder extCusOrd = customerorderDao.findByNumber(customerorder.getNumber());
        if(extCusOrd!=null && customerorder.getId()!=extCusOrd.getId())
            errors = errors+"<br> Existing Customer Order Registration Number";

        if(errors=="") {

            for (Orderproduct orderproduct : customerorder.getOrderproducts()) {
                orderproduct.setCustomerorder(customerorder);
            }
            BeanUtils.copyProperties(customerorder, extCusOrd, "id", "orderproducts");

            extCusOrd.getOrderproducts().forEach(orderproduct -> {
                Product product = orderproduct.getProduct();
                BigDecimal extAmnt = BigDecimal.valueOf(orderproduct.getAmount());
                customerorder.getOrderproducts().forEach(orderproduct1 -> {
                    BigDecimal amnt = BigDecimal.valueOf(orderproduct1.getAmount());
                    BigDecimal valueneedtoupdate = amnt.subtract(extAmnt);
                    product.setQuantity(product.getQuantity().subtract(valueneedtoupdate));
                });

                productDao.save(product);
            });

            customerorderDao.save(customerorder);
        }
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




