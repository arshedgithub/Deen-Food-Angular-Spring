package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Product;
import lk.globaltech.deenfood.entity.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductionOrderDao extends JpaRepository<ProductionOrder,Integer> {

    Optional<ProductionOrder> findById(Integer id);
    @Query("select p from ProductionOrder p where p.id = :id")
    ProductionOrder findByMyId(@Param("id") Integer id);

    @Query("select p from ProductionOrder p where p.orderNumber = :number")
    ProductionOrder findByProdOrderNumber(@Param("number")String number);
}

