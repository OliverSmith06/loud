export interface Item {
    id: number;
    name: string;
    category: number; // Foreign key of item category
    desc?: string;
    itemURL?: string;
    itemImgUrl?: string;
    location?: string;
    price?: number;
  }