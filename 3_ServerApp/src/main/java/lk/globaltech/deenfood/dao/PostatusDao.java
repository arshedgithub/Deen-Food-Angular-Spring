package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Postatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostatusDao extends JpaRepository<Postatus,Integer> {
    @Query("SELECT p FROM Postatus p WHERE p.name = :name")
    Postatus findByName(@Param("name") String name);
}

