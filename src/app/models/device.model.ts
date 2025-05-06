import { Category } from './category.model';

export interface Device {
  id?: number;
  categoryId: number;
  category?: Category;
  color: string;
  partNumber: number;
}
