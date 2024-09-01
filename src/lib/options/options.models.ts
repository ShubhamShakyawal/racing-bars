import type { Action } from '../store';
import type { Data, WideData } from '../data';

export interface OptionsAction extends Action {
  payload: Partial<Options>;
}

export type DataTransformType = null | ((data: Data[] | WideData[]) => Data[] | WideData[]);

export interface Options {
  dataShape: 'long' | 'wide' | 'auto';
  dataType: 'json' | 'csv' | 'tsv' | 'xml' | 'auto';
  dataTransform: DataTransformType;
  fillDateGapsInterval: null | 'year' | 'month' | 'day';
  fillDateGapsValue: 'last' | 'interpolate';
  makeCumulative: boolean;
  title: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  subTitle: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  dateCounter: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  caption: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  startDate: string;
  endDate: string;
  loop: boolean;
  labelsPosition: 'inside' | 'outside';
  labelsWidth: number;
  showIcons: boolean;
  colorSeed: string | number;
  showGroups: boolean;
  tickDuration: number;
  topN: number;
  inputHeight: number | string;
  inputWidth: number | string;
  minHeight: number;
  minWidth: number;
  height: number | string;
  width: number | string;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  mouseControls: boolean;
  keyboardControls: boolean;
  controlButtons: 'all' | 'play' | 'none';
  overlays: 'all' | 'play' | 'repeat' | 'none';
  autorun: boolean;
  injectStyles: boolean;
  theme: string;
  colorMap: { [key: string]: string } | string[];
  fixedScale: boolean;
  fixedOrder: string[];
  highlightBars: boolean;
  selectBars: boolean;
}

export type TransformFn = (data: Data[] | WideData[]) => Data[] | WideData[];

export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
