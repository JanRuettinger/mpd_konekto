# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /client
WORKDIR /patient_frontend/
# copy package.json into the container at /client
COPY package.json /patient_frontend/
COPY yarn.lock /patient_frontend/

# install dependencies
RUN yarn install
# Copy the current directory contents into the container at /client
COPY . /patient_frontend/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["yarn", "start"]