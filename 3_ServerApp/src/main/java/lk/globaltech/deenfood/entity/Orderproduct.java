package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Orderproduct {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "expectedcost")
    private BigDecimal expectedcost;
    @Basic
    @Column(name = "amount")
    private Integer amount;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customerorder_id", referencedColumnName = "id", nullable = false)
    private Customerorder customerorder;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getExpectedcost() {
        return expectedcost;
    }

    public void setExpectedcost(BigDecimal expectedcost) {
        this.expectedcost = expectedcost;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Orderproduct that = (Orderproduct) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (expectedcost != null ? !expectedcost.equals(that.expectedcost) : that.expectedcost != null) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (expectedcost != null ? expectedcost.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }

    public Customerorder getCustomerorder() {
        return customerorder;
    }

    public void setCustomerorder(Customerorder customerorder) {
        this.customerorder = customerorder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
