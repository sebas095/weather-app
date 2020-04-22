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
export class CurrentWeatherService {
  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endPoint: string = "https://api.openweathermap.org/data/2.5/weather";

  constructor(
    private readonly http: HttpClient,
    private readonly geolocationService: GeolocationService
  ) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data: any) => {
        const mainWeather = data.weather[0];

        const weather: Weather = {
          name: data.name,
          temp: data.main.temp,
          ...mainWeather,
        };

        return weather;
      })
    );

    this.geolocationService.coords$.subscribe((coords) => this.get(coords));
  }

  get(coords: Coords) {
    const { lat, lon } = coords;
    const args: string = `?lat=${lat}&lon=${lon}&&appid=${environment.key}&units=metric`;
    let url: string = this.endPoint + args;

    if (isDevMode()) {
      url = "assets/weather.json";
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }
  // Subject

  // Observable Observer.next()
}
