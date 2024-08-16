package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.PaystatusDao;
import lk.globaltech.deenfood.dao.PaytypeDao;
import lk.globaltech.deenfood.entity.Paystatus;
import lk.globaltech.deenfood.entity.Paytype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/paytypes")
public class PaytypeController {

    @Autowired
    private PaytypeDao paytypeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Paytype> get() {

        List<Paytype> paytypes = this.paytypeDao.findAll();

        paytypes = paytypes.stream().map(
                paytype -> { Paytype d = new Paytype();
                    d.setId(paytype.getId());
                    d.setName(paytype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return paytypes;

    }

}


