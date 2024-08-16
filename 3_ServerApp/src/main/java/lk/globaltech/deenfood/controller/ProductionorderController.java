package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.IngredientDao;
import lk.globaltech.deenfood.dao.ProductionOrderDao;
import lk.globaltech.deenfood.entity.Grnitem;
import lk.globaltech.deenfood.entity.Ingredient;
import lk.globaltech.deenfood.entity.ProductionOrder;
import lk.globaltech.deenfood.entity.ProductionOrderProduct;
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
@RequestMapping(value = "/productionorders")
public class ProductionorderController {
    @Autowired
    private ProductionOrderDao productionorderDao;

    @Autowired
    private IngredientDao ingredientDao;

//    @GetMapping(path ="/ordernumber", produces = "application/json")
//    public ResponseEntity<Map<String, String>> get() {
//        String number = this.productionorderDao.findMaxNumber();
//        if(number==null)number="0000" ;
//        Map<String, String> response = new HashMap<>();
//        response.put("number", number);
//        return ResponseEntity.ok().body(response);
//    }

    @GetMapping(produces = "application/json")
    public List<ProductionOrder> get(@RequestParam HashMap<String, String> params) {

        String productionorderstatusid = params.get("prodorderstatusid");
        String dorequired = params.get("dorequired");
        String doplaced = params.get("doplaced");

        List<ProductionOrder> productionorders = this.productionorderDao.findAll();

        if (params.isEmpty()) return productionorders;

        Stream<ProductionOrder> postream = productionorders.stream();
        if (productionorderstatusid != null)
            postream = postream.filter(o -> o.getProductionOrderstatus().getId() == Integer.parseInt(productionorderstatusid));
        if (dorequired != null) postream = postream.filter(o -> o.getDorequired().toString().contains(dorequired));
        if (doplaced != null) postream = postream.filter(o -> o.getDoplaced().toString().contains(doplaced));

        return postream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> add(@RequestBody ProductionOrder order) {
        HashMap<String, String> response = new HashMap<>();

        String errors = "";
        for (ProductionOrderProduct po : order.getProductionOrderProducts()) po.setProductionOrder(order);

        //Add this after PRODUCT addition
        if (this.productionorderDao.findByProdOrderNumber(order.getOrderNumber()) != null)
            errors = errors + "<br> Existing Order Number";

        if (errors.isEmpty()) {

            order.getProductionOrderProducts().forEach(productionOrderProduct ->{

                BigDecimal neededAmnt = new BigDecimal(productionOrderProduct.getAmount());

                productionOrderProduct.getProduct().getProductIngredients().forEach(productIngredient -> {
                    BigDecimal neededQty = productIngredient.getQuantityratio();

                     Ingredient ingredient = productIngredient.getIngredient();
                     ingredient.setQoh(productIngredient.getIngredient().getQoh().subtract(neededQty.multiply(neededAmnt)));
                     ingredientDao.save(ingredient);
                });
            });

            productionorderDao.save(order);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        response.put("id", String.valueOf(order.getId()));
        response.put("url", "/productionorders/" + order.getId());
        response.put("errors", errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> update(@RequestBody ProductionOrder order) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        ProductionOrder extPOrder = productionorderDao.findByMyId(order.getId());

        if (extPOrder != null) {

            for (ProductionOrderProduct productionOrderProduct : order.getProductionOrderProducts()) {
                productionOrderProduct.setProductionOrder(order);
            }
            BeanUtils.copyProperties(order, extPOrder, "id", "productionOrderProducts");

            extPOrder.getProductionOrderProducts().forEach(productionOrderProduct ->{

                BigDecimal neededAmnt = new BigDecimal(productionOrderProduct.getAmount());

                productionOrderProduct.getProduct().getProductIngredients().forEach(productIngredient -> {
                    BigDecimal neededQty = productIngredient.getQuantityratio();

                    Ingredient ingredient = productIngredient.getIngredient();
                    ingredient.setQoh(productIngredient.getIngredient().getQoh().subtract(neededQty.multiply(neededAmnt)));
                    ingredientDao.save(ingredient);
                });
            });

            productionorderDao.save(extPOrder);
        } else {
            errors = errors + "<br> Production Order Does Not Exist";
        }

        response.put("id", String.valueOf(order.getId()));
        response.put("url", "/productionorders/" + order.getId());
        response.put("errors", errors);

        return response;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> delete(@PathVariable Integer id) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        ProductionOrder ord = productionorderDao.findByMyId(id);

        if (ord == null) errors = errors + "<br> Production Order Does Not Exists";
        if (errors == "") productionorderDao.delete(ord);
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("code", String.valueOf(id));
        response.put("url", "/id/" + id);
        response.put("errors", errors);

        return response;
    }

}


