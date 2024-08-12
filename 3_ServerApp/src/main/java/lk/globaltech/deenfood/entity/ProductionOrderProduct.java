package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;

@Entity
@Table(name = "production_order_product", schema = "deenfood", catalog = "")
public class ProductionOrderProduct {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "amount")
    @RegexPattern(reg = "^[0-9]+(\\.[0-9]{1,3})?$", msg = "Invalid amount format.")
    private String amount;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "production_order_id", referencedColumnName = "id", nullable = false)
    private ProductionOrder productionOrder;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductionOrderProduct that = (ProductionOrderProduct) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }

    public ProductionOrder getProductionOrder() {
        return productionOrder;
    }

    public void setProductionOrder(ProductionOrder productionOrder) {
        this.productionOrder = productionOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
