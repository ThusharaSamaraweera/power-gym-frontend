import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { BodyHealthInfoDto } from "../../models";


interface BodyHealthInfoProps {
  info: BodyHealthInfoDto;
}

const BodyHealthInfo: React.FC<BodyHealthInfoProps> = ({ info }) => {
  console.log("🚀 ~ file: BodyHealthInfo.tsx:61 ~ info:", info);

  return (
    <ScrollArea className='h-5/6 w-100 rounded-md px-2'>
      {/* Create details list for BodyHealthInfoDto info with headers */}
      <div className='flex flex-col gap-3'>
        {info?.anthropometricMeasurements && (
          <div>
            <h2 className='font-semibold text-lg'>Anthropometric Measurements</h2>
            <ul>
              <li>Age: {info.anthropometricMeasurements.age ?? "--"}</li>
              <li>Weight: {info.anthropometricMeasurements.weight}</li>
              <li>Height: {info.anthropometricMeasurements.height}</li>
              <li>Waist Circumference: {info.anthropometricMeasurements.waistCircumference}</li>
              <li>Hip Circumference: {info.anthropometricMeasurements.hipCircumference}</li>
              <li>Chest Circumference: {info.anthropometricMeasurements.chestCircumference}</li>
              <li>Arm Circumference: {info.anthropometricMeasurements.armCircumference || "--"}</li>
              <li>Thigh Circumference: {info.anthropometricMeasurements.thighCircumference}</li>
              <li>Abdomen Circumference: {info.anthropometricMeasurements.abdomenCircumference}</li>
              <li>Triceps Circumference: {info.anthropometricMeasurements.tricepsCircumference}</li>
              <li>SupraIliac Circumference: {info.anthropometricMeasurements.supraIliacCircumference}</li>
              <li>Waist To Hip Ratio: {info.anthropometricMeasurements.waistToHipRatio}</li>
            </ul>
          </div>
        )}
        {info?.bodyComposition && (
          <div>
            <h2 className='font-semibold text-lg'>Body Composition</h2>
            <ul>
              <li>Body Mass Index: {info.bodyComposition.bodyMassIndex}</li>
              <li>Body Density: {info.bodyComposition.bodyDensity}</li>
              <li>Body Fat Percentage: {info.bodyComposition.bodyFatPercentage}</li>
            </ul>
          </div>
        )}

        {info?.cardiovascularFitness && (
          <div>
            <h2 className='font-semibold text-lg'>Cardiovascular Fitness</h2>
            <ul>
              <li>Resting Heart Rate: {info.cardiovascularFitness.restingHeartRate}</li>
              <li>Estimated Maximum Heart Rate: {info.cardiovascularFitness.estimatedMaximumHeartRate}</li>
              <li>Maximum Weight Lifted: {info.cardiovascularFitness.maximumWeightLifted}</li>
              <li>Reps: {info.cardiovascularFitness.reps}</li>
              <li>One Rep Max: {info.cardiovascularFitness.oneRepMax}</li>
            </ul>
          </div>
        )}

        {info?.endurance && (
          <div>
            <h2>Endurance</h2>
            <ul>
              <li>Muscular Endurance: {info.endurance.muscularEndurance}</li>
              <li>Cardiorespiratory Endurance: {info.endurance.cardiorespiratoryEndurance}</li>
            </ul>
          </div>
        )}

        {
          info?.flexibility && (
            <div>
              <h2>Flexibility</h2>
              <ul>
                <li>Sit And Reach: {info.flexibility.sitAndReach}</li>
              </ul>
            </div>
          )
        }

        {
          info?.lifestyle && (
            <div>
              <h2>Lifestyle</h2>
              <ul>
                <li>Activity Level: {info.lifestyle.activityLevel}</li>
                <li>Sleep Duration: {info.lifestyle.sleepDuration}</li>
              </ul>
            </div>
          )
        }
      </div>
    </ScrollArea>
  );
};

export default BodyHealthInfo;
