package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Grnstatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrnStatusDao extends JpaRepository<Grnstatus,Integer> {
    Grnstatus findByName(String received);
}

