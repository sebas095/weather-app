import { Component, OnInit } from "@angular/core";
import { showUpStaggered } from "../../animations/showUp.animation";
import { ForecastService } from "src/app/services/forecast.service";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.sass"],
  animations: [showUpStaggered()],
})
export class ForecastComponent implements OnInit {
  constructor(public readonly forecastService: ForecastService) {}

  ngOnInit(): void {}
}
