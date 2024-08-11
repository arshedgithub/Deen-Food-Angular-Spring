package lk.globaltech.deenfood.dao;

import lk.globaltech.deenfood.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductStatusDao extends JpaRepository<ProductStatus,Integer> {
}

