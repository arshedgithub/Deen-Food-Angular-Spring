package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SupplierDao;
import lk.earth.earthuniversity.dao.SupplierDao;
import lk.earth.earthuniversity.entity.Supplier;
import lk.earth.earthuniversity.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/suppliers")
public class SupplierController {

    @Autowired
    private SupplierDao supplierDao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('supplier-select')")
    public List<Supplier> get(@RequestParam HashMap<String, String> params) {

        List<Supplier> suppliers = this.supplierDao.findAll();

        if(params.isEmpty())  return suppliers;

        String regNumber = params.get("regnumber");
        String name = params.get("name");
        String supplierStatus = params.get("supplierstatus");
        String employee= params.get("employee");

        Stream<Supplier> sstream = suppliers.stream();

        if(name!=null) sstream = sstream.filter(e -> e.getName().contains(name));
        if(regNumber!=null) sstream = sstream.filter(e -> e.getRegno().equals(regNumber));
        if(supplierStatus!=null) sstream = sstream.filter(e -> e.getSupplierstatus().getId()==Integer.parseInt(supplierStatus));
        if(employee!=null) sstream = sstream.filter(e -> e.getEmployee().getId()==Integer.parseInt(employee));

        return sstream.collect(Collectors.toList());

    }

    @GetMapping(path ="/list",produces = "application/json")
    public List<Supplier> get() {

        List<Supplier> suppliers = this.supplierDao.findAllNameId();

        suppliers = suppliers.stream().map(
                supplier -> {
                    Supplier s = new Supplier(supplier.getId(), supplier.getName());
                    return  s;
                }
        ).collect(Collectors.toList());

        return suppliers;

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Supplier-Insert')")
    public HashMap<String,String> add(@RequestBody Supplier supplier){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(supplierDao.findByRegno(supplier.getRegno())!=null)
            errors = errors+"<br> Existing Registration Number";

        if(errors=="")
        supplierDao.save(supplier);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(supplier.getId()));
        response.put("url","/suppliers/"+supplier.getId());
        response.put("errors",errors);

        return response;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Supplier-Update')")
    public HashMap<String,String> update(@RequestBody Supplier supplier){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Supplier sup = supplierDao.findByRegno(supplier.getRegno());

        if(sup!=null && supplier.getId()!=sup.getId())
            errors = errors+"<br> Existing Registration Number";

        if(errors=="") supplierDao.save(supplier);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(supplier.getId()));
        response.put("url","/suppliers/"+supplier.getId());
        response.put("errors",errors);

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        Supplier sup = supplierDao.findByMyId(id);

        if(sup==null)
            errors = errors+"<br> Supplier Does Not Existed";

        if(errors=="") supplierDao.delete(sup);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(id));
        response.put("url","/suppliers/"+id);
        response.put("errors",errors);

        return response;
    }

}




