# CET Dimensions

[![wercker status](https://app.wercker.com/status/41ffd691a5a9b043463e9ba4cd7478b9/s/master "wercker status")](https://app.wercker.com/project/byKey/41ffd691a5a9b043463e9ba4cd7478b9)

A student information system [semester project]

## Getting started

**We prefer to use Ubuntu as development platform, because of the nice stuff it provides**

Install the following packages:
1. [NodeJS](https://nodejs.org)
2. A compiler to compile native modules
   Ubuntu users:
   ```bash
   sudo apt-get install g++ make python
   ```
3. [optional] `nodemon`
   To manually restart express server on changing source files.
   ```
   npm install -g nodemon
   ```
   Try with sudo if npm install fails.
4. Clone this repository: 
   ```
   git clone https://github.com/Agathver/dimensions
   ```
5. Install dependencies
   ```
   cd dimensions
   npm install
   ```
6. Install the database
   ```
   sudo apt-get install mongodb
   ```
   If you have docker isntalledm please see the alternate docker based development workflow.
6. Start the application
   ```
   npm start
   ```
   Or if you have nodemon
   ```
   nodemon start
   ```
   Application should be not visible at http://localhost:3000

## Docker based development workflow
**If you have docker, then you can try out the wercker based workflow for even easier approach.**

If you have docker installed, you should adapt the docker based development approach. (makes life easier)

First time users:
Install nodemon, compilers and perform `npm install`
```
./dev_env init
```
To start server:
```
./dev_env start
nodemon start
```

## Using wercker
Wercker is a shiny new tool to develop, build, test and deploy.
If you have docker installed, you can install `wercker` to do all heavy lifting for you.
1. Install wercker CLI from http://www.wercker.com/wercker-cli or type the following:
   ```
   sudo curl -L https://s3.amazonaws.com/downloads.wercker.com/cli/stable/linux_amd64/wercker -o /usr/local/bin/wercker
   sudo chmod +x /usr/local/bin/wercker
   ```
2. Run `wercker dev --publish 3000` to start your server. No need to install a thing (not even npm install). Server will be available on http://localhost:3000


# Production

## Live deployment
Current code is deployed automatically to https://dimensions.cetb.in (do not break things ;) )

## Running production server locally
Server is based on docker so you can run the production server wherever docker runs.

1. Install docker and docker-compose
2. `docker-compose up`
   Site should be live at http://localhost:3000

## Reverse Proxy

YOu can use a reverse proxy to increase performance and perform load balancing between workers. We would recommend using [nginx](https://nginx.org).

Sample nginx config:
````
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g
                 inactive=60m use_temp_path=off;

server {
	listen 80;
	listen [::]:80;

	server_name dimensions.cetb.in;

	location / {
		proxy_cache my_cache;
                proxy_pass http://127.0.0.1:3000;
		proxy_cache_revalidate on;
	        proxy_cache_min_uses 3;
		proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
	        proxy_cache_lock on;
		add_header X-Cache-Status $upstream_cache_status;
		proxy_cache_bypass $http_pragma;
	}
	
	error_log /var/log/nginx/dimensions.cetb.in.error.log;
        access_log /var/log/nginx/dimensions.cetb.in.access.log cloudflare;

}
````

# Writing code
- Always make a new branch for your feature from master.
  ```
  git checkout master
  git pull origin master
  git checkout -b <feature_name>
  ```

# Testing
Make sure you test before pushing
```
npm test
```

# Pushing code
After you are satisfied, you should push your code and then open a pull request to master when your code is ready to submit.

For first time push from a new branch
```
git push -u origin <branch_name>
```

Subsequent pushes
```
git push
```


Happy coding!

For any questiins feel free to ask Amitosh, +91 7539057001, amitosh.swain@gmail.com

