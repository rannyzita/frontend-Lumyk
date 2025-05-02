import uuid
from backend.app.db.config import db
from sqlalchemy.orm import relationship

class Pedido(db.Model):
    __tablename__ = 'Pedido'

    # o id coloquei em string porque tô usando o uuid para gerar um id único ele é dado em: c3c42be5-ca13-4a58-89a1-80d0f3775026
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey('Usuario.id', ondelete='CASCADE', name='fk_pedido_usuario'),
        nullable=False
    )
    id_endereco = db.Column(
        db.Integer,
        db.ForeignKey('Endereco.id', ondelete='CASCADE', name='fk_pedido_endereco'),
        nullable=False
    )
    id_pagamento = db.Column(
        db.Integer,
        db.ForeignKey('Pagamento.id', ondelete='SET NULL', name='fk_pedido_pagamento'),
        nullable=True
    )

    total = db.Column(db.Float, nullable=False)
    data_compra = db.Column(db.Date, nullable=False)
    taxa_frete = db.Column(db.Float, nullable=False)
    
    # Relacionamentos
    usuario = relationship('Usuario', backref='pedidos')
    endereco = relationship('Endereco', backref='pedidos')
    pagamento = relationship('Pagamento', backref='pedidos')
    
    
    #item_pedido
    '''itens_pedido = relationship(  
        "ItemPedido",
        backref="pedido_relacionado",
        cascade="all, delete-orphan",
        passive_deletes=True
    )'''
    
    def to_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "usuario": {
                "id": self.usuario.id,
                "nome": self.usuario.nome
            } if self.usuario else None,

            "id_endereco": self.id_endereco,
            "endereco": {
                "id": self.endereco.id,
                "rua": self.endereco.rua,
                "bairro": self.endereco.bairro,
                "numero": self.endereco.numero
            } if self.endereco else None,

            "id_pagamento": self.id_pagamento,
            "pagamento": {
                "id": self.pagamento.id if self.pagamento else None,
                "forma_pagamento": self.pagamento.forma_pagamento if self.pagamento else None
            } if self.pagamento else None,

            "total": self.total,
            "data_compra": self.data_compra.isoformat(),
            "taxa_frete": self.taxa_frete,

            # Itens do pedido - Aqui estamos incluindo o `to_dict` de cada `ItemPedido`
            #"itens_pedido": [item.to_dict() for item in self.itens_pedido] if self.itens_pedido else []
        }