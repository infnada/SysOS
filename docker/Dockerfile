FROM centos:7

MAINTAINER SysOS

WORKDIR /var/www

RUN yum -y update && \
curl -sL https://rpm.nodesource.com/setup_12.x | bash - && \
yum -y install git gcc-c++ make nodejs && \
yum clean all

RUN git clone --single-branch --branch ng7modular https://github.com/infnada/SysOS.git . && \
npm install


RUN npm run build

EXPOSE 8080

ENTRYPOINT ["node", "dist/SysOS/index.js"]
