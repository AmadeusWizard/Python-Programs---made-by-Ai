const cron = require('node-cron');
const fs = require('fs');
const { exec } = require('child_process');

// Nastavení kódování na UTF-8
process.env.LANG = 'cs_CZ.UTF-8';
process.env.LC_ALL = 'cs_CZ.UTF-8';

// Funkce k vyèištìní cache a zápisu do souboru
function clearCacheAndLog() {
    exec('echo 3 > /proc/sys/vm/drop_caches', {
        encoding: 'utf8', // Nastavení kódování pro exec
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba pøi vyèištìní cache: ${error.message}`);
            return;
        }
        
        const logMessage = `Cache byla úspìšnì vyèištìna dne ${new Date().toLocaleString('cs-CZ', {timeZone: 'Europe/Prague'})}\n`; // Použití správného locale pro èeský jazyk
        fs.appendFile('log_interval.txt', logMessage, 'utf8', (err) => {
            if (err) throw err;
            console.log('Logování do souboru probìhlo úspìšnì.');
        });
    });
}

// Spuštìní funkce clearCacheAndLog každých 10 minut pomocí node-cron
cron.schedule('*/10 * * * *', clearCacheAndLog);