package lk.globaltech.deenfood.entity;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;

@Entity
public class Customer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "customernumber")
    private String customernumber;
    @Basic
    @Column(name = "fullname")
    @Pattern(regexp = "^([A-Z][a-z]*[.]?[\\s]?)*([A-Z][a-z]*)$", message = "Invalid Name")
    private String fullname;
    @Basic
    @Column(name = "callingname")
    private String callingname;
    @Basic
    @Column(name = "contact")
    @Pattern(regexp = "^[0][0-9]{9}$", message = "Invalid Contact Number")
    private String contact;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "email")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid Email")
    private String email;
    @Basic
    @Column(name = "address")
    private String address;
    @ManyToOne
    @JoinColumn(name = "customerstatus_id", referencedColumnName = "id", nullable = false)
    private Customerstatus customerstatus;
    @ManyToOne
    @JoinColumn(name = "gender_id", referencedColumnName = "id", nullable = false)
    private Gender gender;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @Basic
    @Column(name = "doassignment")
    private Date doassignment;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustomernumber() {
        return customernumber;
    }

    public void setCustomernumber(String customernumber) {
        this.customernumber = customernumber;
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

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Customer customer = (Customer) o;

        if (id != null ? !id.equals(customer.id) : customer.id != null) return false;
        if (customernumber != null ? !customernumber.equals(customer.customernumber) : customer.customernumber != null)
            return false;
        if (fullname != null ? !fullname.equals(customer.fullname) : customer.fullname != null) return false;
        if (callingname != null ? !callingname.equals(customer.callingname) : customer.callingname != null)
            return false;
        if (contact != null ? !contact.equals(customer.contact) : customer.contact != null) return false;
        if (description != null ? !description.equals(customer.description) : customer.description != null)
            return false;
        if (email != null ? !email.equals(customer.email) : customer.email != null) return false;
        if (address != null ? !address.equals(customer.address) : customer.address != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (customernumber != null ? customernumber.hashCode() : 0);
        result = 31 * result + (fullname != null ? fullname.hashCode() : 0);
        result = 31 * result + (callingname != null ? callingname.hashCode() : 0);
        result = 31 * result + (contact != null ? contact.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        return result;
    }

    public Customerstatus getCustomerstatus() {
        return customerstatus;
    }

    public void setCustomerstatus(Customerstatus customerstatus) {
        this.customerstatus = customerstatus;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Date getDoassignment() {
        return doassignment;
    }

    public void setDoassignment(Date doassignment) {
        this.doassignment = doassignment;
    }
}
