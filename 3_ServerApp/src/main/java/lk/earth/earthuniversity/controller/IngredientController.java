package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EmployeeDao;
import lk.earth.earthuniversity.dao.IngredientDao;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/ingredients")
public class IngredientController {

    @Autowired
    private IngredientDao ingredientDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Ingredient> get(@RequestParam HashMap<String, String> params) {

        List<Ingredient> ingredients = this.ingredientDao.findAll();

        if(params.isEmpty())  return ingredients;

        String ingredientname = params.get("ingredientname");
        String categoryid= params.get("categoryid");
        String ingredientstatusid= params.get("ingredientstatusid");

        Stream<Ingredient> ingredientStream = ingredients.stream();

        if(ingredientname!=null) ingredientStream = ingredientStream.filter(i -> i.getName().contains(ingredientname));
        if(categoryid!=null) ingredientStream = ingredientStream.filter(i -> i.getIngcategory().getId()==Integer.parseInt(categoryid));
        if(ingredientstatusid!=null) ingredientStream = ingredientStream.filter(i -> i.getIngstatus().getId()==Integer.parseInt(ingredientstatusid));

        return ingredientStream.collect(Collectors.toList());

    }

//    @GetMapping(path ="/list",produces = "application/json")
//    public List<Ingredient> get() {
//
//        List<Ingredient> ingredients = this.ingredientDao.findAllNameId();
//
//        ingredients = ingredients.stream().map(
//                ingredient -> {
//                    Ingredient i = new Ingredient(ingredient.getId(), ingredient.getCallingname());
//                    return  i;
//                }
//        ).collect(Collectors.toList());
//
//        return ingredients;
//
//    }


//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
////    @PreAuthorize("hasAuthority('Employee-Insert')")
//    public HashMap<String,String> add(@RequestBody Employee employee){
//
//        HashMap<String,String> responce = new HashMap<>();
//        String errors="";
//
//        if(employeedao.findByNumber(employee.getNumber())!=null)
//            errors = errors+"<br> Existing Number";
//        if(employeedao.findByNic(employee.getNic())!=null)
//            errors = errors+"<br> Existing NIC";
//
//        System.out.println(employee.getDoassignment());
//
//        if(errors=="")
//        employeedao.save(employee);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        responce.put("id",String.valueOf(employee.getId()));
//        responce.put("url","/employees/"+employee.getId());
//        responce.put("errors",errors);
//
//        return responce;
//    }
//
//    @PutMapping
//    @ResponseStatus(HttpStatus.CREATED)
////    @PreAuthorize("hasAuthority('Employee-Update')")
//    public HashMap<String,String> update(@RequestBody Employee employee){
//
//        HashMap<String,String> responce = new HashMap<>();
//        String errors="";
//
//        Employee emp1 = employeedao.findByNumber(employee.getNumber());
//        Employee emp2 = employeedao.findByNic(employee.getNic());
//
//        if(emp1!=null && employee.getId()!=emp1.getId())
//            errors = errors+"<br> Existing Number";
//        if(emp2!=null && employee.getId()!=emp2.getId())
//            errors = errors+"<br> Existing NIC";
//
//        if(errors=="") employeedao.save(employee);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        responce.put("id",String.valueOf(employee.getId()));
//        responce.put("url","/employees/"+employee.getId());
//        responce.put("errors",errors);
//
//        return responce;
//    }
//
//
//    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
//    public HashMap<String,String> delete(@PathVariable Integer id){
//
//        System.out.println(id);
//
//        HashMap<String,String> responce = new HashMap<>();
//        String errors="";
//
//        Employee emp1 = employeedao.findByMyId(id);
//
//        if(emp1==null)
//            errors = errors+"<br> Employee Does Not Existed";
//
//        if(errors=="") employeedao.delete(emp1);
//        else errors = "Server Validation Errors : <br> "+errors;
//
//        responce.put("id",String.valueOf(id));
//        responce.put("url","/employees/"+id);
//        responce.put("errors",errors);
//
//        return responce;
//    }

}




