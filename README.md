# fb-hue-bot
Facebook Messenger chatbot for Hue

# 

### Get Started (dev):
1. npm i
2. create a .env file with the following variables:
<code>
FB_VERIFY_TOKEN
PAGE_ACCESS_TOKEN
NPM_CONFIG_PRODUCTION
BRIDGE_IP
BRIDGE_USERNAME
</code> 
3. npm install -g localtunnel (if its not already installed)
4. npm run dev
5. <code>lt --subdomain fbhuebot --port 5000</code>

#

### Intents
* **on_off**
* **colour**
* **brightness**

### Entities

##### Entity - Description (Examples...)

* **zone** - An area that may contain multiple rooms/groups of lights (Upstairs, Downstairs, Outside)
* **location** - A room
* **color** - Colour of light (Red, Green, Blue)
* **brightness** - Desired brightness as a %
* **on_off**

#

### Features?
* **preset/phrase** - Phrase that sets a theme (Good morning, Good Night, Good Evening)
* **theme** - Desired theme/scene (Cinema, Relax, Study, Concentrate)
* **self** - If the user is referring to their belongings (my room)

