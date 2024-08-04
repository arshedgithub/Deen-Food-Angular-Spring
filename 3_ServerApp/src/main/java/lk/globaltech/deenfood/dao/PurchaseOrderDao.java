package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Postatus;
import lk.globaltech.deenfood.entity.Purchaseorder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderDao extends JpaRepository<Purchaseorder,Integer> {

}

