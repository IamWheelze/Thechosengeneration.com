-- The Chosen Generation - Initial Database Schema
-- This migration creates all core tables with Row Level Security

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'parent', 'child');
CREATE TYPE level_type AS ENUM ('FS1', 'FS2', 'LEADERSHIP');
CREATE TYPE task_type AS ENUM ('checkbox', 'short_answer', 'file_upload', 'teacher_approved');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE checkin_type AS ENUM ('prayer', 'attendance');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'excused', 'late');
CREATE TYPE badge_type AS ENUM (
  'prayer_warrior', 'perfect_attendance', 'scripture_scholar',
  'helping_hand', 'worship_leader', 'memory_master',
  'faithful_student', 'early_bird', 'team_player', 'growth_champion'
);
CREATE TYPE incident_type AS ENUM (
  'behavioral_1', 'behavioral_2', 'behavioral_3',
  'safeguarding', 'medical', 'accident'
);

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'parent',
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL, -- First name + initial only for privacy
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age_group TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  class_id UUID,
  current_level level_type DEFAULT 'FS1',
  pin_hash TEXT NOT NULL, -- Hashed PIN for child login
  profile_photo_url TEXT,
  school_name TEXT,
  school_grade TEXT,
  medical_conditions TEXT DEFAULT 'None',
  dietary_restrictions TEXT,
  special_needs TEXT,
  photo_consent BOOLEAN DEFAULT FALSE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age_group TEXT NOT NULL,
  level level_type NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  branch TEXT,
  teacher_user_id UUID REFERENCES public.users(id),
  max_capacity INTEGER DEFAULT 20,
  current_enrollment INTEGER DEFAULT 0,
  schedule_day TEXT NOT NULL,
  schedule_time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for children.class_id
ALTER TABLE public.children
ADD CONSTRAINT fk_children_class
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL;

-- Tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type task_type NOT NULL DEFAULT 'checkbox',
  requires_approval BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 10,
  due_date DATE,
  task_order INTEGER DEFAULT 0,
  created_by_user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  status submission_status DEFAULT 'pending',
  content_text TEXT,
  file_url TEXT,
  feedback TEXT,
  approved_by_user_id UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(task_id, child_id)
);

-- Check-ins table (prayer and attendance)
CREATE TABLE public.checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  type checkin_type NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  value BOOLEAN DEFAULT TRUE,
  notes TEXT,
  verified_by_user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, type, date)
);

-- Awards table
CREATE TABLE public.awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  badge_type badge_type NOT NULL,
  title TEXT NOT NULL,
  reason TEXT,
  given_by_user_id UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  status attendance_status DEFAULT 'present',
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  notes TEXT,
  marked_by_user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, class_id, session_date)
);

-- Prayer hours tracking
CREATE TABLE public.prayer_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  type TEXT DEFAULT 'regular' CHECK (type IN ('regular', 'extended_stretch', 'personal')),
  engagement_rating INTEGER CHECK (engagement_rating BETWEEN 1 AND 5),
  notes TEXT,
  recorded_by_user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress assessments
CREATE TABLE public.progress_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  level level_type NOT NULL,
  category TEXT NOT NULL,
  score NUMERIC(5,2) NOT NULL,
  max_score NUMERIC(5,2) NOT NULL,
  notes TEXT,
  assessed_by_user_id UUID REFERENCES public.users(id),
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  incident_type incident_type NOT NULL,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  description TEXT NOT NULL,
  witnesses TEXT,
  immediate_action TEXT,
  reported_by_user_id UUID NOT NULL REFERENCES public.users(id),
  escalated BOOLEAN DEFAULT FALSE,
  escalated_to_user_id UUID REFERENCES public.users(id),
  resolution TEXT,
  resolution_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_children_parent ON public.children(parent_user_id);
