package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Userrole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserroleDao extends JpaRepository<Userrole, Integer> {

    Userrole findById(int id);

}
