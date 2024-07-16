import * as React from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useState } from 'react';


const ExercisePlanForm = () => {
  const [measurements, setMeasurements] = useState({
    weight: '',
    height: '',
    waistCircumference: '',
    hipCircumference: '',
    chestCircumference: '',
    armCircumference: '',
    thighCircumference: '',
    abdomenCircumference: '',
    tricepsCircumference: '',
    supraIliacCircumference: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMeasurements({ ...measurements, [id]: value });
  };

  const handleGenderChange = (value) => {
    setMeasurements({ ...measurements, gender: value });
  };

  const calculateWHR = () => {
    const waist = parseFloat(measurements.waistCircumference);
    const hip = parseFloat(measurements.hipCircumference);
    if (waist && hip) {
      return (hip / waist).toFixed(2);
    }
    return '';
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Exercise Plan</CardTitle>
        <CardDescription>
          Please fill the form, according to attributes we will provide an exercise plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={handleGenderChange}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" value={measurements.weight} onChange={handleChange} type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" value={measurements.height} onChange={handleChange} type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="waistCircumference">Waist Circumference (cm)</Label>
              <Input id="waistCircumference" value={measurements.waistCircumference} onChange={handleChange} type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hipCircumference">Hip Circumference (cm)</Label>
              <Input id="hipCircumference" value={measurements.hipCircumference} onChange={handleChange} type="number" />
            </div>
            {measurements.gender === 'male' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="chestCircumference">Chest Circumference (cm)</Label>
                  <Input id="chestCircumference" value={measurements.chestCircumference} onChange={handleChange} type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="abdomenCircumference">Abdomen Circumference (cm)</Label>
                  <Input id="abdomenCircumference" value={measurements.abdomenCircumference} onChange={handleChange} type="number" />
                </div>
              </>
            )}
            {measurements.gender === 'female' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tricepsCircumference">Triceps Circumference (cm)</Label>
                  <Input id="tricepsCircumference" value={measurements.tricepsCircumference} onChange={handleChange} type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="supraIliacCircumference">Supra Iliac Circumference (cm)</Label>
                  <Input id="supraIliacCircumference" value={measurements.supraIliacCircumference} onChange={handleChange} type="number" />
                </div>
              </>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="thighCircumference">Thigh Circumference (cm)</Label>
              <Input id="thighCircumference" value={measurements.thighCircumference} onChange={handleChange} type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Waist-to-Hip Ratio (WHR)</Label>
              <Input value={calculateWHR()} readOnly />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default ExercisePlanForm;
