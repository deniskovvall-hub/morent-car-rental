export type CarType = "Sport" | "Sedan" | "SUV" | "Hatchback" | "Coupe";

export interface Car {
  id: string;
  name: string;
  type: CarType;
  fuel: string;
  transmission: "Manual" | "Automatic";
  capacity: number;
  price: number;
  oldPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  liked?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
