# SovaConvert
###  AI file converter 

By using OpenAI API (ChatGPT 3.5) this website can generate convertation code and run it on the go (Backend Server Required)

You can find the main website [here](https://convert.sovagroup.one)

This code uses:
```
Next.JS
NextUI
PHP
Python
```


## To install this project on your server
Fornted:
1. Fork this repository
2. Run it via `Vercel`

Backend and brige:
3. Put all .php files from `backend` folder on other web server
4. Put all .py and .conf files on linux server in `/home/sgadmin/` (create one if don't exist)
5. Enter SSH and OwlCloud Account details in `config.php` and `python.conf`
6. Change backend server address (where .php files contains) in `/pages/index.js`
Enjoy!

## Remember, to run this code you need
```
OpenAI API Key
[OwlCloud Account](https://cloud.sovagroup.one)
Linux Server (obvious)
```

Please notice that you need to provide [author](https://sovagroup.one) attribution


Made with ❤️ by TheOfSover and S4mat