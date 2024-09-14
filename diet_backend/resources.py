import falcon
import pdb
from db_utils import get_db_connection
# from model_utils import load_model, make_prediction

class GetPredictionResource:
    def on_get(self, req, resp):
        connection = get_db_connection()
        try:
            # cursor = connection.cursor(dictionary=True)
            # cursor.execute("SELECT * FROM predictions")
            # result = cursor.fetchall()
            pdb.set_trace()
            result = {
                "recipes": {
                    "1": "",
                    "2": ""
                }
            }
            resp.media = result
        except Exception as e:
            resp.media = {"status": "error", "message": str(e)}
        finally:
            connection.close()