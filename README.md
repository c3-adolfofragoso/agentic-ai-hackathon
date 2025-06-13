# Instructions for deploying app. 

## Instalation prerequisites. 

Install brew and npm (if not already done)

***Install Brew*** 
1. From terminal, run the following:
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

verify brew is installed: 

- brew -v

2.- Install node.js (contains npm)

brew install node

verify node and npm is installed: 

node -v 
npm -v

you should see something like: 

v20.11.1
10.2.3

3.- Run React app: 

from current directory, move to frontend/ folder and run: 

npm install 

This should install all dependencies in package.json, then run: 

npm run dev (this is required for bolt.new UI created, bolt uses Vite as UI bundler)

After running, you should see in console something like: 

Local: http://localhost:5173


# Important resources

* backend studio/app https://hack2025.c3-e.com/c3ai/studio


# Making contributions to the repo: 

clone and commit your changes. Let's push everything to 'main' branch. Tesst
