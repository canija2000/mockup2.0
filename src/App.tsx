import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CourseRow } from './components/CourseRow';
import { Course } from './types/course';
import { BookOpen } from 'lucide-react';
import cursos from './cursos3.json';

// Sample data - in a real app, this would come from an API
const courses: Course[] = cursos as Course[];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Ramos UC</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="grid grid-cols-5 items-center p-4 bg-gray-100 rounded-t-lg border-b border-gray-200 font-medium text-gray-700">
            <span>NRC</span>
            <span className="">Nombre</span>
            <span>Horas/Semana</span>
            <span>Cr</span>
            <span>Tipo</span>
          </div>

          {/* Course List */}
          <div className="divide-y divide-gray-200">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <CourseRow
                  key={course.id}
                  course={course}
                  isExpanded={expandedCourses.has(course.id)}
                  onToggle={() => toggleCourse(course.id)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No courses found matching your search criteria
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;