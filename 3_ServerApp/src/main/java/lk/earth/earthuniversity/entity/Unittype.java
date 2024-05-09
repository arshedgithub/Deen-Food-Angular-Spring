package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Unittype {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "nmae")
    private String nmae;

    @JsonIgnore
    @OneToMany(mappedBy = "unittype")
    private Collection<Ingredient> ingredients;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return nmae;
    }

    public void setName(String nmae) {
        this.nmae = nmae;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Unittype unittype = (Unittype) o;
        return Objects.equals(id, unittype.id) && Objects.equals(nmae, unittype.nmae);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nmae);
    }

    public Collection<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Collection<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
