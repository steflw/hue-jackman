# Hue Jackman
Personal Facebook Messenger chatbot for Philips Hue hosted on Balena cloud (formerly resin.io)
# 

### Get Started (dev):
1. <code>npm i</code>
2. create a .env file with the following variables:
```
FB_VERIFY_TOKEN
PAGE_ACCESS_TOKEN - FB page access token
NPM_CONFIG_PRODUCTION=false
BRIDGE_IP - Local IP address of Hue Bridge
BRIDGE_USERNAME - Hue device username
```
3. <code>npm install -g localtunnel</code> (if its not already installed)
4. <code>npm run dev</code>
5. <code>lt --subdomain someurl --port 5000</code>

#

### Intents
* **on_off**
* **colour**
* **brightness**

### Entities

##### Entity - Description (Examples...)

* **location** - A room
* **on_off**

##### Entity - Description (Examples...) - not yet supported
* **color** - Colour of light (Red, Green, Blue)
* **brightness** - Desired brightness as a %
* **zone** - An area that may contain multiple rooms/groups of lights (Upstairs, Downstairs, Outside)
