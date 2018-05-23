---
title: 过去杂写整理:git使用
date: 2017-10-1 00.00
tags: js git
---

# GIT 教程

## 这篇文章是以前在网上收集的 , 如果侵权请联系 , 马上删除 ;

### 概述

git 是一种分布式版本控制工具。目前项目中比较常见的版本控制器有 SVN、CVS 等，这些
版本控制工具属于集中式版本控制器。

集中式版本控制器的主要特点就是项目的版本库保存在服务器，该服务器和开发人员的开发
机要在同一网段中，开发机从服务器 down 下项目，然后进行开发，开发过程中需要实时地
将新的版本更新到服务器。一旦服务器挂掉了，整个开发就会受到很大的影响。

分布式版本控制器的主要特点就是不需要专用服务器，每台开发机都有独立的版本库，相当
于每台开发机都是服务器，开发机之间可以互相传递版本内容。由于没有中央服务器，也不
用担心网络中断后影响开发。当然，为了方便传递数据，也可以建立一个专门用来交换数据
的服务器，比如 github 就充当着这个角色。

<!--more-->

### 安装 git

不同系统下安装 git 有所不同：

#### LINUX 上安装

Ubuntu 或 Debian 系统： sudo apt-get install git 其他 Linux 系统可以是用源码安装
。

#### MAC OS X 上安装

