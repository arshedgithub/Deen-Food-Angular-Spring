package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.PurchaseOrderDao;
import lk.globaltech.deenfood.entity.Poitem;
import lk.globaltech.deenfood.entity.Purchaseorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
    @RequestMapping(value = "/purchaseorders")
public class PurchaseorderController {

    @Autowired
    private PurchaseOrderDao purchaseOrderDao;
    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Purchaseorder> get(@RequestParam HashMap<String,String> params) {

        List<Purchaseorder> purorders = this.purchaseOrderDao.findAll();

        if(params.isEmpty()) return purorders;

        String id= params.get("id");
        String ponumber = params.get("ponumber");
        String date= params.get("date");
        String postatusid= params.get("postatusid");

        Stream<Purchaseorder> purstream = purorders.stream();

        if(ponumber!=null) purstream = purstream.filter( i -> i.getNumber().contains(ponumber));
        if(id!=null) purstream = purstream.filter(i -> i.getId()==Integer.parseInt(id));
        if(date!=null) purstream = purstream.filter(i -> i.getDoplaced().equals(date));
        if (postatusid != null) purstream = purstream.filter(i -> i.getPostatus().getId()==Integer.parseInt(postatusid));

        return purstream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Purchaseorder purorder){
        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Purchaseorder grn1 = purchaseOrderDao.findByMyId(purorder.getId());
//        System.out.println("Id" + grn1.getId());
        if(grn1!=null && purorder.getId()!=grn1.getId())
            errors = errors+"<br>Purchase Order Not Found";

        System.out.println(grn1);
        for (Poitem poitem : purorder.getPoitems()) {
            poitem.setPurchaseorder(purorder);
            System.out.println(poitem.getIngredient().getName() + " $ " + poitem.getExpectedLinecost() + " $ "  + poitem.getQuantity());
        }

        if(errors=="") purchaseOrderDao.save(purorder);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(purorder.getId()));
        response.put("url","/purchaseorders/"+purorder.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Purchaseorder purorder) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Purchaseorder itm = purchaseOrderDao.findByMyId(purorder.getId());
        if (itm != null && purorder.getId() != itm.getId())
            errors = errors + "<br> Existing Number";

        for (Poitem poItems : purorder.getPoitems()) {
            poItems.setPurchaseorder(purorder);
            System.out.println(poItems);
            System.out.println(purorder);
        }

        if (errors == "") purchaseOrderDao.save(purorder);
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("id", String.valueOf(purorder.getId()));
        response.put("url", "/purchaseorders/" + purorder.getId());
        response.put("errors", errors);

        return response;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Purchaseorder itm = purchaseOrderDao.findByMyId(id);

        if(itm==null)
            errors = errors+"<br> Employee Does Not Existed";

        if(errors=="") purchaseOrderDao.delete(itm);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/purchaseorders/"+id);
        response.put("errors",errors);

        return response;
    }
}


