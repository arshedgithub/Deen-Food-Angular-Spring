package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.IngcategoryDao;
import lk.earth.earthuniversity.entity.Ingcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/ingcategories")
public class IngcategoryController {

    @Autowired
    private IngcategoryDao ingcategoryDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Ingcategory> get() {

        List<Ingcategory> ingcategories = this.ingcategoryDao.findAll();

        ingcategories = ingcategories.stream().map(
                ingcategory -> { Ingcategory i = new Ingcategory();
                            i.setId(ingcategory.getId());
                            i.setName(ingcategory.getName());
                            return i; }
        ).collect(Collectors.toList());

        return ingcategories;

    }

}


