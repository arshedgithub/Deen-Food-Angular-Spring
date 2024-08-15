package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Collection;

@Entity
public class Customerorder {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "number")
    private String number;
    @Basic
    @Column(name = "doexpected")
    private Date doexpected;
    @Basic
    @Column(name = "totalitem")
    private Integer totalitem;
    @Basic
    @Column(name = "expectadtotal")
    @RegexPattern(reg = "^[0-9]+(\\.[0-9]{1,2})?$", msg = "Invalid price format.")
    private BigDecimal expectedtotal;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "doplaced")
    private Date doplaced;
    @ManyToOne
    @JoinColumn(name = "customerorderstatus_id", referencedColumnName = "id", nullable = false)
    private Customerorderstatus customerorderstatus;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @OneToMany(mappedBy = "customerorder", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Orderproduct> orderproducts;
    @JsonIgnore
    @OneToMany(mappedBy = "customerorder")
    private Collection<Invoice> invoices;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getDoexpected() {
        return doexpected;
    }

    public void setDoexpected(Date doexpected) {
        this.doexpected = doexpected;
    }

    public Integer getTotalitem() {
        return totalitem;
    }

    public void setTotalitem(Integer totalitem) {
        this.totalitem = totalitem;
    }

    public BigDecimal getExpectedtotal() {
        return expectedtotal;
    }

    public void setExpectedtotal(BigDecimal expectedtotal) {
        this.expectedtotal = expectedtotal;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDoplaced() {
        return doplaced;
    }

    public void setDoplaced(Date doplaced) {
        this.doplaced = doplaced;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Customerorder that = (Customerorder) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (number != null ? !number.equals(that.number) : that.number != null) return false;
        if (doexpected != null ? !doexpected.equals(that.doexpected) : that.doexpected != null) return false;
        if (totalitem != null ? !totalitem.equals(that.totalitem) : that.totalitem != null) return false;
        if (expectedtotal != null ? !expectedtotal.equals(that.expectedtotal) : that.expectedtotal != null)
            return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (doplaced != null ? !doplaced.equals(that.doplaced) : that.doplaced != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (doexpected != null ? doexpected.hashCode() : 0);
        result = 31 * result + (totalitem != null ? totalitem.hashCode() : 0);
        result = 31 * result + (expectedtotal != null ? expectedtotal.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (doplaced != null ? doplaced.hashCode() : 0);
        return result;
    }

    public Customerorderstatus getCustomerorderstatus() {
        return customerorderstatus;
    }

    public void setCustomerorderstatus(Customerorderstatus customerorderstatus) {
        this.customerorderstatus = customerorderstatus;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Collection<Orderproduct> getOrderproducts() {
        return orderproducts;
    }

    public void setOrderproducts(Collection<Orderproduct> orderproducts) {
        this.orderproducts = orderproducts;
    }

    public Collection<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Collection<Invoice> invoices) {
        this.invoices = invoices;
    }
}
