package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Ingcategory;
import lk.globaltech.deenfood.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredientDao extends JpaRepository<Ingredient,Integer> {

    @Query("select i from Ingredient i where i.name=:name")
    Ingredient findByName(@Param("name")String name);

    @Query("select i from Ingredient i where i.id=:id")
    Ingredient findByMyId(@Param("id")Integer id);

    @Query("SELECT DISTINCT i FROM Ingredient i " + "JOIN Poitem pi ON i.id = pi.ingredient.id " + "WHERE pi.purchaseorder.id = :id")
    List<Ingredient> findIngredientByPurorder(@Param("id") Integer id);

//    @Query("SELECT DISTINCT i FROM Ingredient i WHERE i.ingcategory.id = :id")
//    Ingcategory findIngredientCategoryBySupplier(@Param("id") Integer id);

//    @Query("SELECT DISTINCT i FROM Grn g " + "JOIN Grnitem gi ON g.id = gi.grn.id " + "JOIN Ingredient i ON gi.item.id = i.id " + "WHERE g.id = :id")
//    List<Ingredient> findIngredientByGrn(@Param("id") Integer id);

//    @Query("SELECT DISTINCT i FROM Invoice n " + "JOIN Ingredientinvoice ii ON n.id = ii.invoice.id " + "JOIN Ingredient i ON ii.item.id = i.id " + "WHERE n.id = :id")
//    List<Ingredient> findIngredientByInv(@Param("id") Integer id);

}

