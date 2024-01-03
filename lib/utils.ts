import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getContrastYIQ = (backgroundColor: string) => {
  const rgbMatch = backgroundColor.match(/\d+/g); // 提取出 RGB 数值
  const [r, g, b] = rgbMatch!.map(Number);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
};


export function generateColor(str: string) {
  const backgroundColor = stc(str);
  return {
    backgroundColor,
    color: getContrastYIQ(backgroundColor.substring(1))
  }
}
