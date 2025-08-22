"use client";
import { useState } from "react";
import {
  X,
  DollarSign,
  Briefcase,
  CreditCard,
  Building,
  MapPin,
  Filter,
} from "lucide-react";

export default function FilterModal({ isOpen, onClose, onSubmit }) {
  const [filters, setFilters] = useState({
    salary: "",
    experience: "",
    payment: "",
    company: "",
    location: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters); // filterlarni parentga yuborish
    onClose(); // modal yopish
  };

  const handleClear = () => {
    setFilters({
      salary: "",
      experience: "",
      payment: "",
      company: "",
      location: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      {/* Background blur overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300/15 rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      {/* Modal container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism modal */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                <Filter className="w-5 h-5 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Filter Options</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-blue-300 group-hover:text-white" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Salary Range
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g. $50k - $80k"
                  value={filters.salary}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Experience Level
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 2-5 years"
                  value={filters.experience}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Payment Type
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  name="payment"
                  placeholder="e.g. Monthly, Hourly"
                  value={filters.payment}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Company
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google, Microsoft"
                  value={filters.company}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. New York, Remote"
                  value={filters.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
