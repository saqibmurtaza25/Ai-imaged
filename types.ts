
export enum Style {
  REALISTIC = 'Realistic',
  CINEMATIC = 'Cinematic',
  PRODUCT = 'Product Shot',
  MACRO = 'Macro',
  ARCHITECTURAL = 'Architectural',
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  STANDARD = '4:3',
  TALL = '3:4',
}

export enum Resolution {
  HD = '1080p',
  QHD = '2K',
  UHD = '4K',
}

export interface GenerationOptions {
  prompt: string;
  style: Style;
  aspectRatio: AspectRatio;
  resolution: Resolution;
}
