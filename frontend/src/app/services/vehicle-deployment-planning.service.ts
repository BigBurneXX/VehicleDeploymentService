import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonDto } from '../vehicle-deployment-planning/Person.dto';
import { VehicleDto } from "../vehicle-deployment-planning/Vehicle.dto";

@Injectable({
    providedIn: 'root'
})
export class VehicleDeploymentPlanningService {
    private peopleUrl = 'http://localhost:8080/peopleRead';
    private vehicleUrl = 'http://localhost:8081/vehicles';

    constructor(private http: HttpClient) { }

    getPeople(filters?: any): Observable<PersonDto[]> {
        let params = new HttpParams();
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== null && filters[key] !== undefined) {
                    params = params.set(key, filters[key]);
                }
            });
        }
        return this.http.get<PersonDto[]>(this.peopleUrl, { params });
    }

    getVehicles(filters?: any): Observable<VehicleDto[]> {
        let params = new HttpParams();
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== null && filters[key] !== undefined) {
                    params = params.set(key, filters[key]);
                }
            });
        }
        return this.http.get<VehicleDto[]>(this.vehicleUrl, { params });
    }
}
