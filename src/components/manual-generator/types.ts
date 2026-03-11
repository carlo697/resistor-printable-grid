import type { SymbolType } from "../SymbolIcon.vue";

export type ImageType = "noImage" | "symbol" | "base64";

export interface ManualItem {
  id: number;
  title?: string;
  subTitle?: string;
  imageType?: ImageType;
  symbol?: SymbolType;
  color?: string;
  imageBase64?: string;
}
