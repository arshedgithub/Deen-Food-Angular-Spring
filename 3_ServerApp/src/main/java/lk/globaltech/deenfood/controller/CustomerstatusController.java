package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.CustomerstatusDao;
import lk.globaltech.deenfood.entity.Customerstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/customerstatuses")
public class CustomerstatusController {

    @Autowired
    private CustomerstatusDao customerstatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Customerstatus> get() {

        List<Customerstatus> cusomerstatuses = this.customerstatusDao.findAll();

        cusomerstatuses = cusomerstatuses.stream().map(
                customerstatus -> { Customerstatus d = new Customerstatus();
                    d.setId(customerstatus.getId());
                    d.setName(customerstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return cusomerstatuses;

    }

}


