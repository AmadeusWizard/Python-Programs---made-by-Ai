import os
import gc
import time
import psutil

MEMTHRESHOLD = 0.8

def current_memory_percentage():
    process = psutil.Process(os.getpid())
    memory = process.memory_info().rss
    total_memory = psutil.virtual_memory().total
    used_percentage = memory / total_memory
    return used_percentage * 100

def clear_memory():
    gc.collect()
    
while True:
    if current_memory_percentage() > MEMTHRESHOLD:
        if __name__ == '__main__':  # Only clear memory if this script is executed directly (not imported)
            print("Memory usage is high. Clearing memory...")
            clear_memory()

    # Wait for 10 seconds before checking again
    time.sleep(10)