package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Customer;
import lk.globaltech.deenfood.entity.Customerorder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerorderDao extends JpaRepository<Customerorder,Integer> {
    
    Customer findByCustOrderNumber(String number);

    @Query("select c from Customer c where c.id = :id")
    Customer findByMyId(@Param("id") Integer id);

}
