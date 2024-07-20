package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.entity.Employee;
import lk.globaltech.deenfood.entity.Ingredient;
import lk.globaltech.deenfood.entity.Supplier;
import lk.globaltech.deenfood.entity.User;
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

    @GetMapping(path ="/employee", produces = "application/json")
    public HashMap<String, HashMap<String, String>> employee() {
        return RegexProvider.get(new Employee());
    }

    @GetMapping(path ="/users", produces = "application/json")
    public HashMap<String, HashMap<String, String>> user() {
        return RegexProvider.get(new User());
    }

    @GetMapping(path ="/ingredients", produces = "application/json")
    public HashMap<String, HashMap<String, String>> ingredient() {
        return RegexProvider.get(new Ingredient());
    }

    @GetMapping(path ="/suppliers", produces = "application/json")
    public HashMap<String, HashMap<String, String>> supplier() {
        return RegexProvider.get(new Supplier());
    }

}


