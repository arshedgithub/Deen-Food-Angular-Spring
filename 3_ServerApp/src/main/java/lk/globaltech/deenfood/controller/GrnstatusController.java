package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.GrnStatusDao;
import lk.globaltech.deenfood.entity.Grnstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/grnstatuses")
public class GrnstatusController {

    @Autowired
    private GrnStatusDao grnStatusDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Grnstatus> get() {

        List<Grnstatus> grnstatuses = this.grnStatusDao.findAll();

        grnstatuses = grnstatuses.stream().map(
                ingstatus -> { Grnstatus g = new Grnstatus();
                    g.setId(ingstatus.getId());
                    g.setName(ingstatus.getName());
                    return g; }
        ).collect(Collectors.toList());

        return grnstatuses;

    }

}


