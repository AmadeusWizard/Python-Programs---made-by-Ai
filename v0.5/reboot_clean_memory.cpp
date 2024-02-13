#include <iostream>
#include <fstream>
#include <cstdlib>

int main() {
    // Otevøení souboru pro logování
    std::ofstream logFile("done.txt", std::ios::app);
    
    // Kontrola, zda se soubor otevøel správnì
    if (!logFile.is_open()) {
        std::cerr << "Nelze otevøít soubor pro logování.";
        return 1;
    }
    
    // Logování zahájení provedení pøíkazu
    logFile << "Spouštìní pøíkazu reboot a vyèištìní pamìti..." << std::endl;
    
    // Odeslání pøíkazu pro restart a vyèištìní pamìti
    system("sudo reboot && sync && echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a");
    
    // Logování dokonèení provedení pøíkazu
    logFile << "Pøíkaz byl úspìšnì proveden." << std::endl;
    
    // Uzavøení souboru
    logFile.close();
    
    return 0;
}