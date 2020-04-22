export interface Weather {
  name?: string;
  id?: number;
  icon?: string;
  description?: string;
  temp?: number;
  main?: string;
  minMaxTemp?: MinMaxInterface;
  date?: string;
}

interface MinMaxInterface {
  date?: number;
  day?: number;
  month?: number;
  min?: number;
  max?: number;
}
