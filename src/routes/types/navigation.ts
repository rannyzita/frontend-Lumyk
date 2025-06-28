export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Profile: undefined;
    Authors: undefined;
    Book: { bookId: string};
    Register: undefined;
    ForgotPassword: undefined;
    VerifyCode: undefined;
    ResetPassword:  { codigo: string };
    AuthorDetails: { authorId: string};
    AccountDeleting: undefined;
    AccountDeleted: undefined;
    PaymentSubscription: { id: string};
    QrCode: {id: string};
    PaymentConcluded: undefined;
    DetailsHistory: { orderId: string };
}; 