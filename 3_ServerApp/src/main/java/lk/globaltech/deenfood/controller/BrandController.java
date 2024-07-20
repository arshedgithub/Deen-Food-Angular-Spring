package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.BrandDao;
import lk.globaltech.deenfood.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/brands")
public class BrandController {

    @Autowired
    private BrandDao brandDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Brand> get(@RequestParam HashMap<String, String> params) {

        List<Brand> brands = this.brandDao.findAll();

        if (params.isEmpty()) return brands;

        String categoryid = params.get("categoryid");
        if (categoryid != null) brands = this.brandDao.findAllByBrand(Integer.parseInt(categoryid));
        return brands;

    }

}


