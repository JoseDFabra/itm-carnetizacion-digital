import { IdType } from "./document-type.interface";

export interface User {
    id:       string;
    documentType:   IdType;
    fullName:     string;
    email:    string;
    password: string;
    isActive: boolean;
    role: 'Superadmin' | 'Admin'
}
