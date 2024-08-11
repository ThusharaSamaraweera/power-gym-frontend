import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ProgressRecord } from "../models";
import { useAppSelector } from "../state/hooks";
import { createProgressRecord } from "../services/progrssRecord.service";

const ProgressRecordsPage = () => {
  const initialProgresRecordFormValues = {
    weight: "",
    height: "",
    waistCircumference: "",
    hipCircumference: "",
    chestCircumference: "",
    armCircumference: "",
    thighCircumference: "",
    abdomenCircumference: "",
    tricepsCircumference: "",
    supraIliacCircumference: "",
    resetingHeartRate: 0,
    estimatedMaximumHeartRate: 0,
    maximumWeight: 0,
    reps: 0,
    oneRepMax: 0,
    sitAndReachTest: 0,
    muscularEnduranceTest: 0,
    cardiorespiratoryEnduranceTest: 0,
  };
  const user = useAppSelector((state) => state.global.user);
  const [bmi, setBmi] = useState("");
  const [bodyDensity, setBodyDensity] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [waistToHipRadio, setWaistToHipRadio] = useState("");
  const [progressRecordValues, setProgresRecordFormValues] = useState(initialProgresRecordFormValues);

  useEffect(() => {
    calculateDerivedValues();
  }, [progressRecordValues]);

  const calculateDerivedValues = () => {
    const heightM = parseFloat(progressRecordValues?.height) / 100;
    const weightKg = parseFloat(progressRecordValues?.weight);
    const waist = parseFloat(progressRecordValues?.waistCircumference);
    const hip = parseFloat(progressRecordValues?.hipCircumference);

    if (heightM && weightKg) {
      const bmiValue = (weightKg / (heightM * heightM)).toFixed(2);
      setBmi(bmiValue);

      // Replace these with the actual formulas you want to use
      const bodyDensityValue = (1.2 * parseFloat(bmiValue) + 0.23 * 10 - 5.4).toFixed(2);
      setBodyDensity(bodyDensityValue);
      const bodyFatPercentageValue = (1.2 * parseFloat(bmiValue) + 0.23 * 10 - 5.4).toFixed(2);
      setBodyFatPercentage(bodyFatPercentageValue);
    }

    if (waist && hip) {
      const whrValue = (hip / waist).toFixed(2);
      setWaistToHipRadio(whrValue);
    }

    if (progressRecordValues?.resetingHeartRate) {
      const estimatedMaximumHeartRate = 220 - progressRecordValues?.resetingHeartRate;
      setProgresRecordFormValues({ ...progressRecordValues, estimatedMaximumHeartRate: estimatedMaximumHeartRate });
    }

    if (progressRecordValues?.maximumWeight && progressRecordValues?.reps) {
      const oneRepMax = Math.round(progressRecordValues?.maximumWeight * (1 + progressRecordValues?.reps * 0.0333));
      setProgresRecordFormValues({ ...progressRecordValues, oneRepMax: oneRepMax });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProgresRecordFormValues({ ...progressRecordValues, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    try {
      if (!user) throw new Error("User not found");
      e.preventDefault();
      const progressRecord: ProgressRecord = {
        anthropometricMeasurements: {
          abdomenCircumference: progressRecordValues?.abdomenCircumference,
          weight: progressRecordValues?.weight,
          height: progressRecordValues?.height,
          waistCircumference: progressRecordValues?.waistCircumference,
          hipCircumference: progressRecordValues?.hipCircumference,
          chestCircumference: progressRecordValues?.chestCircumference,
          armCircumference: progressRecordValues?.armCircumference,
          thighCircumference: progressRecordValues?.thighCircumference,
          tricepsCircumference: progressRecordValues?.tricepsCircumference,
          supraIliacCircumference: progressRecordValues?.supraIliacCircumference,
          waistToHipRatio: waistToHipRadio,
        },
        bodyComposition: {
          bodyMassIndex: bmi,
          bodyDensity: bodyDensity,
          bodyFatPercentage: bodyFatPercentage,
        },
        cardiovascularFitness: {
          maximumWeightLifted: progressRecordValues?.maximumWeight.toString(),
          reps: progressRecordValues?.reps.toString(),
          oneRepMax: progressRecordValues?.oneRepMax.toString(),
        },
      };

      const payload = {
        note: '',
        progressRecord: progressRecord,
      };
      
      const res = await createProgressRecord(user?._id, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setProgresRecordFormValues(initialProgresRecordFormValues);
    setBmi("");
    setBodyDensity("");
    setBodyFatPercentage("");
  };

  return (
    <div className='w-100 h-screen'>
      <Card className='h-5/6'>
        <CardHeader>
          <CardTitle>Progress Records</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='w-full h-full'>
          <ScrollArea className='w-100 h-5/6 rounded-md px-2'>
            <form onSubmit={handleSubmit} className='px-2 gap-4'>
              <div>
                <p className='font-bold text-lg my-4'>Anthropometric Measurements</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='weight'>Weight (kg)</Label>
                    <Input id='weight' value={progressRecordValues?.weight} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='height'>Height (cm)</Label>
                    <Input id='height' value={progressRecordValues?.height} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='waistCircumference'>Waist Circumference (cm)</Label>
                    <Input id='waistCircumference' value={progressRecordValues?.waistCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='hipCircumference'>Hip Circumference (cm)</Label>
                    <Input id='hipCircumference' value={progressRecordValues?.hipCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='chestCircumference'>Chest Circumference (cm)</Label>
                    <Input id='chestCircumference' value={progressRecordValues?.chestCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='abdomenCircumference'>Abdomen Circumference (cm)</Label>
                    <Input
                      id='abdomenCircumference'
                      value={progressRecordValues?.abdomenCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='tricepsCircumference'>Triceps Circumference (cm)</Label>
                    <Input
                      id='tricepsCircumference'
                      value={progressRecordValues?.tricepsCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='supraIliacCircumference'>Supra Iliac Circumference (cm)</Label>
                    <Input
                      id='supraIliacCircumference'
                      value={progressRecordValues?.supraIliacCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='thighCircumference'>Thigh Circumference (cm)</Label>
                    <Input id='thighCircumference' value={progressRecordValues?.thighCircumference} onChange={handleChange} type='number' />
                  </div>
                </div>
              </div>

              <div>
                <p className='font-bold text-lg mt-4'>Body Composition</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>BMI</Label>
                    <Input value={bmi} readOnly />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Body Density</Label>
                    <Input value={bodyDensity} readOnly />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Body Fat Percentage</Label>
                    <Input value={bodyFatPercentage} readOnly />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Waist-to-Hip Ratio</Label>
                    <Input value={waistToHipRadio} readOnly />
                  </div>
                </div>
              </div>

              <div>
                <p className='font-bold text-lg mt-4'> Cardiovascular Fitness</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Waximum Weight</Label>
                    <Input id='maximumWeight' value={progressRecordValues?.maximumWeight} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Reps</Label>
                    <Input id='reps' value={progressRecordValues?.reps} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>One Rep Max</Label>
                    <Input value={progressRecordValues?.oneRepMax} readOnly />
                  </div>
                </div>
              </div>

              <CardFooter className='flex justify-between mt-3'>
                <Button variant='outline' onClick={handleClear}>
                  Clear
                </Button>
                <Button type='submit'>Submit</Button>
              </CardFooter>
            </form>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressRecordsPage;
