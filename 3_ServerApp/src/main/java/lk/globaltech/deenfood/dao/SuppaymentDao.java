package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Suppayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SuppaymentDao extends JpaRepository<Suppayment,Integer> {

    Suppayment findByNumber(String number);
    Optional<Suppayment> findById(Integer id);

    @Query("select c from Suppayment c where c.id = :id")
    Suppayment findByMyId(@Param("id") Integer id);

}

