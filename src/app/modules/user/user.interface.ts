export interface TUser {
    id: string;
    password: string;
    needsPasswordChange?: boolean;
    role: "student" | "faculty" | "admin";
    status: 'in-progress' | 'blocked';
    isDeleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type NewUser ={
    password: string;
    role: string;
    id: string;
}