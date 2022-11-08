import json

from flask import Blueprint
from sqlalchemy import func
from models import Temperature, Light, db
from math import floor
import fire_alarm


frontend_api = Blueprint('frontend_api', __name__)

@frontend_api.route("/api/fe/temperature/")
def sensor_temprature():
    data = []

    subquery = db.session.query(
        func.rank().over(
            order_by=Temperature.timestamp.desc(),
            partition_by=Temperature.sensor
            ).label('rank'), Temperature
        ).subquery()

    query = db.session.query(subquery).filter(subquery.c.rank == 1).all()

    for sensor in query:
        data.append({
            'id': sensor.sensor,
            'temperature': sensor.value,
            'timestamp': floor(sensor.timestamp.timestamp())
        })

    for sensor in fire_alarm.get_current_temperature(sensor_id=1970002) + fire_alarm.get_current_temperature(sensor_id=1970003):
        data.append({
            'id': sensor['id'],
            'temperature': round(sensor['temperature'],2    ),
            'timestamp': int(sensor['timestamp'].timestamp())
            })
    return json.dumps(data)


@frontend_api.route("/api/fe/light/")
def sensor_light():
    data = []

    subquery = db.session.query(
        func.rank().over(
            order_by=Light.timestamp.desc(),
            partition_by=Light.sensor
            ).label('rank'), Light
        ).subquery()

    query = db.session.query(subquery).filter(subquery.c.rank == 1).all()


    for sensor in query:
        data.append({
            'id': sensor.sensor,
            'lightIntensity': sensor.intensity,
            'lightColor': Light.color_name(sensor),
            'timestamp': int(sensor.timestamp.timestamp())
        })

    return json.dumps(data)
