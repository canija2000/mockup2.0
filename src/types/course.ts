export interface Course {
  id: string;
  name: string;
  hpw: number;
  cr: number;
  type: 0 | 1 | 2 | 3 | 4 | 5;
  weeklyData: number[];
}

export const courseTypeLabels: Record<number, string> = {
  0: 'Tipo 0',
  1: 'Tipo 1',
  2: 'Tipo 2',
  3: 'Tipo 3',
  4: 'Tipo 4',
  5: 'Tipo 5'
};