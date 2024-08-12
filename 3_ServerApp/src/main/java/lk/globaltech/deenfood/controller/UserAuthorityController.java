package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.UserDao;
import lk.globaltech.deenfood.entity.Privilege;
import lk.globaltech.deenfood.entity.User;
import lk.globaltech.deenfood.entity.Userrole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/authorities")
public class UserAuthorityController {

    @Autowired
    private UserDao userdao;

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<String> getUserAuthoritiesByUsername(@PathVariable String username) {
        User user = userdao.findByUsername(username);
        List<String> authorities = new ArrayList<>();

        if (user != null){
            List<Userrole> userroles = (List<Userrole>) user.getUserroles();

            for (Userrole u : userroles) {
                List<Privilege> Privileges = (List<Privilege>) u.getRole().getPrivileges();
                for (Privilege p : Privileges) {
                    String authority = p.getAuthority();
                    authorities.add(authority);
                }
            }
        }else{
            authorities = Arrays.asList(
                    "user-select","user-delete","user-update","user-insert",
                    "privilege-select","privilege-delete","privilege-update","privilege-insert",
                    "employee-select","employee-delete","employee-update","employee-insert",
                    "operations-select","operations-delete","operations-update","operations-insert",

                    "ingredient-select","ingredient-delete","ingredient-update","ingredient-insert",
                    "Product-select","Product-delete","Product-update","Product-insert",

                    "supplier-select","supplier-delete","supplier-update","supplier-insert",
                    "purchase order-select","purchase order-delete","purchase order-update","purchase order-insert",
                    "GRN-select","GRN-delete","GRN-update","GRN-insert",

                    "Production Order-select","Production Order-delete","Production Order-update","Production Order-insert",
                    "Production-select","Production-delete","Production-update","Production-insert",

                    "Count By Designation-select",
                    "Ingredient Count By Category-select"

            );
        }

        return authorities;
    }
}
