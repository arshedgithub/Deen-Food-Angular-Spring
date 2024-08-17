package lk.globaltech.deenfood.report;

import lk.globaltech.deenfood.report.dao.CountByDesignaitonDao;
import lk.globaltech.deenfood.report.dao.IngredientCountByCategoryDao;
import lk.globaltech.deenfood.report.entity.CountByDesignation;
import lk.globaltech.deenfood.report.entity.IngredientCountByCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/reports")
public class ReportController {
    @Autowired
    private CountByDesignaitonDao countByDesignationDao;
    @Autowired
    private IngredientCountByCategoryDao ingredientCountByCategoryDao;

    @GetMapping(path ="/countbydesignation",produces = "application/json")
    @PreAuthorize("hasAuthority('count by designation-select')")
    public List<CountByDesignation> get() {

        List<CountByDesignation> designations = this.countByDesignationDao.countByDesignation();
        long totalCount = 0;

        for (CountByDesignation countByDesignation : designations) {
            totalCount += countByDesignation.getCount();
        }

        for (CountByDesignation countByDesignation : designations) {
            long count = countByDesignation.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countByDesignation.setPercentage(percentage);
        }
        return designations;
    }

    @GetMapping(path ="/ingredientcountbycategory",produces = "application/json")
    @PreAuthorize("hasAuthority('ingredient count by category-select')")
    public List<IngredientCountByCategory> getIngredientCountByCategory() {

        List<IngredientCountByCategory> ingCountByCategories = this.ingredientCountByCategoryDao.ingredientCountByCategory();
        return ingCountByCategories;
    }
}


