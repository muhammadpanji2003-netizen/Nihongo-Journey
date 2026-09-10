-- Japanese Journey V5
-- Jalankan seluruh script ini di Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  streak integer not null default 0,
  last_study date,
  current_level text not null default 'Beginner',
  current_lesson text not null default 'Hiragana • A-row',
  completed jsonb not null default '[]'::jsonb,
  wrong jsonb not null default '[]'::jsonb,
  favorites jsonb not null default '[]'::jsonb,
  notes jsonb not null default '{}'::jsonb,
  mastery jsonb not null default '{}'::jsonb,
  quiz_history jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.learning_progress enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own progress" on public.learning_progress;
create policy "Users can view own progress"
on public.learning_progress for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own progress" on public.learning_progress;
create policy "Users can insert own progress"
on public.learning_progress for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on public.learning_progress;
create policy "Users can update own progress"
on public.learning_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.learning_progress to authenticated;
