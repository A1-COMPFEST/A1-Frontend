export interface PurchasedCourse {
  id: number;
  name: string;
  slug: string;
  instructor_id: number;
  instructor_name: string;
  category_id: number;
  category_name: string;
  description: string;
  syllabus: string;
  image: string;
  price: number;
  level: string;
  average_rating: string;
  created_at: string;
  updated_at: string;
}
export interface Content {
  id: number;
  course_id: number;
  title: string;
  description: string;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: number;
  rating: number;
  comments: string;
  user_name: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment { 
  id : number;
  course_id : number;
  task : string;
  due_date : string;
  created_at : string;
  updated_at : string;
}