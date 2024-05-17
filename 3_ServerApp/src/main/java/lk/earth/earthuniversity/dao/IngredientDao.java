package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IngredientDao extends JpaRepository<Ingredient,Integer> {

    @Query("select i from Ingredient i where i.name=:name")
    Ingredient findByName(@Param("name")String name);

    @Query("select i from Ingredient i where i.id=:id")
    Ingredient findByMyId(@Param("id")Integer id);
}

