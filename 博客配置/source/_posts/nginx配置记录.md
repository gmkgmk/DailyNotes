---
title: nginx配置记录
date: 2018-5-13
tags: nginx
---

最近个人网站的nginx因为需要增加了一些配置,在这里简单的记录一下.

个人对nginx并不熟悉,以前映射博客域名也只是简单了解一下,这里相当于一个学习的基础整理


### 新增配置的目的

* 新增聊天室映射,即当访问`/room`路劲是访问聊天室的路劲
* http与https都能访问
* 访问端口的时候可以代理请求
* 静态资源路径处理

<!--more-->

原有的功能:
* http与https映射端口代理博客域名

### nginx基本命令

因为是在个人服务器上进行配置,所以会有一些基本的nginx操作

不同的操作系统不一样,我的是centos7

* whereis nginx 寻找nginx的位置,我的是在/etc/nginx下
* nginx -t 检查nginx文件是否有错误
* nginx -s reload 重启nginx

### nginx配置详情

进入你的配置文件后,可以先设置两个变量名,这个和js一样,也就是为了方便管理

```javascript
upstream blog{
	server 127.0.0.1:3000;
}
upstream egg{
	server 127.0.0.1:7001;
}
```

这两个变量分别对应本机不同的端口

首先来看一下http的服务配置

```js
server {
	server_name 198.13.35.167 www.gmkgmk.com;//监听的ip
	listen 80;//监听的端口
    location / {//访问根目录:/ 这是访问博客的配置
	    proxy_pass http://blog;    //代理的是变量里边blog的变量
      proxy_set_header   Host $host;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
   	}
	location /room { //监听的路劲,如果是www.gmkgmk.com/room就走这里
			alias   /home/chatRoom/www/;             //映射的文件夹路径
			try_files $uri $uri/ /index.html =404;
		}
	location /www { //处理静态资源,因为访问静态资源的路径全是 /www/abc.css
			location ~* \.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
				root   /home/chatRoom;	
		}
	}
	location /v2 { //代理端口,没有进行特殊处理
			proxy_pass http://egg;
    }
	
	error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        alias   /home/chatRoom/www/;
    }

}
```

这就是基本的配置;
访问www.gmkgmk.com的时候就会直接访问 127.0.0.1:3000
访问www.gmkgmk.com/room的时候就会直接访问 /home/chatRoom/www/ 路径
访问www.gmkgmk.com/www/abc.css目录的时候就会访问/home/chatRoom/www/abc.css
访问www.gmkgmk.com/v2/getList端口就等于访问127.0.0.1:7001/getList接口

值得注意的是/room这个的配置
访问路径有两种一个是alias,另一个是root.
alias别名:也就是访问/room就是到/home/chatRoom/www/
root根:访问/room就是到/home/chatRoom/www/room

这两个会有蛮多坑

还有就是处理静态资源的时候要根据自己的需求进行处理
配置了一次以后基本就没有什么难点了,
可以先在本地windows上下个nginx先根据需要配置下然后传上去

下面贴一下https的,基本上差不多.就不过多赘述了

```js

server {
        listen 443 default_server  ssl;
        server_name www.gmkgmk.com; #填写绑定证书的域名
        ssl on;
        ssl_certificate /etc/nginx/conf.d/gmkgmk.com/1_www.gmkgmk.com_bundle.crt;#路径填写自己的
        ssl_certificate_key /etc/nginx/conf.d/gmkgmk.com/2_www.gmkgmk.com.key;#路径填写自己的
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
        ssl_prefer_server_ciphers on;
        location / {
           proxy_set_header Host  $http_host;
           proxy_set_header X-Real-IP  $remote_addr;  
           proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
           proxy_set_header X-Nginx-proxy true;
           # 这里也要修改为你的二级域名前缀
           proxy_pass http://blog;
           proxy_redirect off;
        }
		location /room {
			alias   /home/chatRoom/www/;
			try_files $uri $uri/ /index.html =404;
		}
		location /www {
			location ~* \.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
				root   /home/chatRoom;
			}
		}
		location /v2/ {
			proxy_pass http://egg;
        }
		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			alias   /home/chatRoom/www/;
		}
    }
```
