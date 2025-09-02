'use client';
import { CheckCircle, Clock, Eye, MessageCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGetAllJobApplications } from '../../../../hooks/useJobApplications';

const ApplicationsPage = () => {
	const [selectedStatus, setSelectedStatus] = useState('all');
	const router = useRouter();
	const {
		data: jobApplications,
		isLoading,
		error,
	} = useGetAllJobApplications();

	const statuses = [
		{ id: 'all', label: 'All', count: jobApplications?.length || 0 },
		{
			id: 'pending',
			label: 'Pending',
			count:
				jobApplications?.filter(
					(application) => application.status === 'pending'
				).length || 0,
		},
		{
			id: 'accepted',
			label: 'Accepted',
			count:
				jobApplications?.filter(
					(application) => application.status === 'accepted'
				).length || 0,
		},
		{
			id: 'rejected',
			label: 'Rejected',
			count:
				jobApplications?.filter(
					(application) => application.status === 'rejected'
				).length || 0,
		},
	];
	const applications = [
		...(jobApplications || []).map((application) => ({
			id: application.id,
			jobTitle: application.jobPosting?.title || 'Job Title',
			company: application.jobPosting?.company?.name || 'Company Name',
			status: application.status,
			jobPostingId: application.jobPostingId,
			jobSeekerName:
				application.jobSeeker?.user?.firstName +
					' ' +
					application.jobSeeker?.user?.lastName || 'Job Seeker Name',
		})),
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'pending':
				return <Clock className='w-5 h-5 text-yellow-500' />;
			case 'reviewed':
				return <Eye className='w-5 h-5 text-blue-500' />;
			case 'accepted':
				return <CheckCircle className='w-5 h-5 text-green-500' />;
			case 'rejected':
				return <XCircle className='w-5 h-5 text-red-500' />;
			default:
				return <Clock className='w-5 h-5 text-gray-500' />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'reviewed':
				return 'bg-blue-100 text-blue-800';
			case 'accepted':
				return 'bg-green-100 text-green-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const filteredApplications =
		selectedStatus === 'all'
			? applications
			: applications.filter((app) => app.status === selectedStatus);

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						My Applications
					</h1>
					<p className='text-gray-600'>Check users applications</p>
				</div>

				<div className='bg-white rounded-xl p-4 shadow-sm mb-6'>
					<div className='flex gap-2 overflow-x-auto'>
						{statuses.map((status) => (
							<button
								key={status.id}
								onClick={() => setSelectedStatus(status.id)}
								className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
									selectedStatus === status.id
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
								}`}
							>
								{status.label}
								<span className='bg-white/20 px-2 py-1 rounded-full text-xs'>
									{status.count}
								</span>
							</button>
						))}
					</div>
				</div>

				<div className='space-y-4'>
					{filteredApplications.map((application) => (
						<div
							key={application.id}
							className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer'
							onClick={() =>
								router.push(
									`/employer/applications/${application.id}`
								)
							}
						>
							<div className='flex items-center justify-between'>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-3'>
										{getStatusIcon(application.status)}
										<h3 className='text-lg font-semibold text-gray-900'>
											{application.jobSeekerName}
										</h3>
									</div>
									<p className='text-gray-600 mb-2'>{application.jobTitle}</p>
									<p className='text-gray-600 mb-2'>{application.company}</p>
								</div>
								<div className='flex items-center gap-3'>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
											application.status
										)}`}
									>
										{application.status.charAt(0).toUpperCase() +
											application.status.slice(1)}
									</span>
									<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
										<MessageCircle className='w-5 h-5' />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredApplications.length === 0 && (
					<div className='text-center py-12'>
						<div className='text-gray-400 mb-4'>
							<Clock className='w-16 h-16 mx-auto' />
						</div>
						<h3 className='text-xl font-semibold text-gray-600 mb-2'>
							No applications found
						</h3>
						<p className='text-gray-500'>
							{selectedStatus === 'all'
								? "You haven't applied to any jobs yet"
								: `No applications with ${selectedStatus} status`}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ApplicationsPage;
