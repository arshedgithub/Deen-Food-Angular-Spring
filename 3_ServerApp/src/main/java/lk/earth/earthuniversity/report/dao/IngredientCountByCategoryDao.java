package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.IngredientCountByCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientCountByCategoryDao extends JpaRepository<IngredientCountByCategory,Integer> {

    @Query(value = "SELECT new IngredientCountByCategory(c.name, count(*)) FROM Ingredient i, Ingcategory c where i.ingcategory.id = c.id GROUP BY c.name")
    List<IngredientCountByCategory> ingredientCountByCategory();

}

