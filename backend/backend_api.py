import datetime

from flask import Blueprint, abort, request

from models import Temperature, db

backend_api = Blueprint('backend_api', __name__)


@backend_api.route("/api/be/sensorData/", methods=['POST'])
def sensor_light():
    data = request  .json
    if data.get('apiSecret') != '0123456':
        return abort(403)
    db.session.add(
        Temperature(
            sensor=data['sensorID'],
            value=data['value'],
            timestamp=datetime.datetime.fromisoformat(data['timestamp'])
            ))
    db.session.commit()
    return '', 201
