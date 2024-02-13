#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import subprocess
import time

def check_and_run_as_root():
    if os.getuid() != 0:
        raise ValueError('Please run this script as root')
    print('Script is running as root.')

check_and_run_as_root()

def exec_command(args):
    process = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode(), error.decode()

def drop_partitions():
    print('Resetting zram0 partition...')
    output, err = exec_command(f"echo 1 > /sys/block/zram0/reset")
    if err:
        print(f"Failed to reset zram0 partition: {err}")
    else:
        print('zram0 partition reset successfully.')

    print('Deleting xvda1 partition...')
    output, err = exec_command(f"echo 1 > /sys/block/xvda1/device/delete")
    if err:
        print(f"Failed to delete xvda1 partition: {err}")
    else:
        print('xvda1 partition deleted successfully.')

def drop_caches():
    try:
        print('Clearing pagecache, dentries, and inodes...')
        exec_command("sync; echo 3 > /proc/sys/vm/drop_caches")
        print('Pagecache, dentries, and inodes cleared successfully.')
    except Exception as e:
        print(f"Error dropping caches: {e}")

#Set the desired interval between cleaning operations (in seconds).
optimal_interval = 60 * 60  # 1 hodina = 60 minut × 60 sekund
while True:
    drop_partitions()
    drop_caches()
    time.sleep(optimal_interval)