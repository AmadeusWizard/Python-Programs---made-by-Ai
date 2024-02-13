const { exec } = require('child_process');
const fs = require('fs');

// Funkce pro proveden� rebootu a vy�i�t�n� pam�t�
function rebootAndClearRAM() {
    // P��kaz pro restart syst�mu a vy�i�t�n� pam�t�
    exec('sudo reboot && sync && echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba p�i restartu a vy�i�t�n� pam�t�: ${error.message}`);
            return;
        }
        
        // Logov�n� proveden� operace do souboru done.txt
        const logMessage = `Restart a vy�i�t�n� pam�t� prob�hlo �sp�n� dne ${new Date().toLocaleString()}\n`;
        fs.appendFile('done.txt', logMessage, 'utf8', (err) => {
            if (err) throw err;
            console.log('Operace byla zaznamen�na v done.txt.');
        });
    });

    // Informace o vyu�it� CPU za posledn�ch 16 hodin
    exec('sar -u 1 16', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba p�i z�sk�v�n� informac� o CPU: ${error.message}`);
            return;
        }

        // Logov�n� v�stupu do souboru done.txt
        fs.appendFile('done.txt', `\nPr�m�rn� vyu�it� CPU za posledn�ch 16 hodin:\n${stdout}`, 'utf8', (err) => {
            if (err) throw err;
            console.log('Informace o CPU byly zaznamen�ny v done.txt.');
        });
    });
}

// Spu�t�n� funkce rebootAndClearRAM
rebootAndClearRAM();