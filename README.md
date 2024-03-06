# Welcome to Easy RS 👋

![Version](https://img.shields.io/badge/version-0.9.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D18.3.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/yarn-%3E%3D1.22.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/npm-please-use-yarn-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> 👌The easy open-source way to manage your Real Estate 🏠 stuff

Easy RS is a self-hosted property management app targeted for developers. Control your real estate portafolio with this easy and open-source solution. With this app you can:

- Really easy to setup.
- Manage your properties and tenants with details.
- Create reusable contract definitions. They have the advantage of being a daily or monthly contract.
- Create a Lease and track all expenses of your properties over the time automatically.
- You have ability to easily configure Google Credentials in order to receive alert events on your devices when a need payment date is ready.

## Prerequisites

- node >=18.3.0
- yarn >=1.22.0
- npm please-use-yarn
- PROD: Ansible playbooks only tested in Ubuntu servers until the moment.

## Table of Contents

- [Install](#install)
  - [Dev](#dev)
  - [Prod](#prod)
- [Extra Configurations](#extra-configurations)
  - [Seeders](#seeders)
  - [Tests](#tests)
- [Author](#author)
- [Show your support](#show-your-support)

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
SSH_KEY_PUB=[REPLACE_WITH_SSH_KEY_PUB]
DATABASE_URL=mongodb://database:27017/easyrs
NGINX_HOST=[REPLACE_WITH_YOUR_DOMAIN]
CERTBOT_EMAIL=[REPLACE_WITH_YOUR_EMAIL]
NEXTAUTH_SECRET=[REPLACE_WITH_YOUR_SOME_SECRET]
NEXTAUTH_URL=https://[REPLACE_WITH_YOUR_DOMAIN]

```

- Don't forget to configure your DNS.

- Under easyRS/ansible, Simply run:

```sh
ansible-playbook install-only-playbook.yml -l easyrs
```

- Relax, everything is going to be okay.

BUT wait. One more detail!!
We thought this further and created another ansible playbook when new updates in the repository are coming.
If you want to update it just:

- Under easyRS/ansible, Simply run:

```sh
ansible-playbook update-n-times-playbook -l easyrs
```

There is always an space of improvement, the idea is make it easy! an Easy Real Estate. So you can share your ideas at: contact@luifermoron.com

### Extra Configurations:

#### Seeders

Sometimes you want/need to run seeders to make it work. There are three important parameters you need to know:

seed_fake_data=true/False. This parameter is used mainly in DEV. It just seeds dummy data.

delete_data=true/false. Be careful with this on PROD. It will delete ALL your data.

seed_types=true/false. It seeds important Task/Transaction Types. Once seeded, it will not seed anymore, so no worries at running it multiple times.

```sh
docker exec main yarn run seed --seed_fake_data=false --delete_data=false --seed_types=false
```

#### Tests

If you are curious about what tests are implemented, just run(when docker is on). You will discover that not too much :(. Testers are welcome:

```sh
docker exec main yarn test
```

There is always a gap of improvement, a way to make it easier. That is the purpose of it, make a real estate app usefull and easy to use. And of course, having fun coding :D

## Author

👤 **Luis Morón**

- Website: luifermoron.com
- Github: [@luifermoron](https://github.com/luifermoron)
- LinkedIn: [@luifermoron](https://linkedin.com/in/luifermoron)

## Show your support

Give a ⭐️ if this project helped you!
