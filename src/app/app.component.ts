import { Component } from "@angular/core";
import { GeolocationService } from "./services/geolocation.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  title = "weather-app";

  constructor(public geolocationService: GeolocationService) {}

  ngOnInit() {}
}
