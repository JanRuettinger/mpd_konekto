# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /client
WORKDIR /rescueteam_frontend/
# copy package.json into the container at /client
COPY package.json /rescueteam_frontend/
COPY yarn.lock /rescueteam_frontend/
# install dependencies
RUN yarn install
# Copy the current directory contents into the container at /client
COPY . /rescueteam_frontend/
# Make port 3001 available to the world outside this container
EXPOSE 3001
# Run the app when the container launches
CMD ["yarn", "start"]