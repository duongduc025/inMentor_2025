import React, { useState, useEffect } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Step {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

interface NavigationGuideProps {
  currentStep: string;
  processId?: string;
}

const NavigationGuide: React.FC<NavigationGuideProps> = ({ currentStep, processId }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Show navbar when mouse is near the top of the screen (within 50px)
      if (event.clientY <= 50) {
        setIsVisible(true);
      } else if (event.clientY > 150) {
        // Hide navbar when mouse moves away from the top
        setIsVisible(false);
      }
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Define the steps based on the current stage (removed Completion step)
  const steps: Step[] = [
    {
      name: 'CV Assessment',
      status: currentStep === 'new' ? 'current' : 
             ['cv_assessed', 'interviewed', 'final_assessed', 'completed'].includes(currentStep) ? 'completed' : 'upcoming',
      description: 'Review and evaluate candidate CV'
    },
    {
      name: 'Interview',
      status: currentStep === 'cv_assessed' ? 'current' : 
             ['interviewed', 'final_assessed', 'completed'].includes(currentStep) ? 'completed' : 'upcoming',
      description: 'Conduct technical interview'
    },
    {
      name: 'Final Assessment',
      status: ['interviewed', 'final_assessed'].includes(currentStep) ? 'current' : 
             currentStep === 'completed' ? 'completed' : 'upcoming',
      description: 'Complete candidate evaluation'
    }
  ];

  return (
    <div 
      className={cn(
        "w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50 transition-transform duration-300",
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            Interview Process
          </Link>
          
          {/* Desktop view - full progress tracker */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={index} className="relative group flex items-center">
                  {/* Step circle with icon */}
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2",
                      step.status === 'completed' ? "border-green-500 bg-green-50" : 
                      step.status === 'current' ? "border-blue-500 bg-blue-50" : 
                      "border-gray-300 bg-gray-50"
                    )}
                  >
                    {step.status === 'completed' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : step.status === 'current' ? (
                      <Clock className="h-4 w-4 text-blue-500" />
                    ) : (
                      <span className="text-sm text-gray-500">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Step name */}
                  <span 
                    className={cn(
                      "ml-2 text-sm font-medium",
                      step.status === 'completed' ? "text-green-600" : 
                      step.status === 'current' ? "text-blue-600 font-semibold" : 
                      "text-gray-400"
                    )}
                  >
                    {step.name}
                  </span>
                  
                  {/* Step details tooltip on hover */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3 text-sm text-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <p className="font-medium mb-1">{step.name}</p>
                    <p className="text-gray-500 text-xs">{step.description}</p>
                    <div className={`mt-2 text-xs ${
                      step.status === 'completed' ? 'text-green-600' : 
                      step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.status === 'completed' ? 'Completed' : 
                      step.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </div>
                  </div>
                  
                  {/* Connector line between steps */}
                  {index < steps.length - 1 && (
                    <div className="mx-3 h-0.5 w-12">
                      <div className={`h-full ${
                        step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile view - simplified progress indicator */}
          <div className="md:hidden flex items-center">
            <div className="flex items-center space-x-1">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      step.status === 'completed' ? "bg-green-500" : 
                      step.status === 'current' ? "bg-blue-500" : 
                      "bg-gray-300"
                    )}
                  ></div>
                  
                  {/* Mobile tooltip */}
                  <div className="absolute top-full right-0 mt-2 w-36 bg-white shadow-lg rounded-md p-2 text-xs text-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <p className="font-medium">{step.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {steps.find(step => step.status === 'current')?.name || 'Process Complete'}
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            Process ID: {processId || 'N/A'}
          </div>
        </div>
      </div>
      
      {/* Indicator that shows when navbar is hidden */}
      <div 
        className={cn(
          "w-full h-1 bg-blue-500 fixed top-0 left-0 z-50 transition-opacity duration-300",
          !isVisible ? "opacity-100" : "opacity-0"
        )}
      ></div>
    </div>
  );
};

export default NavigationGuide;