CREATE INDEX idx_children_class ON public.children(class_id);
CREATE INDEX idx_tasks_class_week ON public.tasks(class_id, week_start);
CREATE INDEX idx_submissions_child ON public.submissions(child_id);
CREATE INDEX idx_submissions_task ON public.submissions(task_id);
CREATE INDEX idx_checkins_child_date ON public.checkins(child_id, date);
CREATE INDEX idx_awards_child ON public.awards(child_id);
CREATE INDEX idx_attendance_child ON public.attendance(child_id);
CREATE INDEX idx_attendance_session ON public.attendance(class_id, session_date);
CREATE INDEX idx_audit_logs_actor ON public.audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Children policies
CREATE POLICY "Parents can view own children" ON public.children
  FOR SELECT USING (parent_user_id = auth.uid());

CREATE POLICY "Teachers can view children in their classes" ON public.children
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes c
      WHERE c.id = class_id AND c.teacher_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all children" ON public.children
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Parents can manage own children" ON public.children
  FOR ALL USING (parent_user_id = auth.uid());

-- Classes policies
CREATE POLICY "Anyone authenticated can view classes" ON public.classes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can update their classes" ON public.classes
  FOR UPDATE USING (teacher_user_id = auth.uid());

CREATE POLICY "Admins can manage all classes" ON public.classes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Tasks policies
CREATE POLICY "View tasks for enrolled class" ON public.tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.children c
      WHERE c.parent_user_id = auth.uid() AND c.class_id = class_id
    )
    OR EXISTS (
      SELECT 1 FROM public.classes cl
      WHERE cl.id = class_id AND cl.teacher_user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Teachers can manage tasks for their classes" ON public.tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.classes cl
      WHERE cl.id = class_id AND cl.teacher_user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Submissions policies
CREATE POLICY "View own child submissions" ON public.submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_user_id = auth.uid())
  );

CREATE POLICY "Teachers view submissions for their class" ON public.submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.children c
      JOIN public.classes cl ON c.class_id = cl.id
      WHERE c.id = child_id AND cl.teacher_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can create submissions for children" ON public.submissions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_user_id = auth.uid())
  );

-- Check-ins policies
CREATE POLICY "Parents can manage own children checkins" ON public.checkins
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_user_id = auth.uid())
  );

CREATE POLICY "Teachers can view class checkins" ON public.checkins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.children c
      JOIN public.classes cl ON c.class_id = cl.id
      WHERE c.id = child_id AND cl.teacher_user_id = auth.uid()
    )
  );

-- Awards policies
CREATE POLICY "View own child awards" ON public.awards
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_user_id = auth.uid())
  );

CREATE POLICY "Teachers can manage awards" ON public.awards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.children c
      JOIN public.classes cl ON c.class_id = cl.id
      WHERE c.id = child_id AND cl.teacher_user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Attendance policies (similar pattern)
CREATE POLICY "View own child attendance" ON public.attendance
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.parent_user_id = auth.uid())
  );

CREATE POLICY "Teachers can manage attendance" ON public.attendance
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.classes WHERE id = class_id AND teacher_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Audit logs - admin only
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON public.incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to auto-update class enrollment count
CREATE OR REPLACE FUNCTION update_class_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.classes SET current_enrollment = current_enrollment + 1 WHERE id = NEW.class_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.classes SET current_enrollment = current_enrollment - 1 WHERE id = OLD.class_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.class_id IS DISTINCT FROM NEW.class_id THEN
    IF OLD.class_id IS NOT NULL THEN
      UPDATE public.classes SET current_enrollment = current_enrollment - 1 WHERE id = OLD.class_id;
    END IF;
    IF NEW.class_id IS NOT NULL THEN
      UPDATE public.classes SET current_enrollment = current_enrollment + 1 WHERE id = NEW.class_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enrollment_on_child_change
AFTER INSERT OR UPDATE OR DELETE ON public.children
FOR EACH ROW EXECUTE FUNCTION update_class_enrollment();
