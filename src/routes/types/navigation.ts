export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Profile: undefined;
    Authors: undefined;
    Book: { bookId: string};
    Register: undefined;
    ForgotPassword: undefined;
    VerifyCode: undefined;
    ResetPassword: undefined;
    AuthorDetails: { authorId: string};
}; 