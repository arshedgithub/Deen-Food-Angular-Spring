package lk.globaltech.deenfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Ingcategorybrand {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ingcategory_id", referencedColumnName = "id", nullable = false)
    private Ingcategory ingcategory;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    private Brand brand;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingcategorybrand that = (Ingcategorybrand) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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
}
