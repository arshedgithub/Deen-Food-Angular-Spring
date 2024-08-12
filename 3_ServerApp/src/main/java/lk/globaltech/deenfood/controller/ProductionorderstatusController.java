package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.EmpstatusDao;
import lk.globaltech.deenfood.dao.ProductionOrderstatusDao;
import lk.globaltech.deenfood.entity.Empstatus;
import lk.globaltech.deenfood.entity.ProductionOrderstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/productionorderstatuses")
public class ProductionorderstatusController {

    @Autowired
    private ProductionOrderstatusDao productionOrderstatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<ProductionOrderstatus> get() {

        List<ProductionOrderstatus> prodOrderStatuses = this.productionOrderstatusDao.findAll();

        prodOrderStatuses = prodOrderStatuses.stream().map(
                prodOrderStatus -> { ProductionOrderstatus d = new ProductionOrderstatus();
                    d.setId(prodOrderStatus.getId());
                    d.setName(prodOrderStatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return prodOrderStatuses;

    }

}


