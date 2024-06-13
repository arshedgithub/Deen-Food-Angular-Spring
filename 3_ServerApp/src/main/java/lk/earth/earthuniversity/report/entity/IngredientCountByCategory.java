package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class IngredientCountByCategory {

    private Integer id;
    private String categoryName;
    private Long count;

    public IngredientCountByCategory() {  }

    public IngredientCountByCategory(String categoryName, Long count) {
        this.categoryName = categoryName;
        this.count = count;
    }

    @Id
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getIngredient() {
        return categoryName;
    }
    public void setIngredient(String categoryName) {
        this.categoryName = categoryName;
    }
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }

}
