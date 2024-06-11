package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BrandDao extends JpaRepository<Brand,Integer> {

    @Query("SELECT b FROM Brand b join Ingcategorybrand ic on ic.brand.id = b.id join Ingcategory c on ic.ingcategory.id = c.id where c.id=:id")
    List<Brand> findAllByBrand(@Param("id") Integer id);

}
