package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductionDao extends JpaRepository<Production,Integer> {

    Optional<Production> findById(Integer id);
    @Query("select p from Production p where p.id = :id")
    Production findByMyId(@Param("id") Integer id);

}

