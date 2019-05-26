# Download heroku toolbelt.
wget -qO- https://toolbelt.heroku.com/install.sh | sh

# Log into dockerhub/heroku registries to later push docker images to them.
echo "$SECRET_DOCKER_PASSWORD" | docker login -u "$SECRET_DOCKER_USERNAME" --password-stdin
echo "$SECRET_HEROKU_AUTHORIZATION_TOKEN" | docker login -u "_" --password-stdin registry.heroku.com

# Build docker image and tag it following heroku convention.
docker build -t $DOCKER_IMAGE_NAME .;
docker tag $DOCKER_IMAGE_NAME $HEROKU_DOCKER_IMAGE_NAME;

# Push docker images to dockerhub/heroku registries.
docker push $DOCKER_IMAGE_NAME;
docker push $HEROKU_DOCKER_IMAGE_NAME;

# Release (deploy) the newly builded docker image.
heroku container:release $APP_PROCESS_TYPE --app $APP_NAME;
