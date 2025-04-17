import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = '/api';  // Add this if your backend uses a prefix

export type Job = {
  id: string;
  job_title: string;
  job_link: string;
  salary: string;
  region: string;
  job_company: string;
  experience: string;
  job_level: string;
  education_level: string;
  related_job: string;
  required_skills: string;
  job_description: string;
  job_requirement: string;
  job_benefit: string;
  work_location: string;
  postedDate?: string;
  daysLeft?: number;
  logo?: string;
  isTop?: boolean;
  isPro?: boolean;
  isUrgent?: boolean;
};

export type PaginatedJobsResponse = {
  jobs: Job[];
  total: number;
  page: number;
  pages: number;
  limit: number;
};

export const getJobs = async (
  page = 0, 
  limit = 9, // Changed back to 9 from 24
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

// Function to get a specific job by ID
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
