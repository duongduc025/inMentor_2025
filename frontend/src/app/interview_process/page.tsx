'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CVEvaluator from './cv_assessment';
import MeetingInterface from './interview';
import AssessmentPage from './final_assessment';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NavigationGuide from './navigation-guide';

// Mock function to simulate fetching process data
const fetchInterviewProcess = async (sessionId: string) => {
  // In a real app, you would fetch this data from your API
  // For now, we'll simulate API responses with different statuses for testing
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return different mock data based on session ID to test different flows
  // In production, you would replace this with a real API call
  if (sessionId === 'new-session') {
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else if (sessionId === 'cv-assessed') {
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'cv_assessed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else if (sessionId === 'interviewed') {
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'interviewed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else if (sessionId === 'final-assessed') {
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'final_assessed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else if (sessionId === 'completed') {
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else {
    // Default for any other ID
    return {
      id: sessionId,
      candidate_id: '123',
      job_id: '456',
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
};

// Mock function to update process status
const updateProcessStatus = async (processId: string, newStatus: string) => {
  console.log(`Updating process ${processId} to status: ${newStatus}`);
  // In a real app, you would make an API call to update the status
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export default function InterviewProcessPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.session_id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [processData, setProcessData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInterviewProcess(sessionId);
        setProcessData(data);
      } catch (err) {
        console.error("Error fetching interview process:", err);
        setError("Could not load the interview process data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [sessionId]);

  const handleCompleteStage = async (newStatus: string) => {
    try {
      setIsLoading(true);
      await updateProcessStatus(sessionId, newStatus);
      
      // Instead of reloading data, for demo purposes, let's immediately update the status
      setProcessData({
        ...processData,
        status: newStatus,
        updated_at: new Date().toISOString()
      });
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error updating process status:", err);
      setError("Could not update the process status");
      setIsLoading(false);
    }
  };

  // For demo and testing purposes, add functions to manually navigate between stages
  const goToNextStage = () => {
    const statusMap: {[key: string]: string} = {
      'new': 'cv_assessed',
      'cv_assessed': 'interviewed',
      'interviewed': 'final_assessed',
      'final_assessed': 'completed'
    };
    
    if (processData.status in statusMap) {
      handleCompleteStage(statusMap[processData.status]);
    }
  };

  const goToPreviousStage = () => {
    const statusMap: {[key: string]: string} = {
      'cv_assessed': 'new',
      'interviewed': 'cv_assessed',
      'final_assessed': 'interviewed',
      'completed': 'final_assessed'
    };
    
    if (processData.status in statusMap) {
      handleCompleteStage(statusMap[processData.status]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading interview process...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Debug controls - only for development environment
  const renderDebugControls = () => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg z-50">
        <p className="font-bold mb-2">Debug Controls</p>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={goToPreviousStage} 
            disabled={processData.status === 'new'}
          >
            <ArrowLeft className="mr-2" size={16} />
            Previous Stage
          </Button>
          <Button 
            size="sm"
            onClick={goToNextStage} 
            disabled={processData.status === 'completed'}
          >
            Next Stage
          </Button>
        </div>
      </div>
    );
  };

  // Render the main content
  const renderContent = () => {
    switch (processData?.status) {
      case 'new':
        return (
          <CVEvaluator 
            onComplete={() => handleCompleteStage('cv_assessed')} 
            processData={processData} 
          />
        );
      
      case 'cv_assessed':
        return (
          <MeetingInterface
            onComplete={() => handleCompleteStage('interviewed')}
            processData={processData}
          />
        );
      
      case 'interviewed':
        return (
          <AssessmentPage
            onComplete={() => handleCompleteStage('final_assessed')}
            processData={processData}
          />
        );
      
      case 'final_assessed':
      case 'completed':
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Interview Process Completed</h1>
              <p className="mb-4">
                The interview process has been completed. The final decision has been recorded.
              </p>
              
              {processData.status === 'completed' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <p className="text-green-800">
                    This interview process has been marked as completed. No further actions are required.
                  </p>
                </div>
              )}
              
              <div className="mt-8">
                <Link href="/dashboard">
                  <Button>
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 mb-4">Unknown process status: {processData?.status}</p>
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        );
    }
  };

  // Main return - now using a consistent layout structure
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation guide that appears when hovering near the top */}
      <NavigationGuide currentStep={processData.status} processId={processData.id} />
      
      {/* Remove the padding div that was causing the space */}
      
      {/* Main content */}
      <main>
        {renderContent()}
      </main>
      
      {renderDebugControls()}
    </div>
  );
}
