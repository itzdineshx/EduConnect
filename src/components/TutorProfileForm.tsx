import React, { useState } from 'react';

interface TutorProfileFormProps {
  initialProfile: {
    subjects: string[];
    languages: string[];
    experience: string;
    availability: {
      [key: string]: {
        start: string;
        end: string;
      }[];
    };
  } | null;
  onSubmit: (profile: any) => void;
}

const TutorProfileForm: React.FC<TutorProfileFormProps> = ({ initialProfile, onSubmit }) => {
  const [subjects, setSubjects] = useState<string[]>(initialProfile?.subjects || []);
  const [languages, setLanguages] = useState<string[]>(initialProfile?.languages || []);
  const [experience, setExperience] = useState(initialProfile?.experience || '');
  const [availability, setAvailability] = useState(initialProfile?.availability || {});
  const [newSubject, setNewSubject] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [timeSlot, setTimeSlot] = useState({ start: '', end: '' });

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleAddSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  const handleAddLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (language: string) => {
    setLanguages(languages.filter(l => l !== language));
  };

  const handleAddTimeSlot = () => {
    if (timeSlot.start && timeSlot.end) {
      setAvailability(prev => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), { ...timeSlot }]
      }));
      setTimeSlot({ start: '', end: '' });
    }
  };

  const handleRemoveTimeSlot = (day: string, index: number) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subjects,
      languages,
      experience,
      availability
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Subjects</h3>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Add a subject"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddSubject}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <div
              key={subject}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
            >
              <span>{subject}</span>
              <button
                type="button"
                onClick={() => handleRemoveSubject(subject)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddLanguage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map(language => (
            <div
              key={language}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
            >
              <span>{language}</span>
              <button
                type="button"
                onClick={() => handleRemoveLanguage(language)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Describe your teaching experience"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Availability</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="p-2 border rounded"
            >
              {days.map(day => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={timeSlot.start}
              onChange={(e) => setTimeSlot(prev => ({ ...prev, start: e.target.value }))}
              className="p-2 border rounded"
            />
            <input
              type="time"
              value={timeSlot.end}
              onChange={(e) => setTimeSlot(prev => ({ ...prev, end: e.target.value }))}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Time Slot
            </button>
          </div>

          {days.map(day => (
            <div key={day} className="border p-4 rounded">
              <h4 className="font-semibold mb-2">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </h4>
              {availability[day]?.map((slot, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span>
                    {slot.start} - {slot.end}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeSlot(day, index)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default TutorProfileForm; 