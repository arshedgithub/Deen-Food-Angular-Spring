package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "productnumber")
    private String productnumber;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "quantity")
    @RegexPattern(reg = "^\\d{1,4}", msg = "Invalid Quantity")
    private BigDecimal quantity;
    @Basic
    @Column(name = "price")
    @RegexPattern(reg = "^[0-9]+(\\.[0-9]{1,2})?$", msg = "Invalid price format.")
    private BigDecimal price;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "dointroduced")
    @RegexPattern(reg = "^\\d{2}-\\d{2}-\\d{2}$", msg = "Invalid Date")
    private Date dointroduced;
    @ManyToOne
    @JoinColumn(name = "product_status_id", referencedColumnName = "id", nullable = false)
    private ProductStatus productStatus;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Collection<ProductIngredient> productIngredients;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Collection<ProductionOrderProduct> productionOrderProducts;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Collection<Production> productionsById;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Collection<Orderproduct> orderproducts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductnumber() {
        return productnumber;
    }

    public void setProductnumber(String productnumber) {
        this.productnumber = productnumber;
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

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
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

        Product product = (Product) o;

        if (id != null ? !id.equals(product.id) : product.id != null) return false;
        if (productnumber != null ? !productnumber.equals(product.productnumber) : product.productnumber != null)
            return false;
        if (name != null ? !name.equals(product.name) : product.name != null) return false;
        if (description != null ? !description.equals(product.description) : product.description != null) return false;
        if (quantity != null ? !quantity.equals(product.quantity) : product.quantity != null) return false;
        if (price != null ? !price.equals(product.price) : product.price != null) return false;
        if (!Arrays.equals(photo, product.photo)) return false;
        if (dointroduced != null ? !dointroduced.equals(product.dointroduced) : product.dointroduced != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (productnumber != null ? productnumber.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        result = 31 * result + (dointroduced != null ? dointroduced.hashCode() : 0);
        return result;
    }

    public ProductStatus getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
    }

    public Collection<ProductIngredient> getProductIngredients() {
        return productIngredients;
    }

    public void setProductIngredients(Collection<ProductIngredient> productIngredients) {
        this.productIngredients = productIngredients;
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

    public Collection<Production> getProductionsById() {
        return productionsById;
    }

    public void setProductionsById(Collection<Production> productionsById) {
        this.productionsById = productionsById;
    }

    public Collection<Orderproduct> getOrderproducts() {
        return orderproducts;
    }

    public void setOrderproducts(Collection<Orderproduct> orderproducts) {
        this.orderproducts = orderproducts;
    }
}
