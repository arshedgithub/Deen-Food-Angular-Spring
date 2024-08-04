package lk.globaltech.deenfood.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Collection;

@Entity
public class Purchaseorder {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "number")
    private String number;
    @Basic
    @Column(name = "doplaced")
    private Date doplaced;
    @Basic
    @Column(name = "dorequested")
    private Date dorequested;
    @Basic
    @Column(name = "expectedtotal")
    private BigDecimal expectedtotal;
    @Basic
    @Column(name = "description")
    private String description;
    @OneToMany(mappedBy = "purchaseorder")
    private Collection<Poitem> poitems;
    @ManyToOne
    @JoinColumn(name = "postatus_id", referencedColumnName = "id", nullable = false)
    private Postatus postatus;
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

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

    public Date getDoplaced() {
        return doplaced;
    }

    public void setDoplaced(Date doplaced) {
        this.doplaced = doplaced;
    }

    public Date getDorequested() {
        return dorequested;
    }

    public void setDorequested(Date dorequested) {
        this.dorequested = dorequested;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Purchaseorder that = (Purchaseorder) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (number != null ? !number.equals(that.number) : that.number != null) return false;
        if (doplaced != null ? !doplaced.equals(that.doplaced) : that.doplaced != null) return false;
        if (dorequested != null ? !dorequested.equals(that.dorequested) : that.dorequested != null) return false;
        if (expectedtotal != null ? !expectedtotal.equals(that.expectedtotal) : that.expectedtotal != null)
            return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (doplaced != null ? doplaced.hashCode() : 0);
        result = 31 * result + (dorequested != null ? dorequested.hashCode() : 0);
        result = 31 * result + (expectedtotal != null ? expectedtotal.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public Collection<Poitem> getPoitems() {
        return poitems;
    }

    public void setPoitems(Collection<Poitem> poitems) {
        this.poitems = poitems;
    }

    public Postatus getPostatus() {
        return postatus;
    }

    public void setPostatus(Postatus postatus) {
        this.postatus = postatus;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
