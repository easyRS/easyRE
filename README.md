# Welcome to Easy RS 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D14.0.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/yarn-%3E%3D1.22.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/npm-please-use-yarn-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> 👌The easy open-source way to manage your Real State 🏠 stuff

Building..

## Prerequisites

- node >=14.0.0
- yarn >=1.22.0
- npm please-use-yarn

## Install

### Dev:

Simply run:

```sh
docker-compose -f docker/dev/docker-compose.yml up
```

### Prod:

How to deploy in your own server:

- Install [Ansible in your local machine](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- Create an SSH key, go to Github SSH key setup page or corresponding one and copy it.
- Copy the **same** SSH Key you previously created into your newly server created.
- Create the file: /etc/ansible/hosts. Copy and paste the below config, and fill accordingly:

```sh
[servers]
easyrs ansible_host=[REPLACE_WITH_SERVER_IP] ansible_ssh_private_key_file=~/.ssh/[REPLACE_WITH_SSH_KEY] ansible_user=[REPLACE_WITH_SERVER_USERNAME]

[all:vars]
ansible_python_interpreter=/usr/bin/python3
SSH_KEY=[REPLACE_WITH_SSH_KEY]
DATABASE_URL=mongodb://database:27017/easyrs
BASE_URL=http://main:3000 //todo: verify if this is okay in prod
NGINX_HOST=[REPLACE_WITH_YOUR_DOMAIN]
CERTBOT_EMAIL=[REPLACE_WITH_YOUR_EMAIL]

```

- Don't forget to configure your DNS.

- Under easyRS/ansible, Simply run:

```sh
ansible-playbook playbook.yml -l easyrs
```

- Relax, everything is going to be okay.

## Author

👤 **Luis Morón**

- Website: luifermoron.com
- Github: [@luifermoron](https://github.com/luifermoron)
- LinkedIn: [@luifermoron](https://linkedin.com/in/luifermoron)

## Show your support

Give a ⭐️ if this project helped you!
