#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import time

def get_disk_stats():
    result = subprocess.run(['iostat', '-m', '/dev/xvda1', '/dev/zram0'], capture_output=True, text=True)
    return result.stdout

def write_to_file(content, last_write_time):
    global last_write_time_logging_info
    with open('logging_info.txt', 'a') as file:
        file.write(content + '\n')
    last_write_time_logging_info = time.time()

def delete_old_entries(current_time):
    global last_write_time_logging_info
    if current_time - last_write_time_logging_info > 180:
        with open('logging_info.txt', 'w') as file:
            file.truncate()
        last_write_time_logging_info = 0

def main():
    global last_write_time_logging_info
    last_write_time_logging_info = 0
    while True:
        disk_stats_output = get_disk_stats()
        write_to_file(disk_stats_output, last_write_time_logging_info)
        time.sleep(5)

        # check and delete old entries every 15 seconds (900 secs / 60 = 15 secs)
        if time.time() % 60 == 0:
            # importovat soubor logging_info.txt jako modul a použít údaje
            pass

if __name__ == '__main__':
    main()
