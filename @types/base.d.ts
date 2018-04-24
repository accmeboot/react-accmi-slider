declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

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
  arrowLeftContent?: string;
  arrowRightContent?: string;
}
