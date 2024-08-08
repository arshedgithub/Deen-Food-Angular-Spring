package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.PostatusDao;
import lk.globaltech.deenfood.entity.Postatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/postatuses")
public class PostatusController {

    @Autowired
    private PostatusDao usestatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Postatus> get() {

        List<Postatus> postatuses = this.usestatusdao.findAll();

        postatuses = postatuses.stream().map(
                usestatus -> { Postatus d = new Postatus();
                    d.setId(usestatus.getId());
                    d.setName(usestatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return postatuses;

    }

}


