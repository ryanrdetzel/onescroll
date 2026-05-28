FROM nginx:alpine
COPY index.html manifest.json /usr/share/nginx/html/
COPY topics/ /usr/share/nginx/html/topics/
COPY _shared/ /usr/share/nginx/html/_shared/
EXPOSE 80
