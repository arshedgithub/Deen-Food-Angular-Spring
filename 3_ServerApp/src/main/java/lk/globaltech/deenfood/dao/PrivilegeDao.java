package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PrivilegeDao extends JpaRepository<Privilege,Integer> {

    Optional<Privilege> findById(Integer id);

    @Query("select e from Privilege e where e.id = :id")
    Privilege findByMyId(@Param("id") Integer id);

}
