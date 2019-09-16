# anyOpsOS

> **_This is a SUPER Alpha release, do not use on production environment._**

anyOpsOS started as a fun/test project and I realized that it can be a good tool to manage my GNU/Linux infrastructure. But finally I opted to do something which not require any Agent to **manage the whole infrastructure of a business**.

The main purpose of this project is to create a tool to: **do disaster recovery tasks, monitor, install, manage and preconfigure any kind of system and it's services, reports...**

Think of any tool that you use as daily basis, this project must have a similar one to do the same job. And just because all the different tools share it's information you will be more powerful than ever.

**No installation is required on managed infrastructure. AGENT FREE!**

###### As an example,
If we manage all our VMWare infrastructure with `Infrastructure Manager` App and integrate all the data with the `Monitor` App, automatically we can have full performance charts of all it's VMs.

Now we integrate our physical Storage Systems (like NetApp/EMC...) to `Infrastructure Manager`, we can control performance issues with `Monitor` and automatically link it to VMWare VMs IOPS/IOwaits issues. Or with `Backups Manager` we can perform Storage Snapshots, Instant VM Recovery, File Recovery and much more.

But... why not integrate it to Ansible, Terraform and many others and work as GitOps method with `Notepad`?

Or just open a SSH shell with `SSH` or maybe... upload/download files with `SFTP` to these VMs.

As said, same with PCI Compliance checks, services management, security audits...

## Installation

#### Docker Image (recommended)

This project provides a Dockerfile under [/docker](docker/)

#### Local

##### Requirements
All tests are done with nodejs >= 12.0 as backend on:
- Windows 10 -> Running over Git bash
- Centos 7
- Linux subsystem for Windows -> Ubuntu


- Download this repo. Then;

`npm install`

`npm build`

`npm prod:start`

- Go with your browser at:

`https://[server_ip]:8080/index.html`

## Default User & Password
root:root

## Configuration

- How to change the default server port (80/8080):

Edit the main expressjs file located at `/dist/anyOpsOS/filesystem/etc/expressjs/config.json` and change `listen.port` option or `listen.ports` for `https`

## Roadmap

[ROADMAP.md](ROADMAP.md)

## Currently installed applications

![alt text](https://isartnavarro.io/img/SysOS/smanager_app.png "Infrastructure Manager app")

- Credentials Manager
    - Manage all your anyOpsOS credentials to use in other installed applications.
- Infrastructure Manager
    - Full integration with `VMware vCenter`/`ESXi` nodes and `VM`s.
    - Full integration with `NetApp` storage.
    - Full integration with `K8s` and `Docker`.
    - Full integration with `Ansible`.
    - Full integration with `Terraform`.
    - Manage all your standalone nodes (`Linux`, `Windows` and `SNMP`).
    - Generate `PCI Compilance` reports
- VMware Remote Console
    - Connect to any managed Virtual Machine!
- Backups Manager
    - Restore `NetApp Snapshots` into `Instant Virtual Machines`.
    - Restore `VM Guest files` from `NetApp Snapshots`.
    - Mount `NetApp Snapshots` into your managed `ESXi` hosts.
    - Restore `vCenter Datastore files` from `NetApp Snapshots`.
    - Create Backup Jobs
        - `NetApp Snapshots/SnapMirror/SnapVault` of your `vCenter/ESXi` infrastructure.
        - `MySQL`/`MariaDB`.
        - ... more comming
- Datastore Explorer
    - Manage `VMware Datastores` files.
    - Manage `NetApp Volumes` files.
- File Explorer
    - Manage all your `anyOpsOS` files
    - Download files to `anyOpsOS` from URL
    - Download `anyOpsOS` files to your local OS.
- SFTP
    - Download/upload files to any SFTP server (SSH).
    - Execute scripts in remote nodes.
    - Download files from URL to remote nodes.
- SSH shell
    - Connect to any SSH server instance.
- Monitor
    - Full integration with `Netdata`.
    - Monitor in real time all managed nodes (physical and virtual).
    - Alerts...
- Drawer
    - Full integration of `draw.io`.
- Notepad
    - Full integration of `Atom`.

![alt text](https://isartnavarro.io/img/SysOS/sftp_app.png "SFTP app")

## Acknowledgments

<img src="docs/assets/jetbrains.png" width="100">
