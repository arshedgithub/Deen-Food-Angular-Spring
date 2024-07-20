package lk.globaltech.deenfood.dao;


import lk.globaltech.deenfood.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserDao extends JpaRepository<User,Integer> {
    User findByUsername(String username);
}
