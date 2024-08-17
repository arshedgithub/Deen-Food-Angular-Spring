package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Customerorderstatus;
import lk.globaltech.deenfood.entity.Empstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerorderstatusDao extends JpaRepository<Customerorderstatus,Integer> {

    @Query("SELECT cos FROM Customerorderstatus cos WHERE cos.name like :name" )
    Customerorderstatus findByName(@Param("name") String name);

}

