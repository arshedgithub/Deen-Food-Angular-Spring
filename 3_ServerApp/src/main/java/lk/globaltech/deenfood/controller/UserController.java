package lk.globaltech.deenfood.controller;


import lk.globaltech.deenfood.dao.UserDao;
import lk.globaltech.deenfood.entity.User;
import lk.globaltech.deenfood.entity.Userrole;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserDao userdao;

    @GetMapping(produces = "application/json")
    public List<User> get(@RequestParam HashMap<String, String> params) {
        List<User> users = this.userdao.findAll();

        if (params.isEmpty()) {
            return users;
        }

        String employee = params.get("employee");
        String username = params.get("username");
        String roleid = params.get("roleid");

        Stream<User> ustream = users.stream();

        if (employee != null) {
            ustream = ustream.filter(u -> u.getEmployee().getCallingname().contains(employee));
        }
        if (username != null) {
            ustream = ustream.filter(u -> u.getUsername().contains(username));
        }
        if (roleid != null) {
            ustream = ustream.filter(u -> u.getUserroles().stream().anyMatch(ur -> ur.getRole().getId() == Integer.parseInt(roleid)));
        }

        return ustream.collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> add(@RequestBody User user){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

       if(userdao.findByUsername(user.getUsername())!=null)
           errors = errors+"<br> Existing Username";

        if(errors==""){
            for(Userrole u : user.getUserroles()) u.setUser(user);

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            // Encrypt UserName and Password with Salt
            String salt = passwordEncoder.encode(user.getUsername());
            String hashedPassword = passwordEncoder.encode(salt + user.getPassword());
            user.setSalt(salt);
            user.setPassword(hashedPassword);
            userdao.save(user);

            response.put("id",String.valueOf(user.getId()));
            response.put("url","/users/"+user.getId());
            response.put("errors",errors);

            return response;
        }

        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(user.getId()));
        response.put("url","/users/"+user.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> update(@RequestBody User user) {
        HashMap<String, String> response = new HashMap<>();

        String errors = "";

        User extUser = userdao.findByUsername(user.getUsername());

        if (extUser != null) {

            // Update Existing User Roles
            try {
                extUser.getUserroles().clear();
                user.getUserroles().forEach(newUserRole -> {
                    newUserRole.setUser(extUser);
                    extUser.getUserroles().add(newUserRole);
                    newUserRole.setUser(extUser);
                });

                // Update basic user properties
                BeanUtils.copyProperties(user, extUser, "id","userroles");
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                // Encrypt UserName and Password with Salt
                String salt = passwordEncoder.encode(user.getUsername());
                String hashedPassword = passwordEncoder.encode(salt + user.getPassword());
                extUser.setSalt(salt);
                extUser.setPassword(hashedPassword);

                userdao.save(extUser); // Save the updated extUser object

                response.put("id", String.valueOf(user.getId()));
                response.put("url", "/users/" + user.getId());
                response.put("errors", errors);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return response;
    }

    @DeleteMapping("/{username}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable String username){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        User use1 = userdao.findByUsername(username);

        if(use1==null)
            errors = errors+"<br> User Does Not Existed";

        if(errors=="") userdao.delete(use1);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("username",String.valueOf(username));
        response.put("url","/users/"+username);
        response.put("errors",errors);

        return response;
    }

}
