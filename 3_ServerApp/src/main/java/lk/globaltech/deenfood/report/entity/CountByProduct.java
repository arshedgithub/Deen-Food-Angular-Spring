package lk.globaltech.deenfood.report.entity;

import lk.globaltech.deenfood.entity.Product;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CountByProduct {

    @Id
    private Integer id;
    private String product;
    private Long count;
    private double percentage;

    public CountByProduct() {  }

    public CountByProduct(String product, Long count) {
        this.product = product;
        this.count = count;
    }

    public CountByProduct(Integer id, String product, Long count, double percentage) {
        this.id = id;
        this.product = product;
        this.count = count;
        this.percentage = percentage;
    }
}
