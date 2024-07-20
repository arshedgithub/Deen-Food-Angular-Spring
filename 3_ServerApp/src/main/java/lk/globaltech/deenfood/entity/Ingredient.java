package lk.globaltech.deenfood.entity;

import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Arrays;
import java.util.Objects;

@Entity
public class Ingredient {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    @Pattern(regexp = "^[A-Z][a-z]+(?:\\s[A-Z][a-z]+)?(?:\\s[A-Z][a-z]+)?(?:\\s[\\d]{1,3}(kg|g|ml|l))?$", message = "Invalid Name")
    private String name;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "qoh")
    @RegexPattern(reg = "^\\d{1,4}", msg = "Invalid Quantity")
    private BigDecimal qoh;
    @Basic
    @Column(name = "rop")
    @RegexPattern(reg = "^\\d{1,3}", msg = "Invalid ROP")
    private BigDecimal rop;
    @Basic
    @Column(name = "cost")
    @RegexPattern(reg = "^\\d{2,4}(?:[.][\\d]{2})?$", msg = "Invalid Price")
    private BigDecimal cost;
    @Basic
    @Column(name = "dointroduced")
    @RegexPattern(reg = "^\\d{2}-\\d{2}-\\d{2}$", msg = "Invalid Date")
    private Date dointroduced;
    @ManyToOne
    @JoinColumn(name = "ingcategory_id", referencedColumnName = "id", nullable = false)
    private Ingcategory ingcategory;
    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    private Brand brand;
    @ManyToOne
    @JoinColumn(name = "unittype_id", referencedColumnName = "id", nullable = false)
    private Unittype unittype;
    @ManyToOne
    @JoinColumn(name = "ingstatus_id", referencedColumnName = "id", nullable = false)
    private Ingstatus ingstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public BigDecimal getQoh() {
        return qoh;
    }

    public void setQoh(BigDecimal qoh) {
        this.qoh = qoh;
    }

    public BigDecimal getRop() {
        return rop;
    }

    public void setRop(BigDecimal rop) {
        this.rop = rop;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public Date getDointroduced() {
        return dointroduced;
    }

    public void setDointroduced(Date dointroduced) {
        this.dointroduced = dointroduced;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(description, that.description) && Arrays.equals(photo, that.photo) && Objects.equals(qoh, that.qoh) && Objects.equals(rop, that.rop) && Objects.equals(cost, that.cost) && Objects.equals(dointroduced, that.dointroduced);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, name, description, qoh, rop, cost, dointroduced);
        result = 31 * result + Arrays.hashCode(photo);
        return result;
    }

    public Ingcategory getIngcategory() {
        return ingcategory;
    }

    public void setIngcategory(Ingcategory ingcategory) {
        this.ingcategory = ingcategory;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Unittype getUnittype() {
        return unittype;
    }

    public void setUnittype(Unittype unittype) {
        this.unittype = unittype;
    }

    public Ingstatus getIngstatus() {
        return ingstatus;
    }

    public void setIngstatus(Ingstatus ingstatus) {
        this.ingstatus = ingstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
