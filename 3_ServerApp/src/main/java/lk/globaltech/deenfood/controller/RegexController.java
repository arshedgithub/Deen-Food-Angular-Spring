package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.entity.*;
import lk.globaltech.deenfood.util.RegexProvider;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping(value = "/regexes")
public class RegexController {

    @GetMapping(path = "/employee", produces = "application/json")
    public HashMap<String, HashMap<String, String>> employee() {
        return RegexProvider.get(new Employee());
    }

    @GetMapping(path = "/users", produces = "application/json")
    public HashMap<String, HashMap<String, String>> user() {
        return RegexProvider.get(new User());
    }

    @GetMapping(path = "/ingredients", produces = "application/json")
    public HashMap<String, HashMap<String, String>> ingredient() {
        return RegexProvider.get(new Ingredient());
    }

    @GetMapping(path = "/suppliers", produces = "application/json")
    public HashMap<String, HashMap<String, String>> supplier() {
        return RegexProvider.get(new Supplier());
    }

    @GetMapping(path = "/purchaseorders", produces = "application/json")
    public HashMap<String, HashMap<String, String>> purchaseorder() {
        return RegexProvider.get(new Purchaseorder());
    }

    @GetMapping(path = "/grns", produces = "application/json")
    public HashMap<String, HashMap<String, String>> grn() {
        return RegexProvider.get(new Grn());
    }

    @GetMapping(path = "/grnitems", produces = "application/json")
    public HashMap<String, HashMap<String, String>> grnitems() {
        return RegexProvider.get(new Grnitem());
    }

    @GetMapping(path = "/products", produces = "application/json")
    public HashMap<String, HashMap<String, String>> product() { return RegexProvider.get(new Product()); }

    @GetMapping(path = "/productionorders", produces = "application/json")
    public HashMap<String, HashMap<String, String>> productionorder() { return RegexProvider.get(new ProductionOrder()); }

    @GetMapping(path = "/productionorderproducts", produces = "application/json")
    public HashMap<String, HashMap<String, String>> productionorderproduct() { return RegexProvider.get(new ProductionOrderProduct()); }

}


