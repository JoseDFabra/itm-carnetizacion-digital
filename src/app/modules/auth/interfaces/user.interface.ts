import { IdType } from "./document-type.interface";

export interface User {
    id:       string;
    documentType:   IdType;
    name:     string;
    email:    string;
    password: string;
    isActive: boolean;
}
