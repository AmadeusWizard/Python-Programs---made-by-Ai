import subprocess
import time

def get_uptime():
    result = subprocess.run(['uptime'], capture_output=True, text=True)
    return result.stdout

def write_to_file(content):
    with open('cpu.py', 'a') as file:
        file.write(content + '\n')

def main():
    while True:
        uptime_output = get_uptime()
        write_to_file(uptime_output)
        time.sleep(5)

        if time.time() % 60 == 0:
            # importovat soubor cpu.py jako modul a použít údaje
            pass

if __name__ == '__main__':
    main()