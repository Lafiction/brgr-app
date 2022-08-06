import { SyntheticEvent } from 'react';

import {
  Button,
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ButtonFixed = Button as React.FC<{
  children: React.ReactNode;
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}>;

export const TabFixed = Tab as React.FC<{
  children: React.ReactNode;
  active: boolean;
  value: string;
  onClick: (value: string) => void;
}>;
