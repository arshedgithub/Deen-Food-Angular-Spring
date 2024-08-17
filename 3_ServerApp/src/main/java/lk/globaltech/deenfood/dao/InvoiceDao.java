package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceDao extends JpaRepository<Invoice,Integer> {

    @Query("select i from Invoice i where i.number=:number")
    Invoice findByNumber(@Param("number")String number);

    @Query("select i from Invoice i where i.id=:id")
    Invoice findByMyId(@Param("id")Integer id);

}

