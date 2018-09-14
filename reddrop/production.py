import dj_database_url
from .settings import *

ENVIRONMENT = 'production'
DEBUG = True

ALLOWED_HOSTS = ['*']
DATABASES['default'] = dj_database_url.config(
    default='postgres://obmgnlyaplmewn:2b189daf051dd5d019b1820f59a9f2eeb14a3baa742265000af857d8e4e616dd@ec2-23-23-253-106.compute-1.amazonaws.com:5432/d58gq3m68j8njj'
)

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
    }
}