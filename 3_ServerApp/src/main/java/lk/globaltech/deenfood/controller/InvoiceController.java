package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerorderDao;
import lk.globaltech.deenfood.dao.CustomerorderstatusDao;
import lk.globaltech.deenfood.dao.InvoiceDao;
import lk.globaltech.deenfood.dao.InvoiceDao;
import lk.globaltech.deenfood.entity.Customerorderstatus;
import lk.globaltech.deenfood.entity.Invoice;
import lk.globaltech.deenfood.entity.Invoice;
import lk.globaltech.deenfood.entity.Invoicestatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceDao invoiceDao;

    @Autowired
    private CustomerorderstatusDao customerorderstatusDao;

    @Autowired
    private CustomerorderDao customerorderDao;

    @GetMapping(produces = "application/json")
    @PreAuthorize("hasAuthority('invoice-select')")
    public List<Invoice> get(@RequestParam HashMap<String, String> params) {

        List<Invoice> invoices = this.invoiceDao.findAll();

        if(params.isEmpty())  return invoices;
        
        String invoiceNumber= params.get("invoicenumber");
        String invoiceStatus= params.get("invoicestatusid");

        Stream<Invoice> invoiceStream = invoices.stream();
        if(invoiceNumber!=null) invoiceStream = invoiceStream.filter(i -> i.getNumber().contains(invoiceNumber));
        if(invoiceStatus!=null) invoiceStream = invoiceStream.filter(i -> i.getInvoicestatus().getId()==Integer.parseInt(invoiceStatus));
        return invoiceStream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('invoice-insert')")
    public HashMap<String,String> add(@RequestBody Invoice invoice){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(invoiceDao.findByNumber(invoice.getNumber())!=null)
            errors = errors+"<br> Existing Invoice";

        if(errors=="")
            invoiceDao.save(invoice);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(invoice.getId()));
        response.put("url","/invoices/"+invoice.getId());
        response.put("errors",errors);
        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('invoice-update')")
    public HashMap<String,String> update(@RequestBody Invoice invoice){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Invoice ing = invoiceDao.findByNumber(invoice.getNumber());

        if(ing!=null && invoice.getId()!=ing.getId())
            errors = errors+"<br> Existing NUmber";


        if(errors=="") {

            List<Customerorderstatus> customerorderstatuses = customerorderstatusDao.findAll();
            if (invoice.getInvoicestatus().getName().equalsIgnoreCase("paid")) {
                Customerorderstatus closedStatus = customerorderstatuses.stream()
                        .filter(customerorderstatus -> "Closed".equals(customerorderstatus.getName()))
                        .findFirst()
                        .orElse(null);

                if (closedStatus != null) {
                    invoice.getCustomerorder().setCustomerorderstatus(closedStatus);
                    customerorderDao.save(invoice.getCustomerorder());
                }
            }

            invoiceDao.save(invoice);
        }
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(invoice.getId()));
        response.put("url","/invoices/"+invoice.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('invoice-delete')")
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Invoice ing = invoiceDao.findByMyId(id);

        if(ing==null)
            errors = errors+"<br> Invoice Does Not Existed";

        if(errors=="") invoiceDao.delete(ing);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/invoices/"+id);
        response.put("errors",errors);

        return response;
    }

}




