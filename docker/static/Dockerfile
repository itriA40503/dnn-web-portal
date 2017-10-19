# install nginx
FROM nginx:latest

LABEL maintainer="a40503 <itriA40503@itri.org.tw>"

# copy DNN webportal
COPY ./dnnwebportal/build /user/share/nginx/html/DNN
# copy nginx.conf (enable gzip)
COPY default.conf /etc/nginx/nginx.conf