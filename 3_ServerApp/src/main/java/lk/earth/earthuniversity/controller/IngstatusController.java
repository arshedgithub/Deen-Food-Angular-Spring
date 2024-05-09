package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.IngstatusDao;
import lk.earth.earthuniversity.entity.Ingstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/ingstatuses")
public class IngstatusController {

    @Autowired
    private IngstatusDao ingstatusDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Ingstatus> get() {

        List<Ingstatus> ingstatuses = this.ingstatusDao.findAll();

        ingstatuses = ingstatuses.stream().map(
                ingstatus -> { Ingstatus i = new Ingstatus();
                            i.setId(ingstatus.getId());
                            i.setName(ingstatus.getName());
                            return i; }
        ).collect(Collectors.toList());

        return ingstatuses;

    }

}


