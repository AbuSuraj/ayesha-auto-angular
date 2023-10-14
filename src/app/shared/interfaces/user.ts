export interface User {
    uid?: any;
    email: string | null | undefined;
    name: string | null | undefined;
    photoURL?: string;
    // emailVerified: boolean;
    userType: string
}
