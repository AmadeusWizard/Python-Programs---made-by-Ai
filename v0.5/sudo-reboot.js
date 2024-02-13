const { exec } = require('child_process');
const fs = require('fs');

// Funkce pro provedení rebootu a vyèištìní pamìtí
function rebootAndClearRAM() {
    // Pøíkaz pro restart systému a vyèištìní pamìtí
    exec('sudo reboot && sync && echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba pøi restartu a vyèištìní pamìtí: ${error.message}`);
            return;
        }
        
        // Logování provedené operace do souboru done.txt
        const logMessage = `Restart a vyèištìní pamìtí probìhlo úspìšnì dne ${new Date().toLocaleString()}\n`;
        fs.appendFile('done.txt', logMessage, 'utf8', (err) => {
            if (err) throw err;
            console.log('Operace byla zaznamenána v done.txt.');
        });
    });

    // Informace o využití CPU za posledních 16 hodin
    exec('sar -u 1 16', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba pøi získávání informací o CPU: ${error.message}`);
            return;
        }

        // Logování výstupu do souboru done.txt
        fs.appendFile('done.txt', `\nPrùmìrné využití CPU za posledních 16 hodin:\n${stdout}`, 'utf8', (err) => {
            if (err) throw err;
            console.log('Informace o CPU byly zaznamenány v done.txt.');
        });
    });
}

// Spuštìní funkce rebootAndClearRAM
rebootAndClearRAM();