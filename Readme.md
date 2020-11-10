# External portal server 
 An external portal server, based on Node.js to authorize Wi-Fi guests for Unifi.
## Getting Started
External server requires Node.js v12 to run.

Run this app as a Docker container:
1. Clone the repo and install the dependencies
    ```
    git clone https://github.com/tereshkovmaxim/unifi_external_portal.git unifi_external_portal
    cd unifi_external_portal
    ```
2.  Build the Docker image
    ```
    docker build -t unifi_external_portal .
    ```
3. Run the Docker container
    ```
    docker run -p 80:8888 \
      -e UNIFI=https://ip-address-unifi \
      -e SITE=default \
      -e USERNAME=ubnt \
      -e PASSWORD=ubnt \
      -e REDIRECTURL=https://google.com \
      -e EXPIRATION=5 \
      -e AUTH=basic \
      -d unifi_external_portal
    ```
    These are the environment variables that are avaialable to be set in the application.
    

    * UNIFI - Your unifi controller
    * SITE - The sitename in your unifi controller
    * USERNAME - Your unifi controller username
    * PASSWORD - Your unifi controller username
    * REDIRECTURL - The page to redirect after authentification
    * EXPIRATION - Authentification expiration 
    * AUTH - Authentification page you want to display

    Custom Auth Page must be in `./public/custom.html`. The page must send a `POST` request to `https://{UNIFI}/guest/s/{SITE}/login`