package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.PurchaseOrderDao;
import lk.globaltech.deenfood.entity.Purchaseorder;
import org.springframework.beans.factory.annotation.Autowired;
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
//    @PreAuthorize("hasAuthority('ingredient-select')")
    public List<Purchaseorder> get(@RequestParam HashMap<String, String> params) {

        List<Purchaseorder> ingredients = this.purchaseOrderDao.findAll();

        if(params.isEmpty())  return ingredients;

        String poid = params.get("id");
        String ponumber= params.get("ponumber");
        String podate= params.get("date");
        String postatusid= params.get("postatusid");

        Stream<Purchaseorder> ingredientStream = ingredients.stream();

        if(poid!=null) ingredientStream = ingredientStream.filter(i -> i.getId() == Integer.parseInt(poid));
        if(ponumber!=null) ingredientStream = ingredientStream.filter(i -> i.getNumber().contains(ponumber));
        if(podate!=null) ingredientStream = ingredientStream.filter(i -> i.getDoplaced().equals(podate));
        if(postatusid!=null) ingredientStream = ingredientStream.filter(i -> i.getPostatus().getId()==Integer.parseInt(postatusid));

        return ingredientStream.collect(Collectors.toList());

    }

//    @GetMapping(path ="/list",produces = "application/json")
//    public List<Purchaseorder> get() {
//
//        List<Purchaseorder> ingredients = this.purchaseOrderDao.findAllNameId();
//
//        ingredients = ingredients.stream().map(
//                ingredient -> {
//                    Purchaseorder i = new Purchaseorder(ingredient.getId(), ingredient.getCallingname());
//                    return  i;
//                }
//        ).collect(Collectors.toList());
//
//        return ingredients;
//
//    }


//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
////    @PreAuthorize("hasAuthority('Purchaseorder-Insert')")
//    public HashMap<String,String> add(@RequestBody Purchaseorder ingredient){
//
//        HashMap<String,String> response = new HashMap<>();
//        String errors="";
//
//        if(purchaseOrderDao.findByName(ingredient.getName())!=null)
//            errors = errors+"<br> Existing Name";
//
//        if(errors=="")
//            purchaseOrderDao.save(ingredient);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        response.put("id",String.valueOf(ingredient.getId()));
//        response.put("url","/ingredients/"+ingredient.getId());
//        response.put("errors",errors);
//        return response;
//    }
//
//    @PutMapping
//    @ResponseStatus(HttpStatus.CREATED)
////    @PreAuthorize("hasAuthority('Purchaseorder-Update')")
//    public HashMap<String,String> update(@RequestBody Purchaseorder ingredient){
//
//        HashMap<String,String> response = new HashMap<>();
//        String errors="";
//
//        Purchaseorder ing = purchaseOrderDao.findByName(ingredient.getName());
//
//        if(ing!=null && ingredient.getId()!=ing.getId())
//            errors = errors+"<br> Existing Name";
//
//
//        if(errors=="") purchaseOrderDao.save(ingredient);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        response.put("id",String.valueOf(ingredient.getId()));
//        response.put("url","/ingredients/"+ingredient.getId());
//        response.put("errors",errors);
//
//        return response;
//    }
//
//
//    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
//    public HashMap<String,String> delete(@PathVariable Integer id){
//
//        System.out.println(id);
//
//        HashMap<String,String> response = new HashMap<>();
//        String errors="";
//
//        Purchaseorder ing = purchaseOrderDao.findByMyId(id);
//
//        if(ing==null)
//            errors = errors+"<br> Purchaseorder Does Not Existed";
//
//        if(errors=="") purchaseOrderDao.delete(ing);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        response.put("id",String.valueOf(id));
//        response.put("url","/ingredients/"+id);
//        response.put("errors",errors);
//
//        return response;
//    }

}




