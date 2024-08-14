package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerDao extends JpaRepository<Customer,Integer> {
    
    Customer findByCustomernumber(String customernumber);

    @Query("select c from Customer c where c.id = :id")
    Customer findByMyId(@Param("id") Integer id);

}
