import React from "react";
import { IProgressRecord } from "../../models";

interface ProgressRecordItemProps {
  record: IProgressRecord;
}
const ProgressRecordItem: React.FC<ProgressRecordItemProps> = ({ record }) => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {record?.progressRecord?.anthropometricMeasurements && (
          <div>
            <h2 className='font-semibold text-lg'>Anthropometric Measurements</h2>
            <ul>
              <li>Weight: {record?.progressRecord.anthropometricMeasurements.weight} Kg</li>
              <li>Height: {record?.progressRecord.anthropometricMeasurements.height} cm</li>
              <li>Waist Circumference: {record?.progressRecord.anthropometricMeasurements.waistCircumference} cm</li>
              <li>Hip Circumference: {record?.progressRecord.anthropometricMeasurements.hipCircumference} cm</li>
              <li>Chest Circumference: {record?.progressRecord.anthropometricMeasurements.chestCircumference} cm</li>
              <li>Arm Circumference: {record?.progressRecord.anthropometricMeasurements.armCircumference || "--"} cm</li>
              <li>Thigh Circumference: {record?.progressRecord.anthropometricMeasurements.thighCircumference} cm</li>
              <li>Abdomen Circumference: {record?.progressRecord.anthropometricMeasurements.abdomenCircumference} cm</li>
              <li>Triceps Circumference: {record?.progressRecord.anthropometricMeasurements.tricepsCircumference} cm</li>
              <li>SupraIliac Circumference: {record?.progressRecord.anthropometricMeasurements.supraIliacCircumference} cm</li>
              <li>Waist To Hip Ratio: {record?.progressRecord.anthropometricMeasurements.waistToHipRatio}</li>
            </ul>
          </div>
        )}
        {record?.progressRecord?.bodyComposition && (
          <div>
            <h2 className='font-semibold text-lg'>Body Composition</h2>
            <ul>
              <li>Body Mass Index: {record?.progressRecord.bodyComposition.bodyMassIndex}</li>
              <li>Body Density: {record?.progressRecord.bodyComposition.bodyDensity}</li>
              <li>Body Fat Percentage: {record?.progressRecord.bodyComposition.bodyFatPercentage}</li>
            </ul>
          </div>
        )}

        {record?.progressRecord?.cardiovascularFitness && (
          <div>
            <h2 className='font-semibold text-lg'>Cardiovascular Fitness</h2>
            <ul>
              <li>Maximum Weight Lifted: {record?.progressRecord.cardiovascularFitness.maximumWeightLifted} Kg</li>
              <li>Reps: {record?.progressRecord.cardiovascularFitness.reps}</li>
              <li>One Rep Max: {record?.progressRecord.cardiovascularFitness.oneRepMax}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressRecordItem;
