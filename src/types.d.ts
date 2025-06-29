export type Supplement = {
  id: string;
  name: string;
  brand: string;
  category: 'vitamin' | 'mineral' | 'other';
  form: 'pill' | 'capsule' | 'liquid' | 'powder' | 'other';
  doses: Dose[] | EmptyDose;
  schedule: {
    days: string[];
    timeOfDay: string;
    condition: string;
  };
  notes?: string;
  createdAt: string;
};

type Unit = 'mg' | 'g' | 'μg';

export type Nutrient = {
  id: string;
  name: string;
  otherNames?: string;
  type: 'vitamin' | 'mineral' | 'other';
  defaultUnit: Unit;
};

type EmptyDose = {
  nutrient: string;
  amount: number;
  unit: Unit;
};

type Dose = {
  nutrient: Nutrient;
  amount: number;
  unit: Unit;
};
