'use client';
import {
	ArrowRight,
	Bookmark,
	Briefcase,
	MessageCircle,
	Search,
	X,
	Zap,
} from 'lucide-react';
import { useState } from 'react';
import { JobPostingCardEmployer } from '../../../../components/shared/job-posting-employer';
import { getItem } from '../../../../helpers/localstorage';
import {
	useGetAllJobPostings,
	useSearchJobPostings,
} from '../../../../hooks/useJobPostings';
const JobsPage = () => {
	const userId = +getItem('user_id');
	const [selectedTab, setSelectedTab] = useState('All Jobs');
	const [search, setSearch] = useState('');

	const tabs = ['All Jobs', 'My Jobs'];

	let { data: allJobs, isLoading: allJobsLoading } = useGetAllJobPostings();
	const { data: jobPostings, isLoading: isSearching } = useSearchJobPostings(
		search ? `search=${search}` : ``
	);
	if (selectedTab === 'My Jobs') {
		allJobs = allJobs?.filter((el) => el.employerId == userId);
	}
	const displayJobs = search != '' ? jobPostings?.results : allJobs;
	const isLoading = search != '' ? isSearching : allJobsLoading;

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='bg-white shadow-sm sticky top-0 z-40'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<div className='flex items-center gap-4'>
						<div className='relative flex-1 max-w-2xl'>
							<Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
							<input
								onChange={(e) =>
									setTimeout(() => {
										setSearch(e.target.value);
									}, 500)
								}
								type='text'
								placeholder='Profession, position or company'
								className='w-full pl-12 pr-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
							<X className='w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
						</div>
						<button className='bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors'>
							Search
						</button>
					</div>
				</div>
			</header>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				<div className='flex gap-6'>
					<div className='w-80 space-y-4 sticky top-30 z-30 h-fit'>
						<div className='bg-white rounded-xl p-4 shadow-sm'>
							<div className='flex items-center justify-between mb-3'>
								<div className='flex items-center gap-2'>
									<Zap className='w-5 h-5 text-yellow-500' />
									<span className='font-semibold text-gray-900'>
										Your activity
									</span>
								</div>
								<span className='text-sm text-gray-500'>0%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2 mb-3'>
								<div className='bg-blue-600 h-2 rounded-full w-0'></div>
							</div>
							<button className='flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700 transition-colors'>
								<span>View details</span>
								<ArrowRight className='w-4 h-4' />
							</button>
						</div>

						<div className='bg-white rounded-xl p-4 shadow-sm'>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<Briefcase className='w-4 h-4 text-gray-600' />
										<span className='text-sm text-gray-700'>All My Jobs</span>
									</div>
									<span className='font-semibold text-gray-900'>2</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<Bookmark className='w-4 h-4 text-gray-600' />
										<span className='text-sm text-gray-700'>
											Selected vacancies
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='flex-1'>
						<div className='bg-white rounded-xl p-4 shadow-sm mb-6'>
							<div className='flex gap-2 overflow-x-auto'>
								{tabs.map((tab) => (
									<button
										key={tab}
										onClick={() => setSelectedTab(tab)}
										className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
											selectedTab === tab
												? 'bg-blue-600 text-white'
												: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
										}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>

						<div className='space-y-4'>
							{isLoading ? (
								<div className='text-center py-8'>
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
									<p className='text-gray-600'>Loading jobs...</p>
								</div>
							) : displayJobs && displayJobs.length > 0 ? (
								<div className='space-y-4'>
									<div className='text-sm text-gray-600'>
										Showing {displayJobs?.length} total jobs
									</div>
									{displayJobs.map((job: any) => (
										<JobPostingCardEmployer key={job.id} job={job} />
									))}
								</div>
							) : (
								<div className='text-center py-8'>
									<p className='text-gray-600'>No jobs available</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<button className='fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg hover:bg-blue-800 transition-colors'>
				<MessageCircle className='w-6 h-6' />
			</button>
		</div>
	);
};

export default JobsPage;
