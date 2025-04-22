from flask_restx import Namespace, Resource, fields
from flask import request
from backend.app.controllers import UsuarioController
from flask_jwt_extended import jwt_required, get_jwt_identity


api = Namespace('usuarios', description='Operações relacionadas a usuários')

usuario_model = api.model('Usuario', {
    'nome': fields.String(required=True),
    'email': fields.String(required=True),
    'senha': fields.String(required=True),
    'data_nascimento': fields.String(required=True, description='Formato: YYYY-MM-DD')
})

# Exemplo de ativação do POST
# @api.expect(usuario_model)
# @api.doc(description="Criar novo usuário")
# def post(self):
#     data = request.json
#     return UsuarioController.criar_usuario(data)
    
@api.route('/')
class ListarUsuarios(Resource):
    @api.doc(description="Listar todos os usuários")
    def get(self):
        return UsuarioController.listar_usuarios()

@api.route('/<string:id>')
class BuscarUsuarioPorId(Resource):
    @api.doc(description="Buscar usuário por ID")
    def get(self, id):
        return UsuarioController.buscar_usuario_por_id(id)

@api.route('/<string:id>/atualizar')
class AtualizarUsuario(Resource):
    @api.expect(usuario_model)
    @api.doc(description="Atualizar um usuário por ID")
    @jwt_required()
    def put(self, id):
        usuario_id_token = get_jwt_identity()
        if usuario_id_token != id:
            return {'mensagem': 'Ação não autorizada!'}, 403
        return UsuarioController.atualizar_usuario(id, request.json)

@api.route('/<string:id>/deletar')
class DeletarUsuario(Resource):
    @api.doc(description="Deletar um usuário por ID")
    @jwt_required()
    def delete(self, id):
        usuario_id_token = get_jwt_identity()
        if usuario_id_token != id:
            return {'mensagem': 'Ação não autorizada!'}, 403
        return UsuarioController.deletar_usuario(id)