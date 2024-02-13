#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>

int main() {
    // Drop caches
    std::ofstream drop_cache("/proc/sys/vm/drop_caches");
    if (!drop_cache) {
        std::cerr << "Failed to open /proc/sys/vm/drop_caches" << std::endl;
        return 1;
    }
    drop_cache << "3"; // Writing '3' to drop caches
    drop_cache.close();

    // Swapoff and Swapon
    system("swapoff -a && swapon -a");

    // Logging to console after successful completion
    std::cout << "Task completed successfully. Logging info..." << std::endl;
    std::cout << "Caches dropped and swap reset." << std::endl;

    // Get current date and time
    time_t now = time(0);
    tm* local_time = localtime(&now);

    // Logging to file
    std::ofstream log_file("log.txt", std::ios::app); // Append mode
    if (!log_file) {
        std::cerr << "Failed to open log.txt" << std::endl;
        return 1;
    }
    log_file << "Task completed successfully at " << asctime(local_time); // Include current time
    log_file.close();

    return 0;
}