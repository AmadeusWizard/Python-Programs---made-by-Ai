#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import time
import psutil
import atexit
import concurrent.futures
from termcolor import colored
import datetime

def optimize_system():
    while True:
        cleanup_files_and_folder()
        cleanup_cache()
        time.sleep(10)

def cleanup_files_and_folder():
    ...

def cleanup_cache():
    ...

def print_system_load():
    global last_backup

    while True:
        cpu_percent = psutil.cpu_percent()
        memory_info = psutil.virtual_memory()
        timestamp = time.ctime()

        console_log = f"{timestamp} - {colored('CPU Load:', 'cyan')} {cpu_percent}% - {colored('RAM Usage:', 'cyan')} {memory_info.percent}%"
        print(console_log)

        if (datetime.datetime.now() - last_backup).seconds >= 30:
            with open('log.txt', 'a') as file:
                file.write(f"{timestamp} - CPU Load: {cpu_percent}% - RAM Usage: {memory_info.percent}%\n")
            last_backup = datetime.datetime.now()

        time.sleep(10)

# Create processes for each function
with concurrent.futures.ProcessPoolExecutor() as executor:
    optimization_process = executor.submit(optimize_system)
    monitoring_process = executor.submit(print_system_load)

# Ensure proper termination of processes when the script closes
atexit.register(lambda: [pr.cancel() for pr in (optimization_process, monitoring_process)])
