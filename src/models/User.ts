export interface User {
    id: number;
    email: string;
    password: string; // hashed
    createdAt: Date;
}
