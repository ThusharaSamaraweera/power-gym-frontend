import { members, trainer } from "../assets/data";
import AntdSelect from "../components/ui/AntdSelect";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState, useEffect } from "react";
import { BodyHealthInfoDto, BodyHealthInfoPayload } from "../models";
import userService from "../services/user.service";

const ExercisePlanForm = () => {
  const initialBodyHealthFormValues = {
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

  const [bodyHealthFormValues, setBodyHealthFormValues] = useState(initialBodyHealthFormValues);
  const [bmi, setBmi] = useState("");
  const [bodyDensity, setBodyDensity] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [waistToHipRadio, setWaistToHipRadio] = useState("");
  const [memberId, setMemberId] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");

  useEffect(() => {
    calculateDerivedValues();
  }, [bodyHealthFormValues]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setBodyHealthFormValues({ ...bodyHealthFormValues, [id]: value });
  };

  const handleGenderChange = (value: string) => {
    setBodyHealthFormValues({ ...bodyHealthFormValues, gender: value });
  };

  const calculateDerivedValues = () => {
    const heightM = parseFloat(bodyHealthFormValues.height) / 100;
    const weightKg = parseFloat(bodyHealthFormValues.weight);
    const waist = parseFloat(bodyHealthFormValues.waistCircumference);
    const hip = parseFloat(bodyHealthFormValues.hipCircumference);

    if (heightM && weightKg) {
      const bmiValue = (weightKg / (heightM * heightM)).toFixed(2);
      setBmi(bmiValue);

      // Replace these with the actual formulas you want to use
      const bodyDensityValue = (1.2 * parseFloat(bmiValue) + 0.23 * (bodyHealthFormValues.gender === "male" ? 10 : 20) - 5.4).toFixed(2);
      setBodyDensity(bodyDensityValue);
      const bodyFatPercentageValue = (1.2 * parseFloat(bmiValue) + 0.23 * (bodyHealthFormValues.gender === "male" ? 10 : 20) - 5.4).toFixed(2);
      setBodyFatPercentage(bodyFatPercentageValue);
    }

    if (waist && hip) {
      const whrValue = (hip / waist).toFixed(2);
      setWaistToHipRadio(whrValue);
    }

    if (bodyHealthFormValues?.resetingHeartRate) {
      const estimatedMaximumHeartRate = 220 - bodyHealthFormValues?.resetingHeartRate;
      setBodyHealthFormValues({ ...bodyHealthFormValues, estimatedMaximumHeartRate: estimatedMaximumHeartRate });
    }

    if (bodyHealthFormValues?.maximumWeight && bodyHealthFormValues?.reps) {
      const oneRepMax = Math.round(bodyHealthFormValues?.maximumWeight * (1 + bodyHealthFormValues?.reps * 0.0333));
      setBodyHealthFormValues({ ...bodyHealthFormValues, oneRepMax: oneRepMax });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const bodyHealthInfo: BodyHealthInfoDto = {
      anthropometricMeasurements: {
        abdomenCircumference: bodyHealthFormValues.abdomenCircumference,
        age: "0",
        weight: bodyHealthFormValues.weight,
        height: bodyHealthFormValues.height,
        waistCircumference: bodyHealthFormValues.waistCircumference,
        hipCircumference: bodyHealthFormValues.hipCircumference,
        chestCircumference: bodyHealthFormValues.chestCircumference,
        armCircumference: bodyHealthFormValues.armCircumference,
        thighCircumference: bodyHealthFormValues.thighCircumference,
        tricepsCircumference: bodyHealthFormValues.tricepsCircumference,
        supraIliacCircumference: bodyHealthFormValues.supraIliacCircumference,
        waistToHipRatio: waistToHipRadio,
      },
      bodyComposition: {
        bodyMassIndex: bmi,
        bodyDensity: bodyDensity,
        bodyFatPercentage: bodyFatPercentage,
      },
      cardiovascularFitness: {
        restingHeartRate: bodyHealthFormValues.resetingHeartRate.toString(),
        estimatedMaximumHeartRate: bodyHealthFormValues.estimatedMaximumHeartRate.toString(),
        maximumWeightLifted: bodyHealthFormValues.maximumWeight.toString(),
        reps: bodyHealthFormValues.reps.toString(),
        oneRepMax: bodyHealthFormValues.oneRepMax.toString(),
      },
    };

    const payload: BodyHealthInfoPayload = {
      bodyHealthInfo: bodyHealthInfo,
      note: "",
      verifiedBy: verifiedBy,
    };

    const res = await userService.createBodyHealthInfo(memberId, payload);
  };

  const handleClear = () => {
    setBodyHealthFormValues(initialBodyHealthFormValues);
    setBmi("");
    setBodyDensity("");
    setBodyFatPercentage("");
    setWaistToHipRadio("");
    setMemberId("");
    setVerifiedBy("");
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
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full items-center gap-4'>
                <div className='flex gap-2 items-center space-y-1.5 w-fit'>
                  <Label htmlFor='gender'>Select member</Label>
                  <AntdSelect
                    id='memberId'
                    options={members.map((member) => {
                      return { value: member?.id?.toString(), label: member?.name };
                    })}
                    value={memberId}
                    onChange={(value) => setMemberId(value)}
                  />
                </div>
                <div className='flex gap-2 items-center space-y-1.5 w-fit'>
                  <Label htmlFor='gender'>Verified by</Label>
                  <AntdSelect
                    id='verifiedBy'
                    options={trainer.map((trainer) => {
                      return { value: trainer?.id?.toString(), label: trainer?.name };
                    })}
                    value={verifiedBy}
                    onChange={(value) => setVerifiedBy(value)}
                  />
                </div>
              </div>
              <div>
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
                    <Input id='weight' value={bodyHealthFormValues.weight} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='height'>Height (cm)</Label>
                    <Input id='height' value={bodyHealthFormValues.height} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='waistCircumference'>Waist Circumference (cm)</Label>
                    <Input id='waistCircumference' value={bodyHealthFormValues.waistCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='hipCircumference'>Hip Circumference (cm)</Label>
                    <Input id='hipCircumference' value={bodyHealthFormValues.hipCircumference} onChange={handleChange} type='number' />
                  </div>
                  {bodyHealthFormValues.gender === "male" && (
                    <>
                      <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='chestCircumference'>Chest Circumference (cm)</Label>
                        <Input id='chestCircumference' value={bodyHealthFormValues.chestCircumference} onChange={handleChange} type='number' />
                      </div>
                      <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='abdomenCircumference'>Abdomen Circumference (cm)</Label>
                        <Input id='abdomenCircumference' value={bodyHealthFormValues.abdomenCircumference} onChange={handleChange} type='number' />
                      </div>
                    </>
                  )}
                  {bodyHealthFormValues.gender === "female" && (
                    <>
                      <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='tricepsCircumference'>Triceps Circumference (cm)</Label>
                        <Input id='tricepsCircumference' value={bodyHealthFormValues.tricepsCircumference} onChange={handleChange} type='number' />
                      </div>
                      <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='supraIliacCircumference'>Supra Iliac Circumference (cm)</Label>
                        <Input
                          id='supraIliacCircumference'
                          value={bodyHealthFormValues.supraIliacCircumference}
                          onChange={handleChange}
                          type='number'
                        />
                      </div>
                    </>
                  )}
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='thighCircumference'>Thigh Circumference (cm)</Label>
                    <Input id='thighCircumference' value={bodyHealthFormValues.thighCircumference} onChange={handleChange} type='number' />
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
                    <Label>Reseting Heart Rate</Label>
                    <Input id='resetingHeartRate' value={bodyHealthFormValues?.resetingHeartRate} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Estimated Maximum Heart Rate</Label>
                    <Input value={bodyHealthFormValues?.estimatedMaximumHeartRate} readOnly />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Waximum Wdeight</Label>
                    <Input id='maximumWeight' value={bodyHealthFormValues?.maximumWeight} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Reps</Label>
                    <Input id='reps' value={bodyHealthFormValues?.reps} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>One Rep Max</Label>
                    <Input value={bodyHealthFormValues?.oneRepMax} readOnly />
                  </div>
                </div>
              </div>

              <div>
                <p className='font-bold text-lg mt-4'>Flexibility</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Sit-and-Reach Test</Label>
                    <Input id='sitAndReachTest' value={bodyHealthFormValues?.sitAndReachTest} type='number' onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div>
                <p className='font-bold text-lg mt-4'>Endurance</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Muscular Endurance Test</Label>
                    <Input id='muscularEnduranceTest' value={bodyHealthFormValues?.muscularEnduranceTest} type='number' onChange={handleChange} />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label>Cardiorespiratory Endurance Tests</Label>
                    <Input
                      id='cardiorespiratoryEnduranceTest'
                      value={bodyHealthFormValues?.cardiorespiratoryEnduranceTest}
                      type='number'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className='font-bold text-lg mt-4'> Physical Activity Levels</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Daily Steps</Label>
                    <Input id='dailySteps' value={bodyHealthFormValues?.dailySteps} type='number' onChange={handleChange} />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label>Hydration Level</Label>
                    <Input id='hydrationLevel' value={bodyHealthFormValues?.hydrationLevel} type='number' onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* TODO: Add Goals and Preferences, Health Conditions */}

              <div>
                <p className='font-bold text-lg mt-4'>Lifestyle Factor</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 mt-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Average hours of sleep per night</Label>
                    <Input id='averageHoursofSleep' value={bodyHealthFormValues?.averageHoursofSleep} type='number' onChange={handleChange} />
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

export default ExercisePlanForm;
