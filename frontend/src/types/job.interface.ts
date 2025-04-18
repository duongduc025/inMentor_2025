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

  