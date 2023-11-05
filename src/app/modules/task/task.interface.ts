

export interface Task {
  _id?: string;
  taskName: string;
  description: string;
  status: 'pending' | 'ongoing' | 'completed';
  userId: string; 
  createdAt: Date;
  updatedAt: Date;
}
