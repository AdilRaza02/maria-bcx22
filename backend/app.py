import datetime

from flask import Flask
from flask_cors import CORS

from backend_api import backend_api
from frontend_api import frontend_api
from models import Light, Temperature, db


app = Flask(__name__)
CORS(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)


app.register_blueprint(frontend_api)
app.register_blueprint(backend_api)


@app.cli.command("init-test-db")
def create_sample_data():
    with app.app_context():
        db.drop_all()
        db.create_all()
        for i in range(100):
            for s in range(3):
                t = Temperature(sensor=s, value=20.5,
                    timestamp=datetime.datetime.now() - datetime.timedelta(minutes=i))
                db.session.add(t)
        db.session.commit()

        for i in range(100):
            db.session.add(
                Light(sensor=s, color=2000,
                    timestamp=datetime.datetime.utcnow() - datetime.timedelta(minutes=i),
                 intensity=20)
            )
            db.session.add(
                Light(sensor=s, color=4200,
                      timestamp=datetime.datetime.utcnow() - datetime.timedelta(minutes=i),
                 intensity=80)
            )
            db.session.add(
                Light(sensor=s, color=3000,
                      timestamp=datetime.datetime.utcnow() - datetime.timedelta(minutes=i),
                 intensity=50)
            )
        db.session.commit()


@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r