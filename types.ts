
import { ReactNode } from 'react';

export interface StyleOption {
  id: string;
  label: string;
  desc: string;
  keyword: string;
}

export interface SubStyleOption {
  id: string;
  label: string;
  keyword: string;
}

export interface SubStyleGroup {
  category: string;
  options: SubStyleOption[];
}

export interface ColorOption {
  id: string;
  label: string;
  desc: string;
  keyword: string;
}

export interface LayoutOption {
  id: string;
  label: string;
  desc: string;
  keyword: string;
}

export interface LayoutCategory {
  name: string;
  options: LayoutOption[];
}

export interface OrientationOption {
  id: string;
  label: string;
  desc: string;
  keyword: string;
  icon: ReactNode;
}
