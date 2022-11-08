from azure.kusto.data import KustoClient, KustoConnectionStringBuilder
import datetime

cluster = "https://decbcxjizsbilou5rjw.westeurope.kusto.windows.net"
kcsb = KustoConnectionStringBuilder.with_az_cli_authentication(cluster)
client = KustoClient(kcsb)


def get_current_temperature(sensor_id):
    '''
        sensor_id = 1970003, 1970002
    '''
    db = "telemetry-db"
    query = f" RawData | where tostring(d) has '{sensor_id}' | extend ingestion_time = ingestion_time() | where ingestion_time > ago(1h) | order by ingestion_time desc | take 1"

    response = client.execute(db, query)

    data = []
    for row in response.tables[1].rows:
        res = row["d"]["dataPoints"]["quantity"][0]
        data.append({
            'id': res["identifier"].split(".")[0],
            'timestamp': datetime.datetime.strptime(res["timestamp"], "%Y-%m-%dT%H:%M:%S.%f0Z"),
            'temperature': res['value']})

    return data
