interface Endereco {
    id: string;
    rua: string;
    bairro: string;
    numero: string;
    id_estado: string;
}

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
    QrCode: {
        selectedBookIds: string[];
        formaPagamento: 'pix' | 'dinheiro';
        enderecoSelecionado: Endereco;
        valorTotal: number;
    };
    PaymentConcluded: undefined;
    DetailsHistory: { orderId: string };
    PaymentBook: { selectedBookIds: string[] };
    Address: undefined;
}; 