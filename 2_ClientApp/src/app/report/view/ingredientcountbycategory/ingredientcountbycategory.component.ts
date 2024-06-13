import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReportService} from "../../reportservice";
import {IngCountByCategory} from "../../entity/ingCountByCategory";

declare var google: any;

@Component({
  selector: 'app-ingredientcountbycategory',
  templateUrl: './ingredientcountbycategory.component.html',
  styleUrls: ['./ingredientcountbycategory.component.css']
})
export class IngredientcountbycategoryComponent {
  ingredientCountByCategories!: IngCountByCategory[];
  data!: MatTableDataSource<IngCountByCategory>;

  columns: string[] = ['ingredient', 'count'];
  headers: string[] = ['Ingredient', 'Count'];
  binders: string[] = ['ingredient', 'count'];

  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {

    this.rs.ingCountByCategory().then((ings: IngCountByCategory[]) => {
      this.ingredientCountByCategories = ings;
    }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });
  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.ingredientCountByCategories);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }

  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'Ingredient');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'Ingredient');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'Ingredient');
    lineData.addColumn('number', 'Count');

    this.ingredientCountByCategories.forEach((ing: IngCountByCategory) => {

      barData.addRow([ing.ingredient, ing.count]);
      pieData.addRow([ing.ingredient, ing.count]);
      lineData.addRow([ing.ingredient, ing.count]);
    });

    const barOptions = {
      title: 'Ingredient Count (Bar Chart)',
      subtitle: 'Count of Ingredients by Category',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Ingredient Count (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Ingredient Count (Line Chart)',
      height: 400,
      width: 600
    };

    const barChart = new google.visualization.BarChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

    const pieChart = new google.visualization.PieChart(this.piechart.nativeElement);
    pieChart.draw(pieData, pieOptions);

    const lineChart = new google.visualization.LineChart(this.linechart.nativeElement);
    lineChart.draw(lineData, lineOptions);
  }
}
