package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Paystatus {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "paystatus")
    private Collection<Cuspayment> cuspayments;
    @JsonIgnore
    @OneToMany(mappedBy = "paystatus")
    private Collection<Suppayment> suppayments;

    public Collection<Cuspayment> getCuspayments() {
        return cuspayments;
    }

    public void setCuspayments(Collection<Cuspayment> cuspayments) {
        this.cuspayments = cuspayments;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Paystatus paystatus = (Paystatus) o;

        if (id != null ? !id.equals(paystatus.id) : paystatus.id != null) return false;
        if (name != null ? !name.equals(paystatus.name) : paystatus.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public Collection<Suppayment> getSuppayments() {
        return suppayments;
    }

    public void setSuppayments(Collection<Suppayment> suppayments) {
        this.suppayments = suppayments;
    }
}
