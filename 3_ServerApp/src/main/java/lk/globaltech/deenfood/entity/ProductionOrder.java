package lk.globaltech.deenfood.entity;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.util.Collection;

@Entity
@Table(name = "production_order", schema = "deenfood", catalog = "")
public class ProductionOrder {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "order_number")
    private String orderNumber;
    @Basic
    @Column(name = "doplaced")
    private Date doplaced;
    @Basic
    @Column(name = "dorequired")
    private Date dorequired;
    @Basic
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "order_status_id", referencedColumnName = "id", nullable = false)
    private ProductionOrderstatus productionOrderstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @OneToMany(mappedBy = "productionOrder")
    private Collection<ProductionOrderProduct> productionOrderProducts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Date getDoplaced() {
        return doplaced;
    }

    public void setDoplaced(Date doplaced) {
        this.doplaced = doplaced;
    }

    public Date getDorequired() {
        return dorequired;
    }

    public void setDorequired(Date dorequired) {
        this.dorequired = dorequired;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductionOrder that = (ProductionOrder) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (orderNumber != null ? !orderNumber.equals(that.orderNumber) : that.orderNumber != null) return false;
        if (doplaced != null ? !doplaced.equals(that.doplaced) : that.doplaced != null) return false;
        if (dorequired != null ? !dorequired.equals(that.dorequired) : that.dorequired != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (orderNumber != null ? orderNumber.hashCode() : 0);
        result = 31 * result + (doplaced != null ? doplaced.hashCode() : 0);
        result = 31 * result + (dorequired != null ? dorequired.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public ProductionOrderstatus getProductionOrderstatus() {
        return productionOrderstatus;
    }

    public void setProductionOrderstatus(ProductionOrderstatus productionOrderstatus) {
        this.productionOrderstatus = productionOrderstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Collection<ProductionOrderProduct> getProductionOrderProducts() {
        return productionOrderProducts;
    }

    public void setProductionOrderProducts(Collection<ProductionOrderProduct> productionOrderProducts) {
        this.productionOrderProducts = productionOrderProducts;
    }
}
