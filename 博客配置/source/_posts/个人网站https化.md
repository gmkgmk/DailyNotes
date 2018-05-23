---
title: 个人服务器https化
date: 2017-12-13 8.00
tags: https 服务器
---

以前知道https需要证书,但是大部分都需要付费,最近在网上看到了很多不需要付费的证书,就试了一下

服务器是 vultr $5 的东京服务器,速度什么的感觉不太稳地,但能勉强使用.

需要的证书是ssl证书,我选择的是腾讯云的证书;

### 申请证书

---
<!--more-->

进入腾讯云官网,然后先登录,登陆后进入控制台

左上角有个云产品;

![](/images/个人服务器https化/image_1.png)

然后点击域名与服务

![](/images/个人服务器https化/image_2.png)

进入ssl证书管理

![](/images/个人服务器https化/image_3.png)

然后就是个人认证什么一系列的工作,最近会让你解析域名.会给一个值,在解析的时候会用,

*后面完全可以看帮助进行操作*

### 解析域名

---

解析域名我使用的是阿里云的,因为域名是阿里云买的,以前就使用过

首先进入解析域名页面;

![](/images/个人服务器https化/image_4.png)

点击添加解析

![](/images/个人服务器https化/image_5.png)


其他默认然后申请,等待就好.

申请下来之后下载,有个压缩包,找出里面的nginx配置


### nginx配置

---


进入自己的服务器,然后进入 /etc/nginx/conf.d/文件夹,将获取的证书放在这个文件夹里面

* 1_www.gmkgmk.com_bundle.crt;

* 2_www.gmkgmk.com.key;

我的配置就在这个文件夹里面,根据不同的修改就好

``` conf
upstream blog{
	server 127.0.0.1:3000;
}

server {
	server_name 198.13.35.167 www.gmkgmk.com;
	listen 80;
        location / {
	    proxy_pass http://blog;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;

         }
         #上面是我个人网站的配置,下面是官网给的例子修改的
         return 301 https://www.gmkgmk.com$request_uri; #重定向301
}
server {
        listen 443;
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
    }

```
检查 nginx配置:nginx -t

最后重启nginx nginx -s reload