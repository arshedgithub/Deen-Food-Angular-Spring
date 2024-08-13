package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerDao extends JpaRepository<Customer,Integer> {

    Customer findByNumber(String number);
    Customer findByNic(String nic);
    Optional<Customer> findById(Integer id);

    @Query("select e from Customer e where e.id = :id")
    Customer findByMyId(@Param("id") Integer id);

    @Query("SELECT NEW Customer (c.id, c.callingname) FROM Customer c")
    List<Customer> findAllNameId();

}

