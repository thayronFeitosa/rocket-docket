ARG IMAGE_VERSION=4.4
FROM mongo:${IMAGE_VERSION}

LABEL MAINTAINER="Thayron Matos <thayronf3@gmail.com>"

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update 
RUN apt-get upgrade -f -y

## Locale
RUN apt-get install -f -y --no-install-recommends locales locales-all
RUN sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen \
  && dpkg-reconfigure --frontend=noninteractive locales \
  && update-locale LANG=pt_BR.UTF-8

ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone