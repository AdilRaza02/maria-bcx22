# coding: utf-8
import serial
import io
ser = serial.Serial('/dev/ttyACM1')
sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser))
sio.write(json.dumps({'num_device': 1, 'temperature': 0, 'light_r': 0, 'light_g': 255, 'light_b': 255}))
sio.flush()

