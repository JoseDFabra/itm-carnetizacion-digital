export interface Request {
    id:       string;
    fullName: string;
    reason:   string;
    profile:  string;
    observation:  string;
    date:     Date;
    photo: string,
    state: 'pending' | 'rejected' | 'approved' 
}
