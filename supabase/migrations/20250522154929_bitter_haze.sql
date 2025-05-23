/*
  # Initial Database Schema Setup

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user profile information
      - Stores role, name, avatar, bio, and points
    - `subjects`
      - List of available subjects for tutoring
    - `user_subjects`
      - Many-to-many relationship between users and subjects they teach/learn
    - `tutor_profiles`
      - Additional information specific to tutors
      - Stores experience, hourly rate, and verification status
    - `tutor_availability`
      - Weekly recurring availability slots for tutors
    - `sessions`
      - Tutoring session records
      - Tracks scheduling, status, and feedback
    - `study_groups`
      - Student study groups
      - Includes group details and membership

  2. Security
    - Enable RLS on all tables
    - Set up policies for authenticated access
    - Ensure data privacy between users
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'organizer');
CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  name text NOT NULL,
  avatar_url text,
  bio text,
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User subjects relationship
CREATE TABLE IF NOT EXISTS user_subjects (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  is_teaching boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, subject_id)
);

-- Tutor profiles
CREATE TABLE IF NOT EXISTS tutor_profiles (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  experience text,
  hourly_rate decimal(10,2),
  verification_status verification_status NOT NULL DEFAULT 'pending',
  languages text[] NOT NULL DEFAULT ARRAY['English'],
  total_sessions integer NOT NULL DEFAULT 0,
  rating decimal(3,2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tutor availability
CREATE TABLE IF NOT EXISTS tutor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES tutor_profiles(user_id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  status session_status NOT NULL DEFAULT 'scheduled',
  start_time timestamptz NOT NULL,
  duration integer NOT NULL, -- in minutes
  notes text,
  student_feedback text,
  tutor_feedback text,
  student_rating integer CHECK (student_rating BETWEEN 1 AND 5),
  tutor_rating integer CHECK (tutor_rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Study groups
CREATE TABLE IF NOT EXISTS study_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  capacity integer NOT NULL DEFAULT 10,
  is_online boolean NOT NULL DEFAULT true,
  meeting_link text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Study group members
CREATE TABLE IF NOT EXISTS study_group_members (
  group_id uuid REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read all profiles but only update their own
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Subjects: Readable by all authenticated users
CREATE POLICY "Subjects are viewable by everyone"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

-- User subjects: Users can manage their own subject relationships
CREATE POLICY "Users can manage their subjects"
  ON user_subjects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Tutor profiles: Readable by all, updatable by owner and organizers
CREATE POLICY "Tutor profiles are viewable by everyone"
  ON tutor_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'organizer'
    )
  );

-- Tutor availability: Readable by all, manageable by tutor
CREATE POLICY "Availability is viewable by everyone"
  ON tutor_availability FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tutors can manage availability"
  ON tutor_availability FOR ALL
  TO authenticated
  USING (auth.uid() = tutor_id);

-- Sessions: Visible to participants and organizers
CREATE POLICY "Users can view their sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id OR
    auth.uid() = tutor_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'organizer'
    )
  );

-- Study groups: Visible to all, manageable by owner
CREATE POLICY "Study groups are viewable by everyone"
  ON study_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can manage study groups"
  ON study_groups FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id);

-- Study group members: Visible to group members
CREATE POLICY "Members can view group membership"
  ON study_group_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM study_group_members
      WHERE group_id = study_group_members.group_id
      AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM study_groups
      WHERE id = study_group_members.group_id
      AND owner_id = auth.uid()
    )
  );

-- Insert some initial subjects
INSERT INTO subjects (name, description) VALUES
  ('Mathematics', 'Mathematics including algebra, calculus, and statistics'),
  ('Physics', 'Physics including mechanics, thermodynamics, and quantum physics'),
  ('Computer Science', 'Computer Science including programming, algorithms, and data structures'),
  ('English Literature', 'English Literature including poetry, prose, and literary analysis'),
  ('Economics', 'Economics including micro, macro, and international economics'),
  ('Business', 'Business including management, marketing, and finance')
ON CONFLICT (name) DO NOTHING;