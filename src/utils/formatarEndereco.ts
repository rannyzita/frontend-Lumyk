interface Estado {
    id: string;
    nome: string;
}

interface Endereco {
    id: string;
    rua: string;
    bairro: string;
    numero: string | number;
    id_estado: string;
}

export function formatarEndereco(end: Endereco, estados: Estado[]): string {
    const partes = [
        end.rua?.trim(),
        end.numero?.toString(),
        end.bairro?.trim(),
        estados.find((e) => e.id === end.id_estado)?.nome,
    ].filter(Boolean);

    return partes.join(', ');
}
