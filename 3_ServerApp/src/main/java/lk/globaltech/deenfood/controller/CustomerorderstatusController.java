package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerorderstatusDao;
import lk.globaltech.deenfood.entity.Customerorderstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/custorderstatuses")
public class CustomerorderstatusController {

    @Autowired
    private CustomerorderstatusDao customerorderstatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Customerorderstatus> get() {

        List<Customerorderstatus> orderstatuses = this.customerorderstatusDao.findAll();

        orderstatuses = orderstatuses.stream().map(
                orderstatus -> { Customerorderstatus d = new Customerorderstatus();
                    d.setId(orderstatus.getId());
                    d.setName(orderstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return orderstatuses;

    }

}


