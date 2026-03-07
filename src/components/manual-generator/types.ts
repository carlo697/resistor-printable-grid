import type { SymbolType } from "../SymbolIcon.vue";

export type ImageType = "noImage" | "symbol";

export interface ManualItem {
  id: number;
  title?: string;
  subTitle?: string;
  imageType?: ImageType;
  symbol?: SymbolType;
  color?: string;
}
