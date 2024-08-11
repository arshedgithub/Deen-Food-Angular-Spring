package lk.globaltech.deenfood.entity;

import lk.globaltech.deenfood.util.RegexPattern;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Grnitem {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "unitcost")
    @RegexPattern(reg = "^[0-9]+(\\.[0-9]{1,2})?$", msg = "Invalid price format.")
    private BigDecimal unitcost;
    @Basic
    @Column(name = "quantity")
    @RegexPattern(reg = "^[0-9]+$", msg = "Invalid Quantity")
    private BigDecimal quantity;
    @Basic
    @Column(name = "linecost")
    private BigDecimal linecost;
    @ManyToOne
    @JoinColumn(name = "grn_id", referencedColumnName = "id", nullable = false)
    private Grn grn;
    @ManyToOne
    @JoinColumn(name = "ingredient_id", referencedColumnName = "id", nullable = false)
    private Ingredient ingredient;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getUnitcost() {
        return unitcost;
    }

    public void setUnitcost(BigDecimal unitcost) {
        this.unitcost = unitcost;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getLinecost() {
        return linecost;
    }

    public void setLinecost(BigDecimal linecost) {
        this.linecost = linecost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Grnitem grnitem = (Grnitem) o;

        if (id != null ? !id.equals(grnitem.id) : grnitem.id != null) return false;
        if (unitcost != null ? !unitcost.equals(grnitem.unitcost) : grnitem.unitcost != null) return false;
        if (quantity != null ? !quantity.equals(grnitem.quantity) : grnitem.quantity != null) return false;
        if (linecost != null ? !linecost.equals(grnitem.linecost) : grnitem.linecost != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (unitcost != null ? unitcost.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        result = 31 * result + (linecost != null ? linecost.hashCode() : 0);
        return result;
    }

    public Grn getGrn() {
        return grn;
    }

    public void setGrn(Grn grn) {
        this.grn = grn;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }
}
