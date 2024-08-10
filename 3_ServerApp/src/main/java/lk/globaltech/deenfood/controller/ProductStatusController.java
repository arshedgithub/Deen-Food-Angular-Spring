package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.ProductStatusDao;
import lk.globaltech.deenfood.entity.ProductStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/productstatuses")
public class ProductStatusController {

    @Autowired
    private ProductStatusDao productStatusDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<ProductStatus> get() {

        List<ProductStatus> productStatuses = this.productStatusDao.findAll();

        productStatuses = productStatuses.stream().map(
                prodStatus -> { ProductStatus i = new ProductStatus();
                            i.setId(prodStatus.getId());
                            i.setName(prodStatus.getName());
                            return i; }
        ).collect(Collectors.toList());

        return productStatuses;

    }

}


