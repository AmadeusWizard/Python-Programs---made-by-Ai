const cron = require('node-cron');
const fs = require('fs');
const { exec } = require('child_process');

// Nastaven� k�dov�n� na UTF-8
process.env.LANG = 'cs_CZ.UTF-8';
process.env.LC_ALL = 'cs_CZ.UTF-8';

// Funkce k vy�i�t�n� cache a z�pisu do souboru
function clearCacheAndLog() {
    exec('echo 3 > /proc/sys/vm/drop_caches', {
        encoding: 'utf8', // Nastaven� k�dov�n� pro exec
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba p�i vy�i�t�n� cache: ${error.message}`);
            return;
        }
        
        const logMessage = `Cache byla �sp�n� vy�i�t�na dne ${new Date().toLocaleString('cs-CZ', {timeZone: 'Europe/Prague'})}\n`; // Pou�it� spr�vn�ho locale pro �esk� jazyk
        fs.appendFile('log_interval.txt', logMessage, 'utf8', (err) => {
            if (err) throw err;
            console.log('Logov�n� do souboru prob�hlo �sp�n�.');
        });
    });
}

// Spu�t�n� funkce clearCacheAndLog ka�d�ch 10 minut pomoc� node-cron
cron.schedule('*/10 * * * *', clearCacheAndLog);