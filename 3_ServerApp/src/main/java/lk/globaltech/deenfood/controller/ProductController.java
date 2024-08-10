package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.ProductDao;
import lk.globaltech.deenfood.dao.PurchaseOrderDao;
import lk.globaltech.deenfood.entity.Poitem;
import lk.globaltech.deenfood.entity.Product;
import lk.globaltech.deenfood.entity.ProductIngredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
    @RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductDao productDao;
    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Product> get(@RequestParam HashMap<String,String> params) {

        List<Product> products = this.productDao.findAll();

        if(params.isEmpty()) return products;

        String id = params.get("id");
        String productStatusId = params.get("prodstatusid");

        Stream<Product> purstream = products.stream();
        if(id!=null) purstream = purstream.filter(i -> i.getId()==Integer.parseInt(id));
        if(productStatusId!=null) purstream = purstream.filter(i -> i.getProductStatus().getId()==Integer.parseInt(productStatusId));
        return purstream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Product product){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Product existingProduct = productDao.findByMyId(product.getId());
        if(existingProduct!=null && product.getId()!=existingProduct.getId())
            errors = errors+"<br>Purchase Order Not Found";

        for (ProductIngredient prodIng : product.getProductIngredients()) {
            prodIng.setProduct(product);
        }

        if(errors=="") productDao.save(product);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(product.getId()));
        response.put("url","/purchaseorders/"+product.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Product product) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Product itm = productDao.findByMyId(product.getId());
        if (itm != null && product.getId() != itm.getId())
            errors = errors + "<br> Existing Number";

        for (ProductIngredient prodIng : product.getProductIngredients()) {
            prodIng.setProduct(product);
        }

        if (errors == "") productDao.save(product);
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("id", String.valueOf(product.getId()));
        response.put("url", "/purchaseorders/" + product.getId());
        response.put("errors", errors);
        return response;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Product prod = productDao.findByMyId(id);
        if(prod==null) errors = errors+"<br> Employee Does Not Existed";

        if(errors=="") productDao.delete(prod);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/purchaseorders/"+id);
        response.put("errors",errors);
        return response;
    }
}


