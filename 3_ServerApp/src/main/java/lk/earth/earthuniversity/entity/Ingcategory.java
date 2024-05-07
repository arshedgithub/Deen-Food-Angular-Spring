package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Ingcategory {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "ingcategory")
    private Collection<Ingcategorybrand> ingcategorybrands;
    @OneToMany(mappedBy = "ingcategory")
    private Collection<Ingredient> ingredients;

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
        Ingcategory that = (Ingcategory) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    public Collection<Ingcategorybrand> getIngcategorybrands() {
        return ingcategorybrands;
    }

    public void setIngcategorybrands(Collection<Ingcategorybrand> ingcategorybrands) {
        this.ingcategorybrands = ingcategorybrands;
    }

    public Collection<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Collection<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
