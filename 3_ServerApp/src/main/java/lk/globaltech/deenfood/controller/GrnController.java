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
    // @PreAuthorize("hasAuthority('goods received note-select')")
    public List<Grn> get(@RequestParam HashMap<String, String> params) {

        List<Grn> grns = this.grndao.findAll();

        if(params.isEmpty())  return grns;

        String grnstatusid= params.get("grnstatusid");
        String purorderid= params.get("purchorderid");

        Stream<Grn> estream = grns.stream();

        if(grnstatusid!=null) estream = estream.filter(e -> e.getGrnstatus().getId()==Integer.parseInt(grnstatusid));
        if(purorderid!=null) estream = estream.filter(e -> e.getPurchaseorder().getId()==Integer.parseInt(purorderid));


        return estream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('goods received note-insert')")
    public HashMap<String,String> add(@RequestBody Grn grn){

        HashMap<String,String> responce = new HashMap<>();
        String errors = "";
        if(grn==null)errors = "Empty Grn Item : <br> "+errors;

        for (Grnitem grnItem : grn.getGrnitems()) {
            grnItem.setGrn(grn);
        }


        if(errors==""){
            grndao.save(grn);
            for (Grnitem grnItem : grn.getGrnitems()) {
                Ingredient ingredient = grnItem.getIngredient();
                BigDecimal unitCost = grnItem.getUnitcost();
                BigDecimal qtyToIncrease = grnItem.getQuantity();

                // Find the existing item or create a new one if not found
                Ingredient existingIngredient = ingredientDao.findById(ingredient.getId()).orElse(ingredient);

                // Calculate the updated qty for the item
                BigDecimal increasedQty = existingIngredient.getQoh().add(qtyToIncrease);

                // Update the item's qty and unitprice
                existingIngredient.setQoh(increasedQty);
                existingIngredient.setCost(unitCost); // Set unitprice as unitcost for simplicity, you can customize the logic here.

                // Save the item with the updated qty and unitprice
                ingredientDao.save(existingIngredient);

                Purchaseorder purorder = purorderDao.findByPONumber(grn.getPurchaseorder().getNumber());
                System.out.println(purorder.getNumber());
                purorder.setPostatus(postatusDao.findByName("Received"));
                System.out.println(purorder.getPostatus());
                purorderDao.save(purorder);
            }
        }

        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(grn.getId()));
        responce.put("url","/grns/"+grn.getId());
        responce.put("errors",errors.toString());

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('goods received note-update')")
    public HashMap<String,String> update(@RequestBody Grn grn){

        HashMap<String,String> responce = new HashMap<>();
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
//                BigDecimal qtyToIncrease = BigDecimal.valueOf(grnItem.getQty());

                List<Grnitem> oldGrnItems = grndao.findByGrnItemId(grn.getId());
                for (Grnitem oldgrnitm : oldGrnItems){
                    if (oldgrnitm.getIngredient().getId()==grnItem.getIngredient().getId()){
                        newqty = oldgrnitm.getQuantity().subtract(grnItem.getQuantity());
                    }
                }

                // Find the existing item or create a new one if not found
                Ingredient existingIngredient = ingredientDao.findById(ingredient.getId()).orElse(ingredient);

                // Calculate the updated qty for the item
                BigDecimal increasedQty = existingIngredient.getQoh().subtract(newqty);

                // Update the item's qty and unitprice
                existingIngredient.setQoh(increasedQty);
                existingIngredient.setCost(unitCost); // Set unitprice as unitcost for simplicity, you can customize the logic here.

                // Save the item with the updated qty and unitprice
                ingredientDao.save(existingIngredient);
            }
            grndao.save(grn);
        }

        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(grn.getId()));
        responce.put("url","/grns/"+grn.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('goods received note-delete')")
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Grn grnToDelete = grndao.findByMyId(id);

        if(grnToDelete==null)
            errors = errors+"<br> Grn Does Not Existed";

        if (errors.isEmpty()) {
            // Step 2: Get associated Grnitem records
            Collection<Grnitem> grnitems = grnToDelete.getGrnitems();

            // Step 3: Update Item entities' qty
            for (Grnitem grnitem : grnitems) {
                Ingredient itemToUpdate = grnitem.getIngredient();
                BigDecimal currentQty = itemToUpdate.getQoh();
                BigDecimal grnitemQty = grnitem.getQuantity();
                BigDecimal accQty =currentQty.subtract(grnitemQty);
                itemToUpdate.setQoh(accQty);

                // Step 4: Save the updated Item entities to the database
                ingredientDao.save(itemToUpdate);
            }

            // Step 5: Finally, delete the Grn entity
            grndao.delete(grnToDelete);
        } else {
            errors = "Server Validation Errors : <br> " + errors;
        }

        responce.put("id",String.valueOf(id));
        responce.put("url","/grns/"+id);
        responce.put("errors",errors);

        return responce;
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




