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
    
    // Applications / Screening
    getApplications: builder.query({
      query: () => '/applications/',
      providesTags: ['Applications'],
      transformResponse: (response) => {
        return response.map(app => ({
          id: app.id,
          name: app.candidate_name,
          status: app.status,
          preferredJob: app.job_title || app.job?.job_title || "Unknown",
          skills: app.skills || [],
          profileImage: app.profile_image_url || null,
          date: app.created_at,
          location: app.job?.location || "N/A",
          matchScore: app.match_score || 0
        }));
      },
    }),
    
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Applications', 'Dashboard'], // Update dashboard counts too
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
    
    getHRActivities: builder.query({
      query: () => '/admins/hr-activities',
      providesTags: ['AuditLogs'],
      transformResponse: (response) => {
        return response.map(log => ({
          id: log.id,
          user: log.user?.fullname || log.user?.email || "Unknown HR",
          role: log.user?.role || "HR",
          action: log.action.replace('_', ' '),
          time: new Date(log.created_at).toLocaleString(),
          status: "Success", // Simplified for now
          details: log.details,
          target: log.target
        }));
      },
    }),

    getUsers: builder.query({
      query: () => '/admins/users',
      providesTags: ['Users'],
    }),

    archiveUser: builder.mutation({
      query: (userId) => ({
        url: `/admins/users/${userId}/archive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),

    unarchiveUser: builder.mutation({
      query: (userId) => ({
        url: `/admins/users/${userId}/unarchive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetCandidateCountQuery,
  useGetResumeCountQuery,
  useGetJobsQuery,
  useGetApplicationsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useUpdateJobStatusMutation,
  useUpdateApplicationStatusMutation,
  useGetHRActivitiesQuery,
  useGetUsersQuery,
  useArchiveUserMutation,
  useUnarchiveUserMutation,
} = apiSlice;
