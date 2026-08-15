export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type AgeRange = '18-24' | '25-29' | '30-34' | '35-39' | '40-44' | '45-49' | '50-54' | '55-59' | '60-64' | '65+';

export enum Race {
  ANY = 'ANY',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  HISPANIC = 'HISPANIC',
  ASIAN = 'ASIAN',
  OTHER = 'OTHER'
}

export enum EducationLevel {
  ANY = 'ANY',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  SOME_COLLEGE = 'SOME_COLLEGE',
  BACHELORS = 'BACHELORS',
  MASTERS = 'MASTERS',
  DOCTORATE = 'DOCTORATE'
}

export enum MaritalPreference {
  SINGLE_ONLY = 'SINGLE_ONLY',
  DONT_CARE = 'DONT_CARE'
}

export enum ReligionPreference {
  ANY = 'ANY',
  CHRISTIAN = 'CHRISTIAN',
  JEWISH = 'JEWISH',
  MUSLIM = 'MUSLIM',
  HINDU = 'HINDU',
  BUDDHIST = 'BUDDHIST'
}

export enum PoliticalPreference {
  ANY = 'ANY',
  REPUBLICAN = 'REPUBLICAN',
  DEMOCRAT = 'DEMOCRAT',
  INDEPENDENT = 'INDEPENDENT'
}

export enum LocationScope {
  SAME_CITY = 'SAME_CITY',
  SAME_STATE = 'SAME_STATE',
  SAME_COUNTRY = 'SAME_COUNTRY',
  OPEN = 'OPEN'
}

export enum DelusionTier {
  GROUNDED = 'GROUNDED',
  REASONABLE = 'REASONABLE',
  SELECTIVE = 'SELECTIVE',
  PICKY = 'PICKY',
  UNICORN_HUNTER = 'UNICORN_HUNTER',
  DELUSIONAL = 'DELUSIONAL'
}

export interface CriteriaState {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight?: number;
  minIncome: number;
  maritalPref: MaritalPreference;
  excludeObese: boolean;
  selectedRaces: Race[];
  minEducation: EducationLevel;
  location: LocationScope;
  religion: ReligionPreference;
  politics: PoliticalPreference;
  noChildren: boolean;
  noDrugUse: boolean;
  noCriminalRecord: boolean;
  noSmoking: boolean;
  requireStraight: boolean;
}

export interface DelusionResult {
  matchPercentage: number;
  matchRatio: string;
  delusionScore: number;
  tier: DelusionTier;
  tierLabel: string;
  tierEmoji: string;
  tierColor: string;
  catchphrase: string;
}

export interface IncomeBracket {
  min: number;
  max: number | null;
  percentage: number;
  cumulative: number;
}

export interface FilterBreakdown {
  filterName: string;
  probability: number;
  label: string;
}
