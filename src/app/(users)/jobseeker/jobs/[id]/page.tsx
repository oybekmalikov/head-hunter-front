'use client';
import {
	ArrowLeft,
	Bookmark,
	Briefcase,
	Building,
	Building2,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Eye,
	Globe,
	Heart,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Share2,
	Star,
	Users,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCreateJobApplication } from '../../../../../hooks/useJobApplications';
import {
	useGetJobPostingById,
	useSearchJobPostings,
} from '../../../../../hooks/useJobPostings';
import { getItem } from "../../../../../helpers/localstorage"

const SingleJobPage = () => {
	const params = useParams();
	const router = useRouter();
	const jobId = params.id as string;
	const { data: jobData, isLoading, error } = useGetJobPostingById(jobId);
	const [job, setJob] = useState<any>(null);
	useEffect(() => {
		if (jobData) {
			setJob(jobData);
		}
	}, [jobData]);
	const search = job?.title?.split(' ')[0] || '';
	const { data: recommendedJobsData } = useSearchJobPostings(search);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const { mutate, isPending } = useCreateJobApplication();
	const handleApply = () => {
		const userId=getItem('user_id');
		const data = {
			jobPostingId: +jobId,
			jobSeekerId:+userId,
			status: 'pending',
			coverLetter: 'Cover Letter',
			resumeUrl: '/',
		};
		mutate(data);
	};

	const handleContact = () => {
		// Handle contact
		console.log('Contacting company');
	};
	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='bg-white shadow-sm sticky top-0 z-40'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<div className='flex items-center justify-between'>
						<button
							onClick={() => router.back()}
							className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
						>
							<ArrowLeft className='w-5 h-5' />
							<span>Back to jobs</span>
						</button>
						<div className='flex items-center gap-3'>
							<button
								onClick={() => setIsBookmarked(!isBookmarked)}
								className={`p-2 rounded-lg transition-colors ${
									isBookmarked
										? 'text-blue-600 bg-blue-50'
										: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
								}`}
							>
								<Bookmark className='w-5 h-5' />
							</button>
							<button
								onClick={() => setIsLiked(!isLiked)}
								className={`p-2 rounded-lg transition-colors ${
									isLiked
										? 'text-red-500 bg-red-50'
										: 'text-gray-400 hover:text-red-500 hover:bg-red-50'
								}`}
							>
								<Heart className='w-5 h-5' />
							</button>
							<button className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
								<Share2 className='w-5 h-5' />
							</button>
						</div>
					</div>
				</div>
			</header>

			{isLoading || !job ? (
				<div className='text-center py-8'>
					{error ? (
						<div className='text-red-600'>
							<p className='font-semibold mb-2'>Error loading job</p>
							<p className='text-sm'>
								{error.message || 'Failed to fetch job details'}
							</p>
						</div>
					) : (
						<>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
							<p className='text-gray-600'>Loading job details...</p>
						</>
					)}
				</div>
			) : (
				<div>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							<div className='lg:col-span-2 space-y-6'>
								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<div className='flex items-start justify-between mb-4'>
										<div className='flex-1'>
											<h1 className='text-3xl font-bold text-gray-900 mb-3'>
												{job?.title}
											</h1>
											<div className='flex items-center gap-2 mb-3'>
												<span className='text-2xl font-semibold text-gray-800'>
													{job?.salaryMin} - {job?.salaryMax} so'm
												</span>
											</div>
											<div className='flex flex-wrap gap-2 mb-4'>
												<span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg'>
													{job?.jobType}
												</span>
												<span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg'>
													{job?.requirements}
												</span>
												<span className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg'>
													{job?.workLocation}
												</span>
											</div>
										</div>
										<div className='flex flex-col items-end gap-2'>
											<div className='text-sm text-gray-500'>
												Posted {job?.publishedAt.split('T')[0]}
											</div>
											<div className='flex items-center gap-4 text-sm text-gray-500'>
												<div className='flex items-center gap-1'>
													<Eye className='w-4 h-4' />
													{job?.viewCount}
												</div>
												<div className='flex items-center gap-1'>
													<Users className='w-4 h-4' />
													{job?.applicationCount} applied
												</div>
											</div>
										</div>
									</div>
									<div className='flex gap-3'>
										<button
											onClick={handleApply}
											className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer'
										>
											Apply for this position
										</button>
										<button
											onClick={handleContact}
											className='flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer'
										>
											Contact company
										</button>
									</div>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h2 className='text-xl font-semibold text-gray-900 mb-4'>
										About the company
									</h2>
									<div className='flex items-start gap-4 mb-4'>
										<div className='w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600'>
											{job?.company?.logo || <Building2 />}
										</div>
										<div className='flex-1'>
											<div className='flex items-center gap-2 mb-2'>
												<h3 className='text-lg font-semibold text-gray-900'>
													{job?.company?.name}
												</h3>
												{job?.company?.isVerified && (
													<CheckCircle className='w-5 h-5 text-blue-600' />
												)}
											</div>
											<p className='text-gray-600 mb-3'>
												{job?.company?.description}
											</p>
											<div className='grid grid-cols-2 gap-4 text-sm'>
												<div className='flex items-center gap-2'>
													<Building className='w-4 h-4 text-gray-400' />
													<span className='text-gray-600'>
														{job?.company?.industry}
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<Users className='w-4 h-4 text-gray-400' />
													<span className='text-gray-600'>
														{job?.company?.companySize} employees
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<Calendar className='w-4 h-4 text-gray-400' />
													<span className='text-gray-600'>
														Est. {job?.company?.establishedYear}
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<Globe className='w-4 h-4 text-gray-400' />
													<span className='text-gray-600'>
														{job?.company?.webSiteUrl}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h2 className='text-xl font-semibold text-gray-900 mb-4'>
										Job description
									</h2>
									<div className='prose prose-gray max-w-none'>
										<p className='text-gray-700 whitespace-pre-line leading-relaxed'>
											{job?.description}
										</p>
									</div>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h2 className='text-xl font-semibold text-gray-900 mb-4'>
										Benefits
									</h2>
									<div className='grid grid-cols-2 gap-3'>
										{job?.requirements?.split(',')?.map((benefit, index) => (
											<div key={index} className='flex items-center gap-2'>
												<Star className='w-4 h-4 text-yellow-500' />
												<span className='text-gray-700'>{benefit}</span>
											</div>
										))}
									</div>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h2 className='text-xl font-semibold text-gray-900 mb-4'>
										Required skills
									</h2>
									<div className='flex flex-wrap gap-2'>
										{job?.requiredSkills.split(',')?.map((skill, index) => (
											<span
												key={index}
												className='px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium'
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>

							<div className='space-y-6'>
								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h3 className='text-lg font-semibold text-gray-900 mb-4'>
										Job details
									</h3>
									<div className='space-y-4'>
										<div className='flex items-center gap-3'>
											<MapPin className='w-5 h-5 text-gray-400' />
											<div>
												<div className='font-medium text-gray-900'>
													Location
												</div>
												<div className='text-sm text-gray-600'>
													{job?.location}
												</div>
											</div>
										</div>
										<div className='flex items-center gap-3'>
											<Briefcase className='w-5 h-5 text-gray-400' />
											<div>
												<div className='font-medium text-gray-900'>
													Employment type
												</div>
												<div className='text-sm text-gray-600'>
													{job?.workLocation}
												</div>
											</div>
										</div>
										<div className='flex items-center gap-3'>
											<Clock className='w-5 h-5 text-gray-400' />
											<div>
												<div className='font-medium text-gray-900'>
													Work schedule
												</div>
												<div className='text-sm text-gray-600'>
													{job?.jobType}
												</div>
											</div>
										</div>
										<div className='flex items-center gap-3'>
											<DollarSign className='w-5 h-5 text-gray-400' />
											<div>
												<div className='font-medium text-gray-900'>Salary</div>
												<div className='text-sm text-gray-600'>
													{job?.salaryMin} - {job?.salaryMax} so'm
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-sm'>
									<h3 className='text-lg font-semibold text-gray-900 mb-4'>
										Contact company
									</h3>
									<div className='space-y-3'>
										<button className='w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
											<Phone className='w-4 h-4' />
											Call company
										</button>
										<button className='w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors'>
											<Mail className='w-4 h-4' />
											Send message
										</button>
										<button className='w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors'>
											<Globe className='w-4 h-4' />
											Visit website
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-12'>
							<h2 className='text-2xl font-bold text-gray-900 mb-6'>
								Similar jobs
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{recommendedJobsData?.results?.map((recJob) => (
									<div
										key={recJob.id}
										className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer'
										onClick={() => router.push(`/jobseeker/jobs/${recJob.id}`)}
									>
										<div className='flex items-start justify-between mb-3'>
											<h3 className='text-lg font-semibold text-gray-900'>
												{recJob.title}
											</h3>
											<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
												<Heart className='w-5 h-5' />
											</button>
										</div>
										<div className='flex items-center gap-2 mb-2'>
											<span className='font-medium text-gray-700'>
												{recJob.company?.name}
											</span>
											{recJob.verified && (
												<CheckCircle className='w-4 h-4 text-blue-600' />
											)}
										</div>
										<div className='text-gray-600 mb-3'>
											{recJob.salaryMin} - {recJob.salaryMax} so'm
										</div>
										<div className='flex items-center gap-2 text-gray-500 text-sm mb-4'>
											<MapPin className='w-4 h-4' />
											{recJob.location}
										</div>
										<div className='flex items-center justify-between'>
											<span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg'>
												{recJob.requirements}
											</span>
											<button className='text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors'>
												View job
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<button
						className='fixed bottom-6 right-6 bg-black text-white p-4 rounded-xl shadow-lg hover:bg-gray-800 transition-colors'
						onClick={() => router.push(`/jobseeker/jobs/chat`)}
					>
						<MessageCircle className='w-6 h-6' />
					</button>
				</div>
			)}
		</div>
	);
};

export default SingleJobPage;
