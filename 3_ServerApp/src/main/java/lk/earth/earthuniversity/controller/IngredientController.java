package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.IngredientDao;
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
//    @PreAuthorize("hasAuthority('ingredient-select')")
    public List<Ingredient> get(@RequestParam HashMap<String, String> params) {

        List<Ingredient> ingredients = this.ingredientDao.findAll();

        if(params.isEmpty())  return ingredients;

        String ingredientname = params.get("ingredientname");
        String categoryid= params.get("categoryid");
        String ingredientstatusid= params.get("ingredientstatusid");
        String ingredientbrandid= params.get("ingredientbrandid");

        Stream<Ingredient> ingredientStream = ingredients.stream();

        if(ingredientname!=null) ingredientStream = ingredientStream.filter(i -> i.getName().contains(ingredientname));
        if(categoryid!=null) ingredientStream = ingredientStream.filter(i -> i.getIngcategory().getId()==Integer.parseInt(categoryid));
        if(ingredientstatusid!=null) ingredientStream = ingredientStream.filter(i -> i.getIngstatus().getId()==Integer.parseInt(ingredientstatusid));
        if(ingredientbrandid!=null) ingredientStream = ingredientStream.filter(i -> i.getBrand().getId()==Integer.parseInt(ingredientbrandid));

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


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Ingredient-Insert')")
    public HashMap<String,String> add(@RequestBody Ingredient ingredient){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(ingredientDao.findByName(ingredient.getName())!=null)
            errors = errors+"<br> Existing Name";

        if(errors=="")
            ingredientDao.save(ingredient);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(ingredient.getId()));
        response.put("url","/ingredients/"+ingredient.getId());
        response.put("errors",errors);
        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Ingredient-Update')")
    public HashMap<String,String> update(@RequestBody Ingredient ingredient){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Ingredient ing = ingredientDao.findByName(ingredient.getName());

        if(ing!=null && ingredient.getId()!=ing.getId())
            errors = errors+"<br> Existing Name";


        if(errors=="") ingredientDao.save(ingredient);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(ingredient.getId()));
        response.put("url","/ingredients/"+ingredient.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Ingredient ing = ingredientDao.findByMyId(id);

        if(ing==null)
            errors = errors+"<br> Ingredient Does Not Existed";

        if(errors=="") ingredientDao.delete(ing);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/ingredients/"+id);
        response.put("errors",errors);

        return response;
    }

}




