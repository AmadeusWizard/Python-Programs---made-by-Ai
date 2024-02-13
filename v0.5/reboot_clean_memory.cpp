#include <iostream>
#include <fstream>
#include <cstdlib>

int main() {
    // Otev�en� souboru pro logov�n�
    std::ofstream logFile("done.txt", std::ios::app);
    
    // Kontrola, zda se soubor otev�el spr�vn�
    if (!logFile.is_open()) {
        std::cerr << "Nelze otev��t soubor pro logov�n�.";
        return 1;
    }
    
    // Logov�n� zah�jen� proveden� p��kazu
    logFile << "Spou�t�n� p��kazu reboot a vy�i�t�n� pam�ti..." << std::endl;
    
    // Odesl�n� p��kazu pro restart a vy�i�t�n� pam�ti
    system("sudo reboot && sync && echo 3 > /proc/sys/vm/drop_caches && swapoff -a && swapon -a");
    
    // Logov�n� dokon�en� proveden� p��kazu
    logFile << "P��kaz byl �sp�n� proveden." << std::endl;
    
    // Uzav�en� souboru
    logFile.close();
    
    return 0;
}