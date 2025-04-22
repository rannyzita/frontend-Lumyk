from flask.cli import FlaskGroup
from backend.app import create_app
from backend.app.db.config import db

app = create_app()
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
