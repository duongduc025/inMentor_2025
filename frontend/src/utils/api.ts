//import { typeCookieOptions } from '@supabase/ssr';
import { fetchWithAuth } from './fetchWithAuth';
import { Job, PaginatedJobsResponse } from '../types/job.interface';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = '/api';  // Add this if your backend uses a prefix


//Job-related functions
export const getJobs = async (
  page = 0, 
  limit = 9,
  search?: string,
  location?: string
): Promise<PaginatedJobsResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (search) params.append('search', search);
    if (location) params.append('location', location);
    
    const response = await axios.get(`${API_URL}${API_PREFIX}/jobs?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export async function getJobById(jobId: string): Promise<Job> {
  try {
    const response = await fetch(`${API_URL}${API_PREFIX}/jobs/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch job: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
}


//Interview-related functions
export async function createNewInterviewProcess(
  token: string,
  job_id: string,
): Promise<string> {  // Update return type to string
  const url = `${API_URL}${API_PREFIX}/interview_processes`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ job_id, status: 'cv_assessment' }),  
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Interview process creation failed:', errorData);
    throw new Error('Failed to create interview process');
  }
  
  const data = await response.json();
  return data.id;  // Return the process ID
}

//Update interview process status
export async function updateInterviewProcessStatus(
  token: string,
  process_id: string,
  status: string
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}/status`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(status),
  });
  console.log(status);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Interview process status update failed:', errorData);
    throw new Error('Failed to update interview process status');
  }
  
  return await response.json();
}

//Get interview process by ID
export async function fetchInterviewProcess(
  process_id: string,
  token: string
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Failed to fetch interview process:', errorData);
    throw new Error('Failed to fetch interview process');
  }
  
  return await response.json();
}


export async function createNewInterview(
  token: string,
  process_id: string,
  title: string
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}/interview`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Interview creation failed:', errorData);
    throw new Error('Failed to create interview');
  }
  
  return await response.json();
}

export async function createCVAssessment(
  token:string,
  process_id:string,
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}/cv_assessment`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('CV assessment creation failed:', errorData);
    throw new Error('Failed to create CV assessment');
  }
  return await response.json();
}


export async function createFinalAssessment(
  token:string,
  process_id:string,
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}/final_assessment`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Final assessment creation failed:', errorData);
    throw new Error('Failed to create final assessment');
  }
  return await response.json();
}



export async function Interview_Chat(
  token: string,
  process_id: string,
  role: string,
  content: string
): Promise<any> {
  const url = `${API_URL}${API_PREFIX}/interview_processes/${process_id}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      role,
      content 
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Interview message creation failed:', errorData);
    throw new Error('Failed to send message');
  }
  
  return await response.json();
}
