"use client"
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Eye, FileText, Filter, X } from 'lucide-react';

const JobSeekersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const jobSeekers = [
    {
      id: 1,
      name: "Akmal Karimov",
      title: "Frontend Developer",
      education: "Bachelor's degree",
      experience: "2+ years experience",
      location: "Tashkent",
      expectedSalary: 8000000,
      skills: ["JavaScript", "React", "TypeScript", "CSS"],
      views: 245,
      applications: 12
    },
    {
      id: 2,
      name: "Dilnoza Rahimova",
      title: "UX/UI Designer",
      education: "Master's degree",
      experience: "4+ years experience", 
      location: "Samarkand",
      expectedSalary: 7500000,
      skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
      views: 189,
      applications: 8
    },
    {
      id: 3,
      name: "Bobur Toshev",
      title: "Backend Developer",
      education: "Bachelor's degree",
      experience: "3+ years experience",
      location: "Tashkent",
      expectedSalary: 12000000,
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      views: 312,
      applications: 15
    },
    {
      id: 4,
      name: "Madina Yusupova",
      title: "Data Scientist",
      education: "Master's degree",
      experience: "5+ years experience",
      location: "Tashkent",
      expectedSalary: 15000000,
      skills: ["Python", "Machine Learning", "SQL", "Pandas"],
      views: 278,
      applications: 18
    },
    {
      id: 5,
      name: "Sardor Mirzaev",
      title: "DevOps Engineer",
      education: "Bachelor's degree",
      experience: "3+ years experience",
      location: "Bukhara",
      expectedSalary: 11000000,
      skills: ["AWS", "Kubernetes", "Docker", "Jenkins"],
      views: 156,
      applications: 6
    },
    {
      id: 6,
      name: "Nigora Abdullayeva",
      title: "Mobile Developer",
      education: "Bachelor's degree",
      experience: "2+ years experience",
      location: "Tashkent",
      expectedSalary: 9000000,
      skills: ["Flutter", "Dart", "Firebase", "API Integration"],
      views: 198,
      applications: 11
    },
    {
      id: 7,
      name: "Farruh Sharipov",
      title: "Full Stack Developer",
      education: "Bachelor's degree",
      experience: "4+ years experience",
      location: "Fergana",
      expectedSalary: 13000000,
      skills: ["React", "Node.js", "MongoDB", "Express"],
      views: 234,
      applications: 14
    },
    {
      id: 8,
      name: "Zarina Kholmatova",
      title: "QA Engineer",
      education: "Bachelor's degree",
      experience: "3+ years experience",
      location: "Tashkent",
      expectedSalary: 8500000,
      skills: ["Selenium", "Jest", "Manual Testing", "API Testing"],
      views: 167,
      applications: 9
    },
    {
      id: 9,
      name: "Jasur Normatov",
      title: "Product Manager",
      education: "Master's degree",
      experience: "6+ years experience",
      location: "Tashkent",
      expectedSalary: 16000000,
      skills: ["Product Strategy", "Agile", "Scrum", "Analytics"],
      views: 289,
      applications: 22
    }
  ];

  const allSkills = [...new Set(jobSeekers.flatMap(seeker => seeker.skills))];
  const allLocations = [...new Set(jobSeekers.map(seeker => seeker.location))];

  const filteredJobSeekers = useMemo(() => {
    return jobSeekers.filter(seeker => {
      const matchesSearch = searchQuery === '' || 
        seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seeker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seeker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSalary = (minSalary === '' || seeker.expectedSalary >= parseInt(minSalary)) &&
                           (maxSalary === '' || seeker.expectedSalary <= parseInt(maxSalary));
      
      const matchesLocation = selectedLocation === '' || seeker.location === selectedLocation;
      
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.some(skill => seeker.skills.includes(skill));

      return matchesSearch && matchesSalary && matchesLocation && matchesSkills;
    });
  }, [searchQuery, minSalary, maxSalary, selectedLocation, selectedSkills, jobSeekers]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setMinSalary('');
    setMaxSalary('');
    setSelectedLocation('');
    setSelectedSkills([]);
  };

  const formatSalary = (salary) => {
    return (salary / 1000000).toFixed(1) + 'M UZS';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name, profession or skills"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="flex text-sm font-medium text-gray-700 mb-3">
                    Expected Salary Range (UZS)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-0.5 flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-0.5 flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All locations</option>
                    {allLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allSkills.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                  <span className="text-yellow-600 text-xs">⚡</span>
                </div>
                <span className="font-medium text-gray-900">Your activity</span>
                <span className="text-sm text-gray-500">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View details →
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                  All JobSeekers
                </button>
                <button className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Favorites
                </button>
              </div>
              <p className="text-gray-600">
                Showing {filteredJobSeekers.length} total job seekers
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobSeekers.map((seeker) => (
                <div key={seeker.id} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {seeker.name}
                          </h3>
                          <p className="text-gray-600 text-lg mb-2">{seeker.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{seeker.education}</span>
                            <span>{seeker.experience}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{seeker.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{seeker.applications}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{seeker.location}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Expected: <span className="font-medium text-green-600">{formatSalary(seeker.expectedSalary)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {seeker.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Profile
                    </button>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Save
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobSeekers.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job seekers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekersPage;