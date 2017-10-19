# install nginx
FROM nginx:stable

LABEL maintainer="a40503 <itriA40503@itri.org.tw>"

# install librarys
RUN apt-get update
RUN apt-get install curl gnupg autoconf automake libtool nasm make pngquant pkg-config git -y 
RUN apt-get install 'libpng*' -y 
RUN git clone https://github.com/mozilla/mozjpeg.git
RUN cd mozjpeg && autoreconf -fiv && ./configure && make && make install && cd ..
# RUN apt-get install libpng-dev -y  
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && RUN apt-get install nodejs -y && npm install npm -g
# coy project
COPY ./dnnwebportal /dnnwebportal
# install web modules and build
RUN cd /dnnwebportal && npm install && npm run build && cp -r build /user/share/nginx/html/DNN
# copy nginx.conf (enable gzip)
COPY ./nginx/default.conf /etc/nginx/nginx.conf
# copy default.conf (change default path)
COPY ./nginx/conf.d/default.conf /etc/nginx/ conf.d/default.conf

RUN nginx -s reload