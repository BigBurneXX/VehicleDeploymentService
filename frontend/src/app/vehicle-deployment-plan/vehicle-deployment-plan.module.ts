import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import {VehicleDeploymentPlanComponent} from "./vehicle-deployment-plan.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "VehicleDto Deployment Plan",
      urls: [{ title: "VehicleDto Deployment Plan", url: "/vehicle-deployment-plans" }, { title: "VehicleDto Deployment Plan" }],
    },
    component: VehicleDeploymentPlanComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  ],
})
export class VehicleDeploymentPlanModule {}
