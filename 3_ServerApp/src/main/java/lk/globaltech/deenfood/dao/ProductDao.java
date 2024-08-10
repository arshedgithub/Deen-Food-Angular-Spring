package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductDao extends JpaRepository<Product,Integer> {

    Optional<Product> findById(Integer id);
    @Query("select p from Product p where p.id = :id")
    Product findByMyId(@Param("id") Integer id);

    @Query("select p from Purchaseorder p where p.number = :number")
    Product findByProdNumber(@Param("number")String number);
}

