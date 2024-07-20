package lk.globaltech.deenfood.controller;

import lk.globaltech.deenfood.dao.SupplierstatusDao;
import lk.globaltech.deenfood.entity.Supplierstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/supplierstatuses")
public class SupplierstatusController {

    @Autowired
    private SupplierstatusDao supplierstatusDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Supplierstatus> get() {

        List<Supplierstatus> supplierStatuses = this.supplierstatusDao.findAll();

        supplierStatuses = supplierStatuses.stream().map(
                supstatus -> { Supplierstatus ss = new Supplierstatus();
                            ss.setId(supstatus.getId());
                            ss.setName(supstatus.getName());
                            return ss; }
        ).collect(Collectors.toList());

        return supplierStatuses;

    }

}


