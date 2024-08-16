package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Paytype {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "paytype")
    private Collection<Cuspayment> cuspayments;

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

        Paytype paytype = (Paytype) o;

        if (id != null ? !id.equals(paytype.id) : paytype.id != null) return false;
        if (name != null ? !name.equals(paytype.name) : paytype.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
