#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import time

def restart_server():
    cmd = "sync; echo 1 > /proc/sys/kernel/sysrq; echo b > /proc/sysrq-trigger"
    os.system(cmd)

def main():
    while True:
        restart_server()
        time.sleep(20)

if __name__ == '__main__':
    main()
