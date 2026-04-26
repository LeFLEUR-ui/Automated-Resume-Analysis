import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Dashboard', 'Jobs', 'Candidates', 'Applications'],
  endpoints: (builder) => ({
    // Dashboard Stats
    getDashboardStats: builder.query({
      query: () => '/hr/application-stats',
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    getCandidateCount: builder.query({
      query: () => '/hr/candidate-count',
      providesTags: ['Candidates'],
    }),
    getResumeCount: builder.query({
      query: () => '/hr/resume-count',
      providesTags: ['Dashboard'],
    }),
    
    // Jobs
    getJobs: builder.query({
      query: () => '/hr/read-jobs',
      providesTags: ['Jobs'],
      // Transform data if needed
      transformResponse: (response) => {
        const rawData = Array.isArray(response) ? response : [];
        return rawData.map(job => ({
          ...job,
          title: job.job_title || "Untitled Position",
          department: job.department || "General",
          location: job.location || "Remote / Not Specified",
          salary_range: job.salary_range || "Competitive / TBD",
          is_active: Boolean(job.is_active)
        }));
      },
    }),
    
    // Example Mutation for Invalidation
    createJob: builder.mutation({
      query: (newJob) => ({
        url: '/hr/createjob',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Jobs', 'Dashboard'], // Refetch jobs and dashboard stats after creating a job
    }),
    
    updateJob: builder.mutation({
      query: ({ jobId, body }) => ({
        url: `/hr/update-job/${jobId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Jobs'],
    }),

    updateJobStatus: builder.mutation({
      query: ({ jobId, status }) => ({
        url: `/hr/set-job-status/${jobId}?active_status=${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetCandidateCountQuery,
  useGetResumeCountQuery,
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useUpdateJobStatusMutation,
} = apiSlice;
