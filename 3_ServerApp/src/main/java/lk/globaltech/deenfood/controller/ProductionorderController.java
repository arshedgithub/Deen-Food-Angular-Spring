package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.ProductionOrderDao;
import lk.globaltech.deenfood.entity.ProductionOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/productionorders")
public class ProductionorderController {
    @Autowired
    private ProductionOrderDao ProductionOrderDao;

    @GetMapping(produces = "application/json")
//  @PreAuthorize("hasAuthority('employee-select')")
    public List<ProductionOrder> get(@RequestParam HashMap<String, String> params) //Searching by entering strings --> Words = params
    {
        List<ProductionOrder> prodorders = this.ProductionOrderDao.findAll();

        if (params.isEmpty()) return prodorders; // if search word is empty --> return the full Suppliers List

        //Define all searching categories in the UI for the Supplier Module, and map them to the entities in the DB

        String orderno = params.get("orderno");
        String prodstyleid = params.get("styleid");
        String orderstatusid = params.get("orderstatusid");

        // Stream the Suppliers list
        Stream<ProductionOrder> prodorderStream = prodorders.stream();

        //if there's a search from Suppliername, filter each object in the stream(s->s) to find the ones which "contains" that name
        if (orderno != null) prodorderStream = prodorderStream.filter(o -> o.getOrderNumber().contains(orderno));

        //if there's a search from Supplierstatusid, convert that string input to an integer and filter each object in the stream(s->s) to find the ones which are equal to that id
        if (orderstatusid != null)
            prodorderStream = prodorderStream.filter(o -> o.getProductionOrderstatus().getId() == Integer.parseInt(orderstatusid));
        if (prodstyleid != null)
            prodorderStream = prodorderStream.filter(o -> o.getProductionOrderstatus().getId() == Integer.parseInt(prodstyleid));

        return prodorderStream.collect(Collectors.toList());
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Employee-Insert')")
    //embed the msg in the body to PUT command
    public HashMap<String, String> add(@RequestBody ProductionOrder prodorder) {

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";//For any Errors, reserving an empty variable

        if (ProductionOrderDao.findByProdNumber(prodorder.getOrderNumber()) != null)//findBySid is a custom method defined by me. write the relevant query in Supplierdao class.
            errors = errors + "<br> Existing Order Number";// Assigning an error for pre-defined empty Error variable


        if (errors == "") //if there are no errors up to now, it's a new Supplier

            ProductionOrderDao.save(prodorder);// save the New Supplier details in DB

        else errors = "Server Validation Errors : " + errors;

        responce.put("id", String.valueOf(prodorder.getId()));
        responce.put("url", "/orders/" + prodorder.getId());
        responce.put("errors", errors);

        return responce;

    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String, String> update(@RequestBody ProductionOrder prodorder) {

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";

        ProductionOrder order1 = ProductionOrderDao.findByProdNumber(prodorder.getOrderNumber());

        if (order1 != null && prodorder.getOrderNumber() != order1.getOrderNumber())
            errors = errors + "<br> Existing Order Number";

        if (errors == "") ProductionOrderDao.save(prodorder);
        else errors = "Server Validation Errors : <br> " + errors;

        responce.put("id", String.valueOf(prodorder.getId()));
        responce.put("url", "/suppliers/" + prodorder.getId());
        responce.put("errors", errors);

        return responce;
    }

    //
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> delete(@PathVariable Integer id) {

        System.out.println(id);

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";

        ProductionOrder order1 = ProductionOrderDao.findByMyId(id);

        if (order1 == null)
            errors = errors + "<br> Order Does Not Exists";

        if (errors == "") ProductionOrderDao.delete(order1);
        else errors = "Server Validation Errors : <br> " + errors;

        responce.put("id", String.valueOf(id));
        responce.put("url", "/orders/" + id);
        responce.put("errors", errors);

        return responce;
    }
}


