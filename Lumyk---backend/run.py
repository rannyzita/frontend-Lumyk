from backend.app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)



'''
    Para rodar o código e visualizar a documentação da API:
        python run.py
        http://127.0.0.1:5000/docs

'''