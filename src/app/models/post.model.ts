export interface Post {
  userId: number;
  id?: number;      // opcional al crear
  title: string;
  body: string;
}