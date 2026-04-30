import subprocess
import sys
import os
import time

def run_backend():
    print("Starting Flask backend...")
    backend_path = os.path.join(os.path.dirname(__file__), "backend")
    return subprocess.Popen([sys.executable, "app.py"], cwd=backend_path)

def run_frontend():
    print("Starting Vite frontend...")
    frontend_path = os.path.join(os.path.dirname(__file__), "frontend")
    # Use shell=True for npm on Windows
    return subprocess.Popen(["npm", "run", "dev"], cwd=frontend_path, shell=True)

if __name__ == "__main__":
    backend_process = None
    frontend_process = None
    try:
        backend_process = run_backend()
        time.sleep(2) # Give backend a moment to start
        frontend_process = run_frontend()
        
        print("\n" + "="*50)
        print("Inshorts Clone is running!")
        print("Backend: http://localhost:5000")
        print("Frontend: http://localhost:5173")
        print("Press Ctrl+C to stop both servers.")
        print("="*50 + "\n")
        
        # Keep the script running
        while True:
            time.sleep(1)
            if backend_process.poll() is not None:
                print("Backend process died. Exiting...")
                break
            if frontend_process.poll() is not None:
                print("Frontend process died. Exiting...")
                break
                
    except KeyboardInterrupt:
        print("\nStopping servers...")
    finally:
        if backend_process:
            backend_process.terminate()
        if frontend_process:
            frontend_process.terminate()
        print("Done.")
