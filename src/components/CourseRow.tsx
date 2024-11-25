import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Course, courseTypeLabels } from '../types/course';
import { WeeklyGraph } from './WeeklyGraph';

interface CourseRowProps {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CourseRow({ course, isExpanded, onToggle }: CourseRowProps) {
  return (
    <>
      <div 
        onClick={onToggle}
        className="grid grid-cols-5 items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
      >
        <span className="font-mono text-gray-600">{course.id}</span>
        <span className="col-span-1 font-medium text-gray-900">{course.name}</span>
        <span className="text-gray-600">{course.hpw} hours</span>
          <span className="text-gray-600">{course.cr}</span>
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 rounded-full text-xs font-medium" 
            style={{
              backgroundColor: `hsl(${course.type * 60}, 70%, 95%)`,
              color: `hsl(${course.type * 60}, 70%, 35%)`
            }}>
            {courseTypeLabels[course.type]}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <WeeklyGraph data={course.weeklyData} meanLineValue={course.hpw} />
        </div>
      )}
    </>
  );
}