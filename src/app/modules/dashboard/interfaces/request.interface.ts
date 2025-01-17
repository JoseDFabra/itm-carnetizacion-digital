export interface Request {
    id:       string;
    fullName: string;
    reason:   string;
    profile:  string;
    date:     Date;
    photo: string,
    state: 'pending' | 'rejected' | 'approved' 
}
