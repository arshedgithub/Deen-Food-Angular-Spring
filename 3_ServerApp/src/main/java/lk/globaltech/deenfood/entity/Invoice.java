package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Collection;

@Entity
public class Invoice {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "number")
    private String number;
    @Basic
    @Column(name = "grandtotal")
    private BigDecimal grandtotal;
    @Basic
    @Column(name = "date")
    private Date date;
    @ManyToOne
    @JoinColumn(name = "customerorder_id", referencedColumnName = "id", nullable = false)
    private Customerorder customerorder;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "ivoicestatus_id", referencedColumnName = "id", nullable = false)
    private Invoicestatus invoicestatus;
    @JsonIgnore
    @OneToMany(mappedBy = "invoice")
    private Collection<Cuspayment> cuspayments;

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

    public BigDecimal getGrandtotal() {
        return grandtotal;
    }

    public void setGrandtotal(BigDecimal grandtotal) {
        this.grandtotal = grandtotal;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Invoice invoice = (Invoice) o;

        if (id != null ? !id.equals(invoice.id) : invoice.id != null) return false;
        if (number != null ? !number.equals(invoice.number) : invoice.number != null) return false;
        if (grandtotal != null ? !grandtotal.equals(invoice.grandtotal) : invoice.grandtotal != null) return false;
        if (date != null ? !date.equals(invoice.date) : invoice.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (grandtotal != null ? grandtotal.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }

    public Customerorder getCustomerorder() {
        return customerorder;
    }

    public void setCustomerorder(Customerorder customerorder) {
        this.customerorder = customerorder;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Invoicestatus getInvoicestatus() {
        return invoicestatus;
    }

    public void setInvoicestatus(Invoicestatus invoicestatus) {
        this.invoicestatus = invoicestatus;
    }

    public Collection<Cuspayment> getCuspayments() {
        return cuspayments;
    }

    public void setCuspayments(Collection<Cuspayment> cuspayments) {
        this.cuspayments = cuspayments;
    }
}
