import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

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
  const [bmi, setBmi] = useState("");
  const [bodyDensity, setBodyDensity] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [waistToHipRadio, setWaistToHipRadio] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = () => {};

  const handleClear = () => {};

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
                    <Input id='weight' value={initialProgresRecordFormValues?.weight} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='height'>Height (cm)</Label>
                    <Input id='height' value={initialProgresRecordFormValues?.height} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='waistCircumference'>Waist Circumference (cm)</Label>
                    <Input id='waistCircumference' value={initialProgresRecordFormValues?.waistCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='hipCircumference'>Hip Circumference (cm)</Label>
                    <Input id='hipCircumference' value={initialProgresRecordFormValues?.hipCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='chestCircumference'>Chest Circumference (cm)</Label>
                    <Input id='chestCircumference' value={initialProgresRecordFormValues?.chestCircumference} onChange={handleChange} type='number' />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='abdomenCircumference'>Abdomen Circumference (cm)</Label>
                    <Input
                      id='abdomenCircumference'
                      value={initialProgresRecordFormValues?.abdomenCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='tricepsCircumference'>Triceps Circumference (cm)</Label>
                    <Input
                      id='tricepsCircumference'
                      value={initialProgresRecordFormValues?.tricepsCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='supraIliacCircumference'>Supra Iliac Circumference (cm)</Label>
                    <Input
                      id='supraIliacCircumference'
                      value={initialProgresRecordFormValues?.supraIliacCircumference}
                      onChange={handleChange}
                      type='number'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='thighCircumference'>Thigh Circumference (cm)</Label>
                    <Input id='thighCircumference' value={initialProgresRecordFormValues?.thighCircumference} onChange={handleChange} type='number' />
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
                    <Input id='maximumWeight' value={initialProgresRecordFormValues?.maximumWeight} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Reps</Label>
                    <Input id='reps' value={initialProgresRecordFormValues?.reps} type='number' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>One Rep Max</Label>
                    <Input value={initialProgresRecordFormValues?.oneRepMax} readOnly />
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
