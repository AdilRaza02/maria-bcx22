from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.Integer)


class Temperature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor = db.Column(db.Integer, db.ForeignKey(Sensor.id))
    value = db.Column(db.Float)
    timestamp = db.Column(db.TIMESTAMP, index=True)


class Light(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor = db.Column(db.Integer, db.ForeignKey(Sensor.id))
    color = db.Column(db.Float)
    intensity = db.Column(db.Float)
    timestamp = db.Column(db.TIMESTAMP, index=True)

    @staticmethod
    def color_name(cls):
        if cls.color <= 2800:
            return 'very warm'
        elif cls.color > 4000:
            return 'warm'
        else:
            return 'middle'
