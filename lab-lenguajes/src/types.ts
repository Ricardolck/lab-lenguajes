export type Roast = "light" | "medium" | "dark";

export interface Coffee {
  readonly id: number;
  name: string;
  origin: string;
  notes: string[]; // notas de cata
  roast: Roast;
  price: number; // en euros
  stock: number; // bolsas disponibles
  discount?: number; // 0.1 significa un 10 %
}

export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  address?: Address;
  preferences?: {
    grind?: "grano" | "molido";
    newsletter?: boolean;
  };
}
