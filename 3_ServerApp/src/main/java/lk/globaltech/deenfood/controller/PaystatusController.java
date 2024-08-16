package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.EmpstatusDao;
import lk.globaltech.deenfood.dao.PaystatusDao;
import lk.globaltech.deenfood.entity.Empstatus;
import lk.globaltech.deenfood.entity.Paystatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/paystatuses")
public class PaystatusController {

    @Autowired
    private PaystatusDao paystatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Paystatus> get() {

        List<Paystatus> paystatuses = this.paystatusDao.findAll();

        paystatuses = paystatuses.stream().map(
                paystatus -> { Paystatus d = new Paystatus();
                    d.setId(paystatus.getId());
                    d.setName(paystatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return paystatuses;

    }

}


