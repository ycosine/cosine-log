---
title: "自建域名 HTTPS 证书使用指南"
date: "2023-11-26"
tags: ['HTTPS', '运维']
categories: ['技术']
description: "使用 Let's Encrypt 和 certbot 为自建域名配置免费 SSL 证书的完整指南"
author: "余贤俊"
draft: false
---

1. Https的问题解决

博客本来的SSL证书是用的腾讯云提供的免费证书

只支持 www 的二级域名，不支持其他二级域名

如果需要支持需要购买 *.域名的 ssl证书

看了一眼价格，去找别的方法了

找到一个别的免费证书的提供方，似乎挺多人在用的：[https://letsencrypt.org/zh-cn/getting-started/](https://letsencrypt.org/zh-cn/getting-started/)

1. nginx安装

略过，可以自己问chatgpt

1. letsencrypt.org证书生成及部署

- Install 前置依赖snapd

```TypeScript
sudo yum install epel-release
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
```

- 把snap更新到最新

```TypeScript
sudo snap install core;
sudo snap refresh core;
```

- 装certbot。可能有差异，看官方教程

```TypeScript
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

- 选择对应的服务器证书生成方式，这里用的是nginx

```TypeScript
sudo certbot --nginx
sudo certbot certonly --nginx
sudo certbot certonly  -d "*.0xcos.com" -d 0xcos.com
sudo certbot certonly  -d "*.0xcos.com" -d 0xcos.com --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory

sudo certbot certonly  -d "*.0xcos.xyz" -d 0xcos.xyz --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory
sudo certbot certonly  -d "*.1cosine.xyz" -d 1cosine.xyz --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory
```

这里需要去dns增加txt的哈希值做证书校验

主机需要调一下ssh间隔，不然等太久就挂掉了

```TypeScript
如果您希望在 CentOS 上建立更稳定和持久的 SSH 连接，可以尝试以下方法：

在 SSH 配置文件中更改 ClientAliveInterval 和 ClientAliveCountMax 参数
打开 /etc/ssh/sshd_config 文件，并找到以下两个参数：

ClientAliveInterval 300
ClientAliveCountMax 2
这些参数控制服务器在多长时间内向客户端发送保持活动的消息，并定义了服务器将发送多少次这样的消息。如果客户端未正确响应，则服务器将自动关闭连接。

为了使 SSH 连接更稳定，您可以增加 ClientAliveInterval 的值以增加发送保持活动消息的频率。例如，将其设置为 600 将使服务器每隔 10 分钟向客户端发送保持活动消息。同时，您也可以增加 ClientAliveCountMax 的值以增加服务器在未收到客户端响应时能够发送保持活动消息的次数。例如，将其设置为 3 将允许服务器发送最多 3 条保持活动消息，然后再关闭连接。

修改完配置后，执行以下命令以重新加载 SSH 配置：

systemctl reload sshd
```

等的时候怎么做验证

```TypeScript
nslookup -q=txt _acme-challenge.0xcos.xyz
nslookup -q=txt _acme-challenge.0xcos.com
```

验证成功后：

```TypeScript
/etc/letsencrypt/live/0xcos.xyz/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/0xcos.xyz/privkey.pem
```

域名配置

测试更新成功后，添加定时任务自动更新

下面是每个月的1,8,20号零点自动检查更新证书，一般在正式过期前30天内可以更新成功。可以 cd /etc/letsencrypt/renewal 查看

```Plain
echo "0 0 1,8,20 * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew" | sudo tee -a /etc/crontab > /dev/null
```

更新日志的查看

```Plain
cd /var/log/letsencrypt
```

查看定时任务

```Plain
crontab -l
```

### **五、手动更新证书**

```Plain
certbot renew -v
```