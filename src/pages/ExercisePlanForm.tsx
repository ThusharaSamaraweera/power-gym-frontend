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
import { useState, useEffect } from 'react';

const ExercisePlanForm = () => {
  const initialMeasurements = {
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
  };

  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [bmi, setBmi] = useState('');
  const [bodyDensity, setBodyDensity] = useState('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState('');
  const [whr, setWhr] = useState('');

  useEffect(() => {
    calculateDerivedValues();
  }, [measurements]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMeasurements({ ...measurements, [id]: value });
  };

  const handleGenderChange = (value) => {
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
      const bodyDensityValue = (
        1.2 * bmiValue +
        0.23 * (measurements.gender === 'male' ? 10 : 20) -
        5.4
      ).toFixed(2);
      setBodyDensity(bodyDensityValue);
      const bodyFatPercentageValue = (
        1.2 * bmiValue +
        0.23 * (measurements.gender === 'male' ? 10 : 20) -
        5.4
      ).toFixed(2);
      setBodyFatPercentage(bodyFatPercentageValue);
    }

    if (waist && hip) {
      const whrValue = (hip / waist).toFixed(2);
      setWhr(whrValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...measurements,
      bmi,
      bodyDensity,
      bodyFatPercentage,
      whr,
    };
    // Send data to backend
    fetch('/api/exercise-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClear = () => {
    setMeasurements(initialMeasurements);
    setBmi('');
    setBodyDensity('');
    setBodyFatPercentage('');
    setWhr('');
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Exercise Plan</CardTitle>
        <CardDescription>
          Please fill the form, according to attributes we will provide an
          exercise plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
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
              <Input
                id="weight"
                value={measurements.weight}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                value={measurements.height}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="waistCircumference">
                Waist Circumference (cm)
              </Label>
              <Input
                id="waistCircumference"
                value={measurements.waistCircumference}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hipCircumference">Hip Circumference (cm)</Label>
              <Input
                id="hipCircumference"
                value={measurements.hipCircumference}
                onChange={handleChange}
                type="number"
              />
            </div>
            {measurements.gender === 'male' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="chestCircumference">
                    Chest Circumference (cm)
                  </Label>
                  <Input
                    id="chestCircumference"
                    value={measurements.chestCircumference}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="abdomenCircumference">
                    Abdomen Circumference (cm)
                  </Label>
                  <Input
                    id="abdomenCircumference"
                    value={measurements.abdomenCircumference}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </>
            )}
            {measurements.gender === 'female' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tricepsCircumference">
                    Triceps Circumference (cm)
                  </Label>
                  <Input
                    id="tricepsCircumference"
                    value={measurements.tricepsCircumference}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="supraIliacCircumference">
                    Supra Iliac Circumference (cm)
                  </Label>
                  <Input
                    id="supraIliacCircumference"
                    value={measurements.supraIliacCircumference}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="thighCircumference">
                Thigh Circumference (cm)
              </Label>
              <Input
                id="thighCircumference"
                value={measurements.thighCircumference}
                onChange={handleChange}
                type="number"
              />
            </div>
          </div>
          <p className="font-bold text-lg mt-4">Your Calculated Metrics</p>
          <div className="grid w-full items-center gap-4 mt-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Waist-to-Hip Ratio (WHR)</Label>
              <Input value={whr} readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>BMI</Label>
              <Input value={bmi} readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Body Density</Label>
              <Input value={bodyDensity} readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Body Fat Percentage</Label>
              <Input value={bodyFatPercentage} readOnly />
            </div>
          </div>
          <br></br>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExercisePlanForm;
