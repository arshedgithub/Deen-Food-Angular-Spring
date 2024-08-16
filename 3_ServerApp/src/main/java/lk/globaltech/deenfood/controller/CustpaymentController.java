package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustpaymentDao;
import lk.globaltech.deenfood.dao.InvoiceDao;
import lk.globaltech.deenfood.dao.InvoicestatusDao;
import lk.globaltech.deenfood.entity.Cuspayment;
import lk.globaltech.deenfood.entity.Invoicestatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/custpayments")
public class CustpaymentController {

    @Autowired
    private CustpaymentDao custpaymentDao;

    @Autowired
    private InvoicestatusDao invoicestatusDao;

    @Autowired
    private InvoiceDao invoiceDao;
    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Cuspayment> get(@RequestParam HashMap<String,String> params) {

        List<Cuspayment> custpayments = this.custpaymentDao.findAll();
        if(params.isEmpty()) return custpayments;

        String custpaymentstatusid = params.get("custpaymentstatusid");
        String custpaymenttypeid = params.get("custpaymenttypeid");
        String customerid = params.get("customerid");

        Stream<Cuspayment> custStream = custpayments.stream();
        if(custpaymentstatusid!=null) custStream = custStream.filter(i -> i.getPaystatus().getId()==Integer.parseInt(custpaymentstatusid));
        if(custpaymenttypeid!=null) custStream = custStream.filter(i -> i.getPaytype().getId()==Integer.parseInt(custpaymenttypeid));
        if(customerid!=null) custStream = custStream.filter(i -> i.getCustomer().getId()==Integer.parseInt(customerid));
        return custStream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Cuspayment custpayment){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Cuspayment existingProduct = custpaymentDao.findByMyId(custpayment.getId());
        if(existingProduct!=null && custpayment.getId()!=existingProduct.getId())
            errors = errors+"<br>Purchase Order Not Found";

        if(errors=="") {

//            List<Invoicestatus> invoicestatuses = invoicestatusDao.findAll();
//
//            if (custpayment.getPaystatus().getName().equalsIgnoreCase("paid")){
//                Invoicestatus paidStatus = invoicestatuses.stream()
//                        .filter(invoicestatus -> "Paid".equals(invoicestatus.getName()))
//                        .findFirst()
//                        .orElse(null);
//                custpayment.getInvoice().setInvoicestatus(paidStatus);
//            }
            custpaymentDao.save(custpayment);
        }
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(custpayment.getId()));
        response.put("url","/custpayments/"+custpayment.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Cuspayment cuspayment) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Cuspayment itm = custpaymentDao.findByMyId(cuspayment.getId());
        if (itm != null && cuspayment.getId() != itm.getId())
            errors = errors + "<br> Existing Number";
        
        if (errors == "") {
            List<Invoicestatus> invoicestatuses = invoicestatusDao.findAll();

            if (cuspayment.getPaystatus().getName().equalsIgnoreCase("paid")) {
                Invoicestatus paidStatus = invoicestatuses.stream()
                        .filter(invoicestatus -> "Paid".equals(invoicestatus.getName()))
                        .findFirst()
                        .orElse(null);

                if (paidStatus != null) {
                    cuspayment.getInvoice().setInvoicestatus(paidStatus);

                    invoiceDao.save(cuspayment.getInvoice());
                }
            }

            custpaymentDao.save(cuspayment);

        }
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("id", String.valueOf(cuspayment.getId()));
        response.put("url", "/custpayments/" + cuspayment.getId());
        response.put("errors", errors);
        return response;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Cuspayment prod = custpaymentDao.findByMyId(id);
        if(prod==null) errors = errors+"<br> Employee Does Not Existed";

        if(errors=="") custpaymentDao.delete(prod);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/custpayments/"+id);
        response.put("errors",errors);
        return response;
    }
}


