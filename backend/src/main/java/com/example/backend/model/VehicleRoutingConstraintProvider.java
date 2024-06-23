package com.example.backend.model;

import com.example.backend.solve.PersonSolve;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.api.score.stream.ConstraintCollectors;
import org.optaplanner.core.api.score.stream.ConstraintProvider;

import org.optaplanner.core.api.score.stream.Constraint;
import org.optaplanner.core.api.score.stream.ConstraintFactory;

public class VehicleRoutingConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[]{
                vehicleCapacityConstraint(constraintFactory),
                wheelchairCompatibilityConstraint(constraintFactory),
                minimizeDistance(constraintFactory)
        };
    }

    private Constraint vehicleCapacityConstraint(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(PersonSolve.class)
                .groupBy(PersonSolve::getAssignedVehicle, ConstraintCollectors.count())
                .filter((vehicle, count) -> count > vehicle.getCapacity())
                .penalize(HardSoftScore.ONE_HARD, (vehicle, count) -> count - vehicle.getCapacity())
                .asConstraint("Vehicle capacity");
    }

    private Constraint wheelchairCompatibilityConstraint(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(PersonSolve.class)
                .filter(PersonSolve::isHasWheelchair)
                .filter(person -> person.getAssignedVehicle() == null || !person.getAssignedVehicle().isCanCarryWheelchair())
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Wheelchair compatibility");
    }

    private Constraint minimizeDistance(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(PersonSolve.class)
                //TODO: Should access openrouteservice to calculate distance!
                .penalize(HardSoftScore.ONE_SOFT,  person -> (int) (person.getStartLocation().getDistanceTo(person.getAssignedVehicle().getStartLocation())
                        + person.getEndLocation().getDistanceTo(person.getAssignedVehicle().getEndLocation())))
                .asConstraint("minimize distance");
    }
}