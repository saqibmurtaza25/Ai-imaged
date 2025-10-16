
import { Style, AspectRatio, Resolution } from './types';

export const STYLE_OPTIONS = Object.values(Style);
export const ASPECT_RATIO_OPTIONS = Object.values(AspectRatio);
export const RESOLUTION_OPTIONS = Object.values(Resolution);

export const API_ASPECT_RATIO_MAP: { [key in AspectRatio]: string } = {
  [AspectRatio.SQUARE]: '1:1',
  [AspectRatio.LANDSCAPE]: '16:9',
  [AspectRatio.PORTRAIT]: '9:16',
  [AspectRatio.STANDARD]: '4:3',
  [AspectRatio.TALL]: '3:4',
};
