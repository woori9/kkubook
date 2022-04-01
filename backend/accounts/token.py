import jwt
import datetime
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()


def create_token(payload, type):
    if type == 'access':
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    elif type == "refresh":
        # 2주
        exp = datetime.datetime.utcnow() + datetime.timedelta(weeks=2)
    else:
        raise Exception("Invalid tokenType")
    
    payload['exp'] = exp
    payload['iat'] = datetime.datetime.utcnow()
    encoded = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded


def get_request_user(request):
    if 'Authorization' not in request.headers:
        return False

    access_token = request.headers['Authorization'].split(' ')[1]

    try:
        data = jwt.decode(str(access_token), settings.SECRET_KEY, algorithms=settings.ALGORITHM) 
        user = User.objects.get(email=data['email'])
        return user
    except jwt.DecodeError:
        return False
    except User.DoesNotExist:
        return False
