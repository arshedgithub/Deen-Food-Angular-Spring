package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Purchaseorder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PurchaseOrderDao extends JpaRepository<Purchaseorder,Integer> {

    Optional<Purchaseorder> findById(Integer id);
    @Query("select i from Purchaseorder i where i.id = :id")
    Purchaseorder findByMyId(@Param("id") Integer id);

    @Query("select p from Purchaseorder p where p.number = :number")
    Purchaseorder findByPONumber(@Param("number")String number);
}

