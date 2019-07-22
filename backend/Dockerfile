# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12

# Set the working directory to /api
WORKDIR /backend

# copy package.json into the container at /api
COPY package.json /backend/
COPY yarn.lock /backend/

# install dependencies
RUN yarn install

# Copy the current directory contents into the container at /api
COPY . /backend/

# Make port 9000 available to the world outside this container
EXPOSE 9000

# Run the app when the container launches
CMD ["yarn", "run","dev"]