export interface RAsliderSettings {
  arrows?: boolean;
  duration?: number;
  animation?: string;
  visibileItem?: number;
  arrowLeftClass?: string;
  arrowRightClass?: string;
  offsetRight?: number;
  dots?: boolean;
  beforeChange?: (e: number) => void;
  infinity?: boolean;
  typeChange?: string;
  arrowLeftContent?: JSX.Element;
  arrowRightContent?: JSX.Element;
}

export interface Touches {
  start: number;
  end: number;
  endDetect: boolean;
  current: number;
}