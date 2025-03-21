import java.util.Queue;

public class CPU 
{ public static boolean available;
public static int countNormally;
public static int countAbNormally;
public static OS os;


	public static void main(String[] args) 
	{  available = true;

	os = new OS();
	Queue<PCB> ready = os.CPUScheduler();

	// CPU Scheduler
	while(ready.size() > 0) 
	{ PCB p = null;
	available = true;

	if(available) 
	{ available = false;
	System.out.println("\t-- Dispatching Process --\n");
	
	p = ready.poll();
	p.run();
	
    while(trackProcess(p)) 
	if(!trackProcess(p)) 
	{ os.ramSize += p.jobSize;
	break; } } 
			
	if(os.ramSize > os.min && os.jobs.size() > 0) 
	{ System.out.println("\t-- Avilable memory in RAM: CPUScheduler is called -- \n");
	os.CPUScheduler(); } }
	
	// Simulation finished

	
	// For output file    
	os.generateOutput(countNormally, countAbNormally); } 
	
	
	
	// This method will return false if process is terminated
	public static boolean trackProcess(PCB p) 
	{ p.cut++;
	int num = (int)(Math.random()*100);
		
	if(p.cut > p.ecu) 
	{ termination(p, false);
	return false; }
	
	else 
	if(num <= 10) 
	{ termination(p, true);
	return false; } 
	
	else 
	if( num <= 15) 
	{ termination(p, false);
	return false;  }
	
	return true; }

	
	
	public static void termination(PCB p, boolean normal) 
	{ p.terminate();
	available = true;

	os.ramSize += p.jobSize;

	System.out.printf("Process Termination \nPID: %d     CUT: %d     Size: %d KB     ", p.pid, p.cut, p.jobSize);

	if(normal) 
	{ countNormally++;
	System.out.println("Normal termination. \n"); } 
	
	else 
	{ countAbNormally++;
	System.out.println("Abnormal termination. \n"); } } }
