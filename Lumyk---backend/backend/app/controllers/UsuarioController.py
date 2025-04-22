from backend.app.models.Usuario import Usuario
from backend.app.db.config import db
from datetime import datetime
from flask_jwt_extended import jwt_required
import bcrypt
import uuid

def listar_usuarios():
    usuarios = Usuario.query.all()
    return [{
        'id': usuario.id,
        'nome': usuario.nome,
        'email': usuario.email,
        'senha': usuario.senha,
        'data_nascimento': usuario.data_nascimento.strftime('%Y-%m-%d') if usuario.data_nascimento else None
    } for usuario in usuarios], 200

def buscar_usuario_por_id(id):
    usuario = Usuario.query.get_or_404(id)
    return {
        'id': usuario.id,
        'nome': usuario.nome,
        'email': usuario.email,
        'data_nascimento': usuario.data_nascimento.strftime('%Y-%m-%d') if usuario.data_nascimento else None
    }, 200

''' def criar_usuario(data):
    nome = data.get('nome')
    email = data.get('email')

    if Usuario.query.filter_by(nome=nome).first():
        return {'mensagem': 'O nome já está em uso.'}, 400

    if Usuario.query.filter_by(email=email).first():
        return {'mensagem': 'O email já está em uso.'}, 400

    try:
        data_nascimento = datetime.strptime(data['data_nascimento'], '%Y-%m-%d')
    except ValueError:
        return {'mensagem': 'Data de nascimento inválida. Use o formato YYYY-MM-DD.'}, 400

    novo_usuario = Usuario(
        id=str(uuid.uuid4()),
        nome=nome,
        email=email,
        senha=data['senha'],  # SEM HASH ainda em usuario
        data_nascimento=data_nascimento
    )

    db.session.add(novo_usuario)
    db.session.commit()
    return {'mensagem': 'Usuário criado com sucesso!'}, 201 '''


@jwt_required()
def atualizar_usuario(id, data):
    usuario = Usuario.query.get_or_404(id)

    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    data_nascimento_str = data.get('data_nascimento')

    if nome and nome != usuario.nome:
        if Usuario.query.filter(Usuario.nome == nome, Usuario.id != usuario.id).first():
            return {'mensagem': 'O nome já está em uso.'}, 400
        usuario.nome = nome

    if email and email != usuario.email:
        if Usuario.query.filter(Usuario.email == email, Usuario.id != usuario.id).first():
            return {'mensagem': 'O email já está em uso.'}, 400
        usuario.email = email

    # Atualização de senha (com hash)
    if senha:
        usuario.senha = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    if data_nascimento_str:
        try:
            data_nascimento = datetime.strptime(data_nascimento_str, '%Y-%m-%d')
        except ValueError:
            return {'mensagem': 'Data de nascimento inválida. Use o formato YYYY-MM-DD.'}, 400

        # Validação de idade mínima (14 anos)
        hoje = datetime.today()
        idade_minima = hoje.replace(year=hoje.year - 14)

        if data_nascimento > idade_minima:
            return {'mensagem': 'É necessário ter pelo menos 14 anos para atualizar os dados.'}, 400

        usuario.data_nascimento = data_nascimento

    db.session.commit()
    return {'mensagem': 'Usuário atualizado com sucesso!'}, 200


@jwt_required()
def deletar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return {'mensagem': 'Usuário deletado com sucesso!'}
