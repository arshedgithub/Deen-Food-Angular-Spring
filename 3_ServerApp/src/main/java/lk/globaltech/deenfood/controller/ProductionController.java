package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.ProductionDao;
import lk.globaltech.deenfood.entity.Production;
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
@RequestMapping(value = "/productions")
public class ProductionController {

    @Autowired
    private ProductionDao productiondao;

    @GetMapping(produces = "application/json")
    @PreAuthorize("hasAuthority('production-select')")
    public List<Production> get(@RequestParam HashMap<String, String> params) {

        String placed = params.get("date");
        String productionstatusid = params.get("productionstatusid");

        List<Production> productions = this.productiondao.findAll();
        System.out.println(productions.size());
        System.out.println(productions.get(0).getNumber());

        if (params.isEmpty()) return productions;

        Stream<Production> postream = productions.stream();
        if (productionstatusid != null)
            postream = postream.filter(o -> o.getProductionstatus().getId() == Integer.parseInt(productionstatusid));
        if (placed != null) postream = postream.filter(o -> o.getPlaced().toString().contains(placed));
        return postream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('production-insert')")
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
    @PreAuthorize("hasAuthority('production-update')")
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
    @PreAuthorize("hasAuthority('production-delete')")
    public HashMap<String, String> delete(@PathVariable Integer id) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Production ord = productiondao.findByMyId(id);

        if (ord == null)
            errors = errors + "<br> Production Does Not Exists";

        if (errors == "") productiondao.delete(ord);
        else errors = "Server Validation Errors : <br> " + errors;

        response.put("code", String.valueOf(id));
        response.put("url", "/id/" + id);
        response.put("errors", errors);

        return response;
    }

}


