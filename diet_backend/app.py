import falcon
from resources import GetPredictionResource

class HelloWorld:
    def on_get(self, req, resp):
        resp.media = {'message': 'Hello, World!'}

app = falcon.App()
app.add_route('/', HelloWorld())
# prediction_resource = PredictionResource()
get_prediction_resource = GetPredictionResource()

# Routes
# app.add_route('/prediction', prediction_resource)
app.add_route('/get_predictions', get_prediction_resource)