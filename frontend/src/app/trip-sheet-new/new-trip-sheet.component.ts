import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TripSheetServices} from "../services/trip-sheet.services";
import {VehicleDeploymentPlanService} from "../services/vehicle-deployment-plan.service";
import {VehicleDeploymentPlanOutputDto} from "../dtos/VehicleDeploymentPlanOutput.dto";
import {PersonOutputDto} from "../dtos/PersonOutput.dto";

@Component({
  selector: 'app-new-trip-sheet',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './new-trip-sheet.component.html',
  styleUrls: ['./new-trip-sheet.component.scss']
})
export class NewTripSheetComponent implements OnInit{
  plan: VehicleDeploymentPlanOutputDto | undefined;
  persons: PersonOutputDto[] = [];
  planError: boolean = false;
  selectedPersons: PersonOutputDto[] = [];

  constructor(private tripSheetService: TripSheetServices, private vehicleDeploymentPlanService: VehicleDeploymentPlanService) { }

  ngOnInit() {
    this.loadPlan(1);
  }

  loadPlan(id: number){
    this.vehicleDeploymentPlanService.getVehicleDeploymentPlanById(id).subscribe({
      next: (data) => {
        this.plan = data;
        this.persons = this.plan.persons;
      },
      error: () => {
        this.planError = true;
      }
    });
  }

  saveTripSheet() {
    this.selectedPersons = this.persons.filter(person => person.selected);
    this.tripSheetService.postTripSheet(this.plan?.id, this.selectedPersons).subscribe(response => {
      console.log('Trip Sheet saved successfully:', response);
    })
    console.log("Something");
  }
}
