package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Collection;

@Entity
public class Supplier {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "regno")
    private String regno;
    @Basic
    @Column(name = "regyear")
    private Integer regyear;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "telephone")
    private String telephone;
    @Basic
    @Column(name = "fax")
    private String fax;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "contactperson")
    private String contactperson;
    @Basic
    @Column(name = "contactmobile")
    private String contactmobile;
    @Basic
    @Column(name = "creditlimit")
    private BigDecimal creditlimit;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "doregister")
    private Date doregister;
    @ManyToOne
    @JoinColumn(name = "supplierstatus_id", referencedColumnName = "id", nullable = false)
    private Supplierstatus supplierstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    private Collection<Supplieringcategory> supplieringcategories;

    public Supplier(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegno() {
        return regno;
    }

    public void setRegno(String regno) {
        this.regno = regno;
    }

    public Integer getRegyear() {
        return regyear;
    }

    public void setRegyear(Integer regyear) {
        this.regyear = regyear;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactperson() {
        return contactperson;
    }

    public void setContactperson(String contactperson) {
        this.contactperson = contactperson;
    }

    public String getContactmobile() {
        return contactmobile;
    }

    public void setContactmobile(String contactmobile) {
        this.contactmobile = contactmobile;
    }

    public BigDecimal getCreditlimit() {
        return creditlimit;
    }

    public void setCreditlimit(BigDecimal creditlimit) {
        this.creditlimit = creditlimit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDoregister() {
        return doregister;
    }

    public void setDoregister(Date doregister) {
        this.doregister = doregister;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Supplier supplier = (Supplier) o;

        if (id != null ? !id.equals(supplier.id) : supplier.id != null) return false;
        if (name != null ? !name.equals(supplier.name) : supplier.name != null) return false;
        if (regno != null ? !regno.equals(supplier.regno) : supplier.regno != null) return false;
        if (regyear != null ? !regyear.equals(supplier.regyear) : supplier.regyear != null) return false;
        if (address != null ? !address.equals(supplier.address) : supplier.address != null) return false;
        if (telephone != null ? !telephone.equals(supplier.telephone) : supplier.telephone != null) return false;
        if (fax != null ? !fax.equals(supplier.fax) : supplier.fax != null) return false;
        if (email != null ? !email.equals(supplier.email) : supplier.email != null) return false;
        if (contactperson != null ? !contactperson.equals(supplier.contactperson) : supplier.contactperson != null)
            return false;
        if (contactmobile != null ? !contactmobile.equals(supplier.contactmobile) : supplier.contactmobile != null)
            return false;
        if (creditlimit != null ? !creditlimit.equals(supplier.creditlimit) : supplier.creditlimit != null)
            return false;
        if (description != null ? !description.equals(supplier.description) : supplier.description != null)
            return false;
        if (doregister != null ? !doregister.equals(supplier.doregister) : supplier.doregister != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (regno != null ? regno.hashCode() : 0);
        result = 31 * result + (regyear != null ? regyear.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (telephone != null ? telephone.hashCode() : 0);
        result = 31 * result + (fax != null ? fax.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (contactperson != null ? contactperson.hashCode() : 0);
        result = 31 * result + (contactmobile != null ? contactmobile.hashCode() : 0);
        result = 31 * result + (creditlimit != null ? creditlimit.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (doregister != null ? doregister.hashCode() : 0);
        return result;
    }

    public Supplierstatus getSupplierstatus() {
        return supplierstatus;
    }

    public void setSupplierstatus(Supplierstatus supplierstatus) {
        this.supplierstatus = supplierstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Collection<Supplieringcategory> getSupplieringcategories() {
        return supplieringcategories;
    }

    public void setSupplieringcategories(Collection<Supplieringcategory> supplieringcategories) {
        this.supplieringcategories = supplieringcategories;
    }
}
