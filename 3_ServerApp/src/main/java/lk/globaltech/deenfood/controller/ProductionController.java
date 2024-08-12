package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.ProductDao;
import lk.globaltech.deenfood.dao.ProductionDao;
import lk.globaltech.deenfood.entity.Product;
import lk.globaltech.deenfood.entity.ProductIngredient;
import lk.globaltech.deenfood.entity.Production;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
    @RequestMapping(value = "/productions")
public class ProductionController {

    @Autowired
    private ProductionDao productiondao;


//    @GetMapping(path ="/number", produces = "application/json")
//    public ResponseEntity<Map<String, String>> get() {
//        String number = this.productiondao.findMaxNumber();
//        if(number==null)number="0000" ;
//        Map<String, String> response = new HashMap<>();
//        response.put("number", number);
//        return ResponseEntity.ok().body(response);
//    }

    @GetMapping(produces = "application/json")
    public List<Production> get(@RequestParam HashMap<String, String> params){

        String number = params.get("number");
        String placed = params.get("placed");
        String productionstatusid = params.get("productionstatusid");


        List<Production> porders = this.productiondao.findAll();

        if (params.isEmpty()) return porders;

        Stream<Production> postream = porders.stream();

        if (number!=null) postream = postream.filter (o -> o.getNumber().toString().contains(number));
        if (productionstatusid!=null) postream = postream.filter (o -> o.getProductionstatus().getId()==Integer.parseInt(productionstatusid));
        if (placed!=null) postream = postream.filter (o -> o.getPlaced().toString().contains(placed));

        return postream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> add(@RequestBody Production order) {
        HashMap<String, String> response = new HashMap<>();

        String errors = "";

        // for (Poitem po : order.getPoitems()) po.setPurchaseorder(order);


        //Add this after PRODUCT addition
//        if (podao.findbyNumber(order.getNumber()) != null)
//            errors = errors + "<br> Existing Order";

        if (errors == "") {
            productiondao.save(order);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        response.put("id", String.valueOf(order.getId()));
        response.put("url", "/productions/" + order.getId());
        response.put("errors", errors);

        return response;

    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> update(@RequestBody Production order) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Production extPOrder = productiondao.findByMyId(order.getId());
        if (extPOrder == null) errors = errors + "<br> Production Does Not Exist";

//        if (extPOrder != null) {
//            try {
//                extPOrder.getPoitems().clear();
//                order.getPoitems().forEach(newpoitem -> {
//                    newpoitem.setPurchaseorder(extPOrder);
//                    extPOrder.getPoitems().add(newpoitem);
//                    newpoitem.setPurchaseorder(extPOrder);
//                });
//
//                BeanUtils.copyProperties(order, extPOrder, "id","poitems","qty");
//
//                if (errors == "") {
//                    podao.save(extPOrder); // Save the updated extUser object
//                } else {
//                    errors = "Server Validation Errors : <br> " + errors;
//                }
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }

        response.put("id", String.valueOf(order.getId()));
        response.put("url", "/productions/" + order.getId());
        response.put("errors", errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Production ord = productiondao.findByMyId(id);

        if(ord==null)
            errors = errors+"<br> Production Does Not Exists";

        if(errors=="") productiondao.delete(ord);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("code",String.valueOf(id));
        response.put("url","/id/"+id);
        response.put("errors",errors);

        return response;
    }

}


