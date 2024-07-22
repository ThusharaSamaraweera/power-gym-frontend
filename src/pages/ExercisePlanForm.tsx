import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState, useEffect } from "react";

const ExercisePlanForm = () => {
  const initialMeasurements = {
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
    gender: "",
    resetingHeartRate: 0,
    estimatedMaximumHeartRate: 0,
    maximumWeight: 0,
    reps: 0,
    oneRepMax: 0,
    sitAndReachTest: 0,
    muscularEnduranceTest: 0,
    cardiorespiratoryEnduranceTest: 0,
    dailySteps: 0,
    hydrationLevel: 0,
    fitnessGoals: [],
    exercisePreferences: [],
    medicalHistory: [],
    averageHoursofSleep: 0,
  };

  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [bmi, setBmi] = useState("");
  const [bodyDensity, setBodyDensity] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [waistToHipRadio, setWaistToHipRadio] = useState("");

  useEffect(() => {
    calculateDerivedValues();
  }, [measurements]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setMeasurements({ ...measurements, [id]: value });
  };

  const handleGenderChange = (value: string) => {
    setMeasurements({ ...measurements, gender: value });
  };

  const calculateDerivedValues = () => {
    const heightM = parseFloat(measurements.height) / 100;
    const weightKg = parseFloat(measurements.weight);
    const waist = parseFloat(measurements.waistCircumference);
    const hip = parseFloat(measurements.hipCircumference);

    if (heightM && weightKg) {
      const bmiValue = (weightKg / (heightM * heightM)).toFixed(2);
      setBmi(bmiValue);

      // Replace these with the actual formulas you want to use
      const bodyDensityValue = (1.2 * parseFloat(bmiValue) + 0.23 * (measurements.gender === "male" ? 10 : 20) - 5.4).toFixed(2);
      setBodyDensity(bodyDensityValue);
      const bodyFatPercentageValue = (1.2 * parseFloat(bmiValue) + 0.23 * (measurements.gender === "male" ? 10 : 20) - 5.4).toFixed(2);
      setBodyFatPercentage(bodyFatPercentageValue);
    }

    if (waist && hip) {
      const whrValue = (hip / waist).toFixed(2);
      setWaistToHipRadio(whrValue);
    }

    if(measurements?.resetingHeartRate) {
      const estimatedMaximumHeartRate = 220 - measurements?.resetingHeartRate;
      setMeasurements({...measurements, estimatedMaximumHeartRate: estimatedMaximumHeartRate});
    }

    if(measurements?.maximumWeight && measurements?.reps) {
      const oneRepMax = Math.round(measurements?.maximumWeight * (1 + (measurements?.reps * 0.0333 )));
      setMeasurements({...measurements, oneRepMax: oneRepMax});
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      ...measurements,
      bmi,
      bodyDensity,
      bodyFatPercentage,
      waistToHipRadio,
    };
    console.log("🚀 ~ file: ExercisePlanForm.tsx:94 ~ handleSubmit ~ data:", data)
  //   // Send data to backend
  //   fetch("/api/exercise-plan", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  };

  const handleClear = () => {
    setMeasurements(initialMeasurements);
    setBmi("");
    setBodyDensity("");
    setBodyFatPercentage("");
    setWaistToHipRadio("");
  };

  return (
    <div className='w-100 h-screen'>
      <Card className='h-5/6'>
        <CardHeader>
          <CardTitle>Exercise Plan</CardTitle>
          <CardDescription>Please fill the form, according to attributes we will provide an exercise plan.</CardDescription>
        </CardHeader>
        <CardContent className='w-full h-full'>
          <ScrollArea className='w-100 h-5/6 rounded-md px-2'>
            <form onSubmit={handleSubmit} className='px-2 gap-4'>
              <p className='font-bold text-lg my-4'>Anthropometric Measurements</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select onValueChange={handleGenderChange}>
                    <SelectTrigger id='gender'>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='weight'>Weight (kg)</Label>
                  <Input id='weight' value={measurements.weight} onChange={handleChange} type='number' />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='height'>Height (cm)</Label>
                  <Input id='height' value={measurements.height} onChange={handleChange} type='number' />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='waistCircumference'>Waist Circumference (cm)</Label>
                  <Input id='waistCircumference' value={measurements.waistCircumference} onChange={handleChange} type='number' />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='hipCircumference'>Hip Circumference (cm)</Label>
                  <Input id='hipCircumference' value={measurements.hipCircumference} onChange={handleChange} type='number' />
                </div>
                {measurements.gender === "male" && (
                  <>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='chestCircumference'>Chest Circumference (cm)</Label>
                      <Input id='chestCircumference' value={measurements.chestCircumference} onChange={handleChange} type='number' />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='abdomenCircumference'>Abdomen Circumference (cm)</Label>
                      <Input id='abdomenCircumference' value={measurements.abdomenCircumference} onChange={handleChange} type='number' />
                    </div>
                  </>
                )}
                {measurements.gender === "female" && (
                  <>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='tricepsCircumference'>Triceps Circumference (cm)</Label>
                      <Input id='tricepsCircumference' value={measurements.tricepsCircumference} onChange={handleChange} type='number' />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='supraIliacCircumference'>Supra Iliac Circumference (cm)</Label>
                      <Input id='supraIliacCircumference' value={measurements.supraIliacCircumference} onChange={handleChange} type='number' />
                    </div>
                  </>
                )}
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='thighCircumference'>Thigh Circumference (cm)</Label>
                  <Input id='thighCircumference' value={measurements.thighCircumference} onChange={handleChange} type='number' />
                </div>
              </div>
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
              <p className='font-bold text-lg mt-4'> Cardiovascular Fitness</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Reseting Heart Rate</Label>
                  <Input id='resetingHeartRate' value={measurements?.resetingHeartRate} type='number' onChange={handleChange} />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Estimated Maximum Heart Rate</Label>
                  <Input value={measurements?.estimatedMaximumHeartRate} readOnly />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Waximum Wdeight</Label>
                  <Input id='maximumWeight' value={measurements?.maximumWeight} type='number' onChange={handleChange} />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Reps</Label>
                  <Input id='reps' value={measurements?.reps} type='number' onChange={handleChange} />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label>One Rep Max</Label>
                  <Input value={measurements?.oneRepMax} readOnly />
                </div>
              </div>
              <p className='font-bold text-lg mt-4'>Flexibility</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Sit-and-Reach Test</Label>
                  <Input id='sitAndReachTest' value={measurements?.sitAndReachTest} type='number' onChange={handleChange} />
                </div>
              </div>
              <p className='font-bold text-lg mt-4'>Endurance</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Muscular Endurance Test</Label>
                  <Input id='muscularEnduranceTest' value={measurements?.muscularEnduranceTest} type='number' onChange={handleChange} />
                </div>

                <div className='flex flex-col space-y-1.5'>
                  <Label>Cardiorespiratory Endurance Tests</Label>
                  <Input
                    id='cardiorespiratoryEnduranceTest'
                    value={measurements?.cardiorespiratoryEnduranceTest}
                    type='number'
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p className='font-bold text-lg mt-4'> Physical Activity Levels</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Daily Steps</Label>
                  <Input id='dailySteps' value={measurements?.dailySteps} type='number' onChange={handleChange} />
                </div>

                <div className='flex flex-col space-y-1.5'>
                  <Label>Hydration Level</Label>
                  <Input id='hydrationLevel' value={measurements?.hydrationLevel} type='number' onChange={handleChange} />
                </div>
              </div>

              {/* TODO: Add Goals and Preferences, Health Conditions */}

              <p className='font-bold text-lg mt-4'>Lifestyle Factor</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label>Average hours of sleep per night</Label>
                  <Input id='averageHoursofSleep' value={measurements?.averageHoursofSleep} type='number' onChange={handleChange} />
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

export default ExercisePlanForm;
