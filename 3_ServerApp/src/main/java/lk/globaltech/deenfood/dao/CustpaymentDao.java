package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Cuspayment;
import lk.globaltech.deenfood.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustpaymentDao extends JpaRepository<Cuspayment,Integer> {

    Cuspayment findByNumber(String number);
    Optional<Cuspayment> findById(Integer id);

    @Query("select c from Cuspayment c where c.id = :id")
    Cuspayment findByMyId(@Param("id") Integer id);

}

