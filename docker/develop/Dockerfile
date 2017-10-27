# using nginx
FROM nginx:stable

LABEL maintainer="a40503 <itriA40503@itri.org.tw>"

# install librarys
RUN apt-get update
RUN apt-get install curl gnupg autoconf automake libtool nasm make pngquant pkg-config git 'libpng*' -y 
# install nodejs and update npm 
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs -y && npm install npm -g
# coy project
COPY ./dnnwebportal /dnnwebportal
# install web modules and build
RUN cd /dnnwebportal && npm install && npm run build 
RUN cp -r /dnnwebportal/build/ /usr/share/nginx/html/ && mv /usr/share/nginx/html/build /usr/share/nginx/html/DNN 
# copy nginx.conf (enable gzip)
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# copy default.conf (change default path)
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
