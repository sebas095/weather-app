import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Coords } from "../structures/coords.structure";
import { Weather } from "../structures/weather.structure";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endPoint: string = "https://api.openweathermap.org/data/2.5/forecast";

  constructor(
    private readonly http: HttpClient,
    private readonly geolocationService: GeolocationService
  ) {
    this.weather$ = this.weatherSubject
      .asObservable()
      .pipe(map(this.structureData));

    this.geolocationService.coords$.subscribe((coords) => this.get(coords));
  }

  structureData(data: any) {
    const minMaxPerDay = {};
    data.list.forEach((weatherObject) => {
      const date = new Date(weatherObject.dt * 1000);
      const hours = date.getHours();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const key = `${month}-${day}`;
      const tempDay = new Intl.DateTimeFormat("es-CO", {
        month: "long",
        day: "numeric",
      }).format(new Date(date));

      let tempPerDay: Weather = minMaxPerDay[key] || {
        minMaxTemp: {},
      };

      if (!tempPerDay.id || hours === 16) {
        const source = weatherObject.weather[0];
        tempPerDay = { ...tempPerDay, ...source };
        tempPerDay.name = data.city.name;
        tempPerDay.date = tempDay;
      }

      if (
        !tempPerDay.minMaxTemp.min ||
        tempPerDay.minMaxTemp.min > weatherObject.main.temp_min
      ) {
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }

      if (
        !tempPerDay.minMaxTemp.max ||
        tempPerDay.minMaxTemp.max < weatherObject.main.temp_max
      ) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
  }

  get(coords: Coords) {
    const { lat, lon } = coords;
    const args: string = `?lat=${lat}&lon=${lon}&&appid=${environment.key}&units=metric`;
    let url: string = this.endPoint + args;

    if (isDevMode()) {
      url = "assets/forecast.json";
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
