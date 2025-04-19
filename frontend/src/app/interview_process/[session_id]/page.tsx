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
import { 
  updateInterviewProcessStatus, 
  fetchInterviewProcess,
  createCVAssessment,
  createNewInterview,
  createFinalAssessment
} from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function InterviewProcessPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.session_id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [processData, setProcessData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const [stageInitialized, setStageInitialized] = useState(false);

  // Fetch initial process data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Lấy token từ context xác thực
        const token = await getToken();
        if (!token) {
          throw new Error("Authentication required");
        }
        
        // Gọi API fetchInterviewProcess với token
        const data = await fetchInterviewProcess(sessionId, token);
        setProcessData(data);
      } catch (err) {
        console.error("Error fetching interview process:", err);
        setError("Could not load the interview process data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [sessionId, getToken]);

  // Initialize the current stage when process data is loaded
  useEffect(() => {
    const initializeCurrentStage = async () => {
      if (!processData || stageInitialized) return;
      
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Authentication required");
        }

        switch (processData.status) {
          case 'cv_assessment':
            await createCVAssessment(token, sessionId);
            break;
          case 'interview':
            // Assuming we need a title for the interview
            await createNewInterview(token, sessionId, "Interview Session");
            break;
          case 'final_assessment':
            await createFinalAssessment(token, sessionId);
            break;
        }
        setStageInitialized(true);
      } catch (err) {
        console.error(`Error initializing ${processData.status} stage:`, err);
        setError(`Could not initialize the ${processData.status} stage`);
      }
    };

    initializeCurrentStage();
  }, [processData, sessionId, getToken, stageInitialized]);

  const handleCompleteStage = async (newStatus: string) => {
    try {
      setIsLoading(true);
      
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      console.log("newStatus", newStatus);
      // Update the status first
      await updateInterviewProcessStatus(token, sessionId, newStatus);
      
      
      // Initialize the new stage
      switch (newStatus) {
        case 'cv_assessment':
          await createCVAssessment(token, sessionId);
          break;
        case 'interview':
          await createNewInterview(token, sessionId, sessionId);
          break;
        case 'final_assessment':
          await createFinalAssessment(token, sessionId);
          break;
      }
      
      // Update the local state
      setProcessData({
        ...processData,
        status: newStatus,
        updated_at: new Date().toISOString()
      });
      
      // Reset the initialization flag for the new stage
      setStageInitialized(true);
      
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
      'cv_assessment': 'interview',
      'interview': 'final_assessment',
      'final_assessment': 'completed'
    };
    
    if (processData.status in statusMap) {
      handleCompleteStage(statusMap[processData.status]);
    }
  };

  const goToPreviousStage = () => {
    const statusMap: {[key: string]: string} = {
      'interview': 'cv_assessment',
      'final_assessment': 'interview',
      'completed': 'final_assessment'
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
            disabled={processData.status === 'cv_assessment'}
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
    if (!stageInitialized && processData.status !== 'completed') {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          <span>Initializing {processData.status.replace('_', ' ')}...</span>
        </div>
      );
    }

    switch (processData?.status) {
      case 'cv_assessment':
        return (
          <CVEvaluator 
            onComplete={() => handleCompleteStage('interview')} 
            processData={processData} 
          />
        );
      
      case 'interview':
        return (
          <MeetingInterface
            onComplete={() => handleCompleteStage('final_assessment')}
            processData={processData}
          />
        );
      
      case 'final_assessment':
        return (
          <AssessmentPage
            onComplete={() => handleCompleteStage('completed')}
            processData={processData}
          />
        );
      
      case 'completed':
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Interview Process Completed</h1>
              <p className="mb-4">
                The interview process has been completed. The final decision has been recorded.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <p className="text-green-800">
                  This interview process has been marked as completed. No further actions are required.
                </p>
              </div>
              
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
      <NavigationGuide currentStep={processData?.status} processId={processData?.id} />
      
      {/* Main content */}
      <main>
        {renderContent()}
      </main>
      
      {renderDebugControls()}
    </div>
  );
}