* 方法 1：homebrew ，然后通过 homebrew 安装 git，参
  考[http://brew.sh/](http://brew.sh/) 。
* 方法 2：是用 xcode。

#### Windows 上安装

windows 上安装是采用模拟 Linux 环境下进行的，所以需要先安装模拟环境。目前有个非
常好的模拟环境工具，其集成了 Linux 环境和 git，这个工具就是 msysgit，从官网下载
下来后直接安装即可。下载网
址[https://git-for-windows.github.io/](https://git-for-windows.github.io/)

安装完成后可执行文件有 3 个：

1. git bash
   * 仿 Linux 命令行
2. git cmd
   * windows 命令行
3. git gui
   * 可视化窗口

最常用的应该是 git bash，毕竟 git 最适合的环境就是 Linux。可视化窗口工具只是个辅
助工具，是用命令操作才是最灵活和快捷的选择。因此接下来主要学习 git 的各种命令。

虽然 git 的命令比较多，但是常用的就是那 10 多种。

安装完成后，需要进一步设置用户名和 email。因为 git 是分布式版本控制工具，因此需
要每台开发机自报家门。

    $ git config --global user.name "Your Name"
    $ git config --global user.email "email@example.com"

其中 --global 表示将设置内容配置到全局，这样整个系统的用户都应用这个设置。后面我
们还将介绍直接在配置文件中设置的方法。

#### git 的各种命令

* [git init](#init) - 初始化版本库
* [git add](#add) - 将增加或修改内容放到暂存库
* [git commit](#commit) - 提交暂存库的内容
* [git status](#status) - 查看状态
* [git diff](#diff) - 比较两次版本的不同
* [git log](#log) - 查看版本日志
* [git reflog](#reflog) - 查看执行的命令日志
* [git reset](#reset) - 回退历史版本
* [git rm](#rm) - 从版本库中删除
* [git checkout](#checkout) - 切换分支
* [git branch](#branch) - 创建或查看分支
* [git merge](#merge) - 合并分支
* [git stash](#stash) - 存储工作区
* [git tag](#tag) - 创建或查看标签
* [git remote](#remote) - 查看远程版本库的名称
* [git push](#push) - 推送本地库版本到远程库
* [git pull](#pull) - 从远程库拉取到本地库
* [git clone](#clone) - 从远程或本地克隆版本库到指定位置

<h4 id="init">git init</h4>

将空目录或者有内容的目录加入到 git 版本控制器中，由 git 来跟踪并管理。

    git init

命令执行完后，会在当前目录下生成一个 .git 的目录，该目录是隐藏的。这个目录不能轻
易改动，里面保存着所有的 git 配置。

<h4 id="add">git add</h4>

将增加或修改的文件保存到暂存库中。

    git add [文件]

将所有改动的文件都存放到暂存库。 git add -A

<h4 id="commit">git commit</h4>

将暂存区的内容提交到版本库。每次提交都必须将提交的注释加上。

    git commit -m "注释"

如果文件的修改或删除没有通过 add 或 rm 放入暂存区，也可以通过加入 -a 的参数直接
提交。( 增加必须通过 add 加入暂存区 )

    git commit -a -m "注释"

<h4 id="status">git status</h4>

查看文件有没有被修改的状态，无论文件是否放入暂存区，只要 git 监控到文件增加、修
改、删除，都可以使用该命令来查看。

    git status

<h4 id="diff">git diff</h4>

比较未提交到暂存区的修改和上个版本的差别。

    git diff [文件]

比较所有提交到暂存区的文件。

    git diff

<h4 id="log">git log</h4>

查看操作日志，记录所有提交后的版本信息。可以根据日志信息回退到指定的版本。

    git log

查看分支合并图

    git log --graph
    格式化显示效果
    $ git log --graph --pretty=oneline --abbrev-commit

<h4 id="reflog">git reflog</h4>

查看所有执行的命令历史。

    git reflog

<h4 id="reset">git reset</h4>

回退历史版本。如果执行提交后又反悔了，可以通过该命令进行回退。

回退到当前版本，比如放弃当前未提交的修改。

    git reset --hard head

如果要回退上一个版本，则改成 git reset --hard head~1 head~ 后面跟数字，表示回退
到从当前版本往回数第几个版本。

也可以指定回退到某一个版本。首先通过 git log，查看版本的 id 号，再根据 id 号来回
退。id 号可只写前四位。

    git reset --hard [id]

<h4 id="rm">git rm</h4>

删除文件有两种方式

1. 直接从文件夹中删除，但是版本库中并没有被删，如果需要提交版本库就要用到 git
   rm，再使用 git commit 提交。

2. 使用 git rm 删除，文件会从版本库和工作区都删除，然后使用 git commit 提交。

用法：

    git rm [文件]

<h4 id="checkout">git checkout</h4>

切换分支。

    git checkout [分支名称]

创建并切换到该分支。

    git checkout -b [分支名称]

<h4 id="branch">git branch</h4>

查看分支。

    git branch

创建分支。 git branch [分支名称]

删除分支。

    git branch -d [分支名称]

如果删除的分支没有被合并，需要进行强制删除。

    git branch -D [分支名称]

<h4 id="merge">git merge</h4>

快速合并，直接改变合并分支的指针。如果合并的分支间有冲突，则需要手动解决冲突后再
提交。

    git merge [合并的分支名称]

快速合并分支后，如果删除分支则日志记录中不会记录分支合并的操作。如果希望能记录分
支合并的操作，则需要禁用快速合并。

    git merge --no-ff

<h4 id="stash">git stash</h4>

存储当前工作区。如果任务进行到一半，需要解决其他版本的问题，比如修复 BUG。当前进
行的操作可暂时保存下来，解决问题再恢复。

    git stash

查看所有保存的工作现场。

    git stash list

恢复保存的工作现场。

    git stash apply [工作现场名称]
    恢复后删除工作现场
    git stash drop [工作现场名称]

恢复最后保存的工作现场并同时删除

    git stash pop

<h4 id="tag">git tag</h4>

给最新的版本加上标签。

    git tag [标签号]

给历史版本加上标签。版本 id 可以通过 git log 查看。

    git tag [标签号] [版本id]

创建带有说明的标签。 git tag -a [标签号] -m " 标签说明 " [版本 id] 删除标签。

    git tag -d [标签号]

### 远程仓库

如果不想搭建自己的 git 服务器，可以选择使用 Github。这个网站就是提供 Git 仓库托
管服务的，所以，只要注册一个 GitHub 账号，就可以免费获得 Git 远程仓库

第 1 步：创建 SSH Key。在用户主目录下，看看有没有 .ssh 目录，如果有，再看看这个
目录下有没有 id_rsa 和 id_rsa.pub 这两个文件，如果已经有了，可直接跳到下一步。如
果没有，打开 Shell（Windows 下打开 Git Bash），创建 SSH Key：

    $ ssh-keygen -t rsa -C [你的email]

如果一切顺利的话，可以在用户主目录里找到 .ssh 目录，里面有 id_rsa 和 id_rsa.pub
两个文件，这两个就是 SSH Key 的秘钥对，id_rsa 是私钥，不能泄露出去，id_rsa.pub
是公钥，可以放心地告诉任何人。

第 2 步：登陆 GitHub，打开 “Account settings”，“SSH Keys” 页面：

然后，点 “Add SSH Key”，填上任意 Title，在 Key 文本框里粘贴 id_rsa.pub 文件的内
容。

当然，GitHub 允许你添加多个 Key。假定你有若干电脑，你一会儿在公司提交，一会儿在
家里提交，只要把每台电脑的 Key 都添加到 GitHub，就可以在每台电脑上往 GitHub 推送
了。

#### 添加远程库

现在的情景是，你已经在本地创建了一个 Git 仓库后，又想在 GitHub 创建一个 Git 仓库
，并且让这两个仓库进行远程同步，这样，GitHub 上的仓库既可以作为备份，又可以让其
他人通过该仓库来协作，真是一举多得。

首先，登陆 GitHub，然后，在右上角找到 “Create a new repo” 按钮，创建一个新的仓库
。

在 Repository name 填入 learngit，其他保持默认设置，点击 “Create repository” 按
钮，就成功地创建了一个新的 Git 仓库。

目前，在 GitHub 上的这个 learngit 仓库还是空的，GitHub 告诉我们，可以从这个仓库
克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到
GitHub 仓库。

<h4 id="remote">git remote</h4>

通过 git remote 命令关联远程库。

    git remote add origin [你的github地址]

查看远程库信息

    git remote -v

<h4 id="push">git push</h4>

将本地库提交到远程库

    git push origin [分支名称]
    或
    git push origin -u [分支名称]

由于远程库是空的，我们第一次推送 master 分支时，加上了 -u 参数，Git 不但会把本地
的 master 分支内容推送的远程新的 master 分支，还会把本地的 master 分支和远程的
master 分支关联起来，在以后的推送或者拉取时就可以简化命令。

<h4 id="pull">git pull</h4>

如果向远程库推送失败，有可能远程库已有新版本导致冲突，那么需要使用 git pull 从远
程库将新版本拉取到本地，手动解决后再推送。

    git pull

如果 pull 也失败，有可能没有与远程库关联，下面是关联方法：

    git branch --set-upstream [分支名称] origin/[分支名称]

### 远程克隆

<h4 id="clone">git clone</h4>

如果远程已有库，可以通过 git clone 将远程库的内容克隆到本地。

    git clone [你的git地址]

从远程克隆下来的项目只能看到 master 分支，如果要抓取其他分支可以使用 git
checkout。

    git checkout -b dev1 origin/dev1

### 忽略特殊文件

在项目中往往有些文件不需要受 git 控制，比如中间的编译文件、系统生成的配置文件等
等，那么可以在项目的根目录下建立一个后缀名为 .gitignore 的文件，将需要忽略的文件
或文件夹写在里面即可。.gitignore 文件需要提交到 git 版本控制中。

比如该文件可有如下配置：

    # Windows:
    Thumbs.db
    ehthumbs.db
    Desktop.ini

    # My configurations:
    db.ini
    deploy_key_rsa
    dist
    build

### 配置别名

上面很多命令都很长，而每次都去敲相同的命令显得比较繁琐。git 还提供了配置别名的方
法，可以将很长的命令进行简化。配置的方法有两种：

1. 命令行配置

       #给git status设置别名st:
       git config --global alias.st "status"
       #以后就可以调用git st来获取文件的状态。

2. 在配置文件中设置

   如果嫌命令行操作太过于麻烦，也可以到用户的根目录下找到 .gitconfig 文件，直接
   修改该文件内容也可以到达设置的效果。

       #下面是.gitconfig文件的设置：
       [user]
       name = bdk
       email = 12899931@qq.com
       [alias]
       last = log -1
       #美化日志输出的效果
       lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
       st = status
       ck = checkout
       ckb = checkout -b
       cm = commit -a -m
       ...
