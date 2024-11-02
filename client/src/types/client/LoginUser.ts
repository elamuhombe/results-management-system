export type ILoginUser = {
    email: string;
    password: string;
    userRole: 'admin' | 'student';
}