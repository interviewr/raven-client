SHELL = /bin/bash
WORKDIR := $(PWD)

MODULE_NAME = raven-client
IMAGE_VERSION = develop
IMAGE_URI = ok2ju

default: image-build
.PHONY: default

image-build:
	@ echo "---> Building Docker image ..."
	@ docker build -t $(IMAGE_URI)/$(MODULE_NAME):$(IMAGE_VERSION) $(WORKDIR)
.PHONY: image-build

image-publish:
	@ echo "---> Publishing Docker image ..."
	@ docker push $(IMAGE_URI)/$(MODULE_NAME):$(IMAGE_VERSION)
.PHONY: image-publish

image-run:
	@ echo "---> Running Docker container ..."
	@ docker run -it -p 8000:3333 -d --rm --name $(MODULE_NAME) $(IMAGE_URI)/$(MODULE_NAME):$(IMAGE_VERSION)
.PHONY: image-run

pull-signal:
	@ echo "---> Pulling raven-signal docker image ..."
	@ docker pull ok2ju/raven-signal:develop
.PHONY: pull-signal

run-signal:
	@ echo "---> Running raven-signal container ..."
	@ docker run ok2ju/raven-signal:develop
.PHONY: run-signal
