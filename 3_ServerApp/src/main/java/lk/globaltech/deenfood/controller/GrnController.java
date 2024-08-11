package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.*;
import lk.globaltech.deenfood.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/grns")
public class GrnController {

    @Autowired
    private GrnDao grndao;

    @Autowired
    private IngredientDao ingredientDao;

    @Autowired
    private PurchaseOrderDao purorderDao;

    @Autowired
    private PostatusDao postatusDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('GRN-select')")
    public List<Grn> get(@RequestParam HashMap<String, String> params) {

        List<Grn> grns = this.grndao.findAll();
        System.out.println(grns.get(0).getGrnnumber());  // output came
        System.out.println(params.isEmpty());  // output: true
        if(params.isEmpty()) return grns;

        String grnstatusid= params.get("grnstatusid");
        String purorderid= params.get("purchorderid");

        Stream<Grn> estream = grns.stream();
        if(grnstatusid!=null) estream = estream.filter(e -> e.getGrnstatus().getId()==Integer.parseInt(grnstatusid));
        if(purorderid!=null) estream = estream.filter(e -> e.getPurchaseorder().getId()==Integer.parseInt(purorderid));
        return estream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('GRN-insert')")
    public HashMap<String,String> add(@RequestBody Grn grn){

        HashMap<String,String> response = new HashMap<>();
        String errors = "";
        if(grn==null) errors = "Empty Grn Item : <br> "+errors;

        for (Grnitem grnItem : grn.getGrnitems()) {
            grnItem.setGrn(grn);
        }

        if(errors==""){
            grndao.save(grn);
            for (Grnitem grnItem : grn.getGrnitems()) {
                Ingredient ingredient = grnItem.getIngredient();
                BigDecimal unitCost = grnItem.getUnitcost();
                BigDecimal qtyToIncrease = grnItem.getQuantity();

                // Finding the existing ingredient or create a new one if not found
                Ingredient existingIngredient = ingredientDao.findById(ingredient.getId()).orElse(ingredient);

                // Calculating the updated qty for the ingredient
                BigDecimal increasedQty = existingIngredient.getQoh().add(qtyToIncrease);

                // Updating the ingredient's qty and unit price
                existingIngredient.setQoh(increasedQty);
                existingIngredient.setCost(unitCost); // Set unitprice as unitcost for simplicity, you can customize the logic here.

                // Saving the ingredient with the updated qty and unitprice
                ingredientDao.save(existingIngredient);

//                Purchaseorder purorder = purorderDao.findByPONumber(grn.getPurchaseorder().getNumber());
//                System.out.println("id" + purorder.getId());
//                System.out.println("Number" + purorder.getNumber());
//                System.out.println("Status " + purorder.getPostatus().getId() + purorder.getPostatus().getName());
//                System.out.println("Status " + purorder.getPostatus().getName());
//                purorder.setPostatus(postatusDao.findByName("Received"));
//                System.out.println(purorder.getPostatus());
//                purorderDao.save(purorder);
            }
        }

        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(grn.getId()));
        response.put("url","/grns/"+grn.getId());
        response.put("errors",errors.toString());

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('GRN-update')")
    public HashMap<String,String> update(@RequestBody Grn grn){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Grn grn1 = grndao.findByMyId(grn.getId());
        if(grn1!=null && grn.getId()!=grn1.getId())
            errors = errors+"<br> GRN Not Found";


        for (Grnitem grnItem : grn.getGrnitems()) {
            grnItem.setGrn(grn);
        }

        if(errors==""){

            for (Grnitem grnItem : grn.getGrnitems()) {

                BigDecimal newqty = BigDecimal.ZERO;

                Ingredient ingredient = grnItem.getIngredient();
                BigDecimal unitCost = grnItem.getUnitcost();
                BigDecimal qtyToIncrease = grnItem.getQuantity();

                List<Grnitem> oldGrnItems = grndao.findByGrnItemId(grn.getId());
                for (Grnitem oldgrnitm : oldGrnItems){
                    if (oldgrnitm.getIngredient().getId()==grnItem.getIngredient().getId()){
//                        newqty =  oldgrnitm.getQuantity().add(grnItem.getQuantity());
                        oldgrnitm.getIngredient().setQoh(oldgrnitm.getIngredient().getQoh().add(grnItem.getQuantity()));
                        System.out.println("newqty"+newqty);
                    }
                }

                // Find the existing item or create a new one if not found
                Ingredient existingIngredient = ingredientDao.findById(ingredient.getId()).orElse(ingredient);
                System.out.println("extqty"+existingIngredient.getQoh());
                // Calculate the updated qty for the item
//                BigDecimal increasedQty = existingIngredient.getQoh().add(newqty);
//                System.out.println("incresqty"+increasedQty);
                // Update the item's qty and unitprice
//                existingIngredient.setQoh(increasedQty);
                existingIngredient.setCost(unitCost); // Set unitprice as unitcost for simplicity, you can customize the logic here.

                // Save the item with the updated qty and unitprice
                ingredientDao.save(existingIngredient);
            }
            grndao.save(grn);
        }

        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(grn.getId()));
        response.put("url","/grns/"+grn.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('GRN-delete')")
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Grn grnToDelete = grndao.findByMyId(id);

        if(grnToDelete==null)
            errors = errors+"<br> Grn Does Not Existed";

        if (errors.isEmpty()) {

            List<Grnitem> oldGrnItems = grndao.findByGrnItemId(grnToDelete.getId());
            for (Grnitem oldgrnitm : oldGrnItems){
                    oldgrnitm.getIngredient().setQoh(oldgrnitm.getIngredient().getQoh().subtract(oldgrnitm.getQuantity()));
            }
            // Step 5: Finally, delete the Grn entity
            grndao.delete(grnToDelete);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        response.put("id",String.valueOf(id));
        response.put("url","/grns/"+id);
        response.put("errors",errors);

        return response;
    }

    @GetMapping(path ="/total/{id}",produces = "application/json")
    public List<Grn> total(@PathVariable Integer id) {

        List<Grn> grns = this.grndao.findtotal(id);

        grns = grns.stream().map(
                grn -> { Grn g = new Grn();
                    g.setId(grn.getId());
                    g.setGrandTotal(grn.getGrandTotal());
                    return g; }
        ).collect(Collectors.toList());

        return grns;

    }

}




