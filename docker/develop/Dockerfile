# install nginx
FROM nginx:stable

MAINTAINER a40503 itriA40503@itri.org.tw

# install librarys
RUN apt-get update
RUN apt-get install curl gnupg autoconf automake libtool nasm make pkg-config git -y
RUN apt-get install 'libpng*' -y 
RUN git clone https://github.com/mozilla/mozjpeg.git
RUN cd mozjpeg && autoreconf -fiv && ./configure && make && make install
RUN cd ..
# RUN apt-get install libpng-dev -y  
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install nodejs -y
RUN npm install npm -g

# coy project
COPY ./dnnwebportal /dnnwebportal
RUN cd /dnnwebportal
RUN npm install
RUN npm run build
RUN cp -r build /user/share/nginx/html/DNN
# copy nginx.conf (enable gzip)
COPY ./nginx/default.conf /etc/nginx/nginx.conf
# copy default.conf (change default path)
COPY ./nginx/conf.d/default.conf /etc/nginx/ conf.d/default.conf

RUN nginx -s reload