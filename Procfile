release: python manage.py migrate --setting=reddrop.production
web: gunicorn reddrop.wsgi --log-file -