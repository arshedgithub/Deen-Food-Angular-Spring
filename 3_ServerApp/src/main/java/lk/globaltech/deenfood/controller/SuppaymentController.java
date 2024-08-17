package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.SuppaymentDao;
import lk.globaltech.deenfood.entity.Suppayment;
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
@RequestMapping(value = "/suppayments")
public class SuppaymentController {

    @Autowired
    private SuppaymentDao suppaymentDao;
    @GetMapping(produces = "application/json")
    @PreAuthorize("hasAuthority('supplier payment-select')")
    public List<Suppayment> get(@RequestParam HashMap<String,String> params) {

        List<Suppayment> suppayments = this.suppaymentDao.findAll();
        return suppayments;
//        if(params.isEmpty()) return suppayments;

//        String suppaymentstatusid = params.get("suppaymentstatusid");
//        String custpaymenttypeid = params.get("custpaymenttypeid");
//
//        Stream<Suppayment> custStream = suppayments.stream();
//        if(suppaymentstatusid!=null) custStream = custStream.filter(i -> i.getPaystatus().getId()==Integer.parseInt(suppaymentstatusid));
//        if(custpaymenttypeid!=null) custStream = custStream.filter(i -> i.getPaytype().getId()==Integer.parseInt(custpaymenttypeid));
//        return custStream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('supplier payment-insert')")
    public HashMap<String,String> add(@RequestBody Suppayment custpayment){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Suppayment existingProduct = suppaymentDao.findByMyId(custpayment.getId());
        if(existingProduct!=null && custpayment.getId()!=existingProduct.getId())
            errors = errors+"<br>Purchase Order Not Found";

        if(errors=="") suppaymentDao.save(custpayment);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(custpayment.getId()));
        response.put("url","/suppayments/"+custpayment.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('supplier payment-update')")
    public HashMap<String,String> update(@RequestBody Suppayment suppayment) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Suppayment itm = suppaymentDao.findByMyId(suppayment.getId());
        if (itm != null && suppayment.getId() != itm.getId())
            errors = errors + "<br> Existing Number";
        
        if (errors == "") suppaymentDao.save(suppayment);
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("id", String.valueOf(suppayment.getId()));
        response.put("url", "/suppayments/" + suppayment.getId());
        response.put("errors", errors);
        return response;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('supplier payment-delete')")
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Suppayment prod = suppaymentDao.findByMyId(id);
        if(prod==null) errors = errors+"<br> Employee Does Not Existed";

        if(errors=="") suppaymentDao.delete(prod);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/suppayments/"+id);
        response.put("errors",errors);
        return response;
    }
}


