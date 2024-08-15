package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class Employee {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "number")
    @Pattern(regexp = "^\\d{4}$", message = "Invalid Number")
    private String number;
    @Basic
    @Column(name = "fullname")
    @Pattern(regexp = "^([A-Z][a-z]*[.]?[\\s]?)*([A-Z][a-z]*)$", message = "Invalid Fullname")
    private String fullname;
    @Basic
    @Column(name = "callingname")
    @Pattern(regexp = "^([A-Z][a-z]+)$", message = "Invalid Calligname")
    private String callingname;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "dobirth")
    @RegexPattern(reg = "^\\d{2}-\\d{2}-\\d{2}$", msg = "Invalid Date Format")
    private Date dobirth;
    @Basic
    @Column(name = "nic")
    @Pattern(regexp = "^(([\\d]{9}[vVxX])|([\\d]{12}))$", message = "Invalid NIC")
    private String nic;
    @Basic
    @Column(name = "address")
    @Pattern(regexp = "^([\\w\\/\\-,\\s]{2,})$", message = "Invalid Address")
    private String address;
    @Basic
    @Column(name = "mobile")
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid Mobile Number")
    private String mobile;
    @Basic
    @Column(name = "land")
    @Pattern(regexp = "^\\d{0,10}$", message = "Invalid Landphone Number")
    private String land;
    @Basic
    @Column(name = "email")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid Email")
    private String email;
    @Basic
    @Column(name = "doassignment")
    private Date doassignment;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "gender_id", referencedColumnName = "id", nullable = false)
    private Gender gender;
    @ManyToOne
    @JoinColumn(name = "emptype_id", referencedColumnName = "id", nullable = false)
    private Emptype emptype;
    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "id", nullable = false)
    private Designation designation;
    @ManyToOne
    @JoinColumn(name = "empstatus_id", referencedColumnName = "id", nullable = false)
    private Empstatus empstatus;

    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<User> users;

    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Ingredient> ingredients;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Supplier> suppliers;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Purchaseorder> purchaseorders;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Grn> grns;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Product> products;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<ProductionOrder> productionOrders;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Production> productions;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Customer> customers;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Customerorder> customerorders;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Invoice> invoices;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private Collection<Invoice> invoicesById;

    public Employee(){}

    public Employee(Integer id, String callingname){
        this.id = id;
        this.callingname = callingname;
    }

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

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getCallingname() {
        return callingname;
    }

    public void setCallingname(String callingname) {
        this.callingname = callingname;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Date getDobirth() {
        return dobirth;
    }

    public void setDobirth(Date dobirth) {
        this.dobirth = dobirth;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLand() {
        return land;
    }

    public void setLand(String land) {
        this.land = land;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDoassignment() {
        return doassignment;
    }

    public void setDoassignment(Date doassignment) {
        this.doassignment = doassignment;
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

        Employee employee = (Employee) o;

        if (id != null ? !id.equals(employee.id) : employee.id != null) return false;
        if (number != null ? !number.equals(employee.number) : employee.number != null) return false;
        if (fullname != null ? !fullname.equals(employee.fullname) : employee.fullname != null) return false;
        if (callingname != null ? !callingname.equals(employee.callingname) : employee.callingname != null)
            return false;
        if (!Arrays.equals(photo, employee.photo)) return false;
        if (dobirth != null ? !dobirth.equals(employee.dobirth) : employee.dobirth != null) return false;
        if (nic != null ? !nic.equals(employee.nic) : employee.nic != null) return false;
        if (address != null ? !address.equals(employee.address) : employee.address != null) return false;
        if (mobile != null ? !mobile.equals(employee.mobile) : employee.mobile != null) return false;
        if (land != null ? !land.equals(employee.land) : employee.land != null) return false;
        if (email != null ? !email.equals(employee.email) : employee.email != null) return false;
        if (doassignment != null ? !doassignment.equals(employee.doassignment) : employee.doassignment != null)
            return false;
        if (description != null ? !description.equals(employee.description) : employee.description != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (fullname != null ? fullname.hashCode() : 0);
        result = 31 * result + (callingname != null ? callingname.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        result = 31 * result + (dobirth != null ? dobirth.hashCode() : 0);
        result = 31 * result + (nic != null ? nic.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (mobile != null ? mobile.hashCode() : 0);
        result = 31 * result + (land != null ? land.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (doassignment != null ? doassignment.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Emptype getEmptype() {
        return emptype;
    }

    public void setEmptype(Emptype emptype) {
        this.emptype = emptype;
    }

    public Designation getDesignation() {
        return designation;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
    }

    public Empstatus getEmpstatus() {
        return empstatus;
    }

    public void setEmpstatus(Empstatus empstatus) {
        this.empstatus = empstatus;
    }

    public Collection<User> getUsers() {
        return users;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    public Collection<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Collection<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Collection<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(Collection<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public Collection<Purchaseorder> getPurchaseorders() {
        return purchaseorders;
    }

    public void setPurchaseorders(Collection<Purchaseorder> purchaseorders) {
        this.purchaseorders = purchaseorders;
    }

    public Collection<Grn> getGrns() {
        return grns;
    }

    public void setGrns(Collection<Grn> grns) {
        this.grns = grns;
    }

    public Collection<Product> getProducts() {
        return products;
    }

    public void setProducts(Collection<Product> products) {
        this.products = products;
    }

    public Collection<ProductionOrder> getProductionOrders() {
        return productionOrders;
    }

    public void setProductionOrders(Collection<ProductionOrder> productionOrders) {
        this.productionOrders = productionOrders;
    }

    public Collection<Production> getProductions() {
        return productions;
    }

    public void setProductions(Collection<Production> productions) {
        this.productions = productions;
    }

    public Collection<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(Collection<Customer> customers) {
        this.customers = customers;
    }

    public Collection<Customerorder> getCustomerorders() {
        return customerorders;
    }

    public void setCustomerorders(Collection<Customerorder> customerorders) {
        this.customerorders = customerorders;
    }

    public Collection<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Collection<Invoice> invoices) {
        this.invoices = invoices;
    }

    public Collection<Invoice> getInvoicesById() {
        return invoicesById;
    }

    public void setInvoicesById(Collection<Invoice> invoicesById) {
        this.invoicesById = invoicesById;
    }
}
