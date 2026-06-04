create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  source_type text not null default 'direct',
  source_title text,
  source_author text,
  visibility text not null default 'public',
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.thoughts (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_thought_id uuid references public.thoughts(id) on delete set null,
  content text not null,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nickname', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.thoughts enable row level security;

create policy "profiles are viewable by authenticated users"
on public.profiles
for select
to authenticated
using (true);

create policy "users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "authenticated users can insert questions"
on public.questions
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "authenticated users can view public questions"
on public.questions
for select
to authenticated
using (visibility = 'public' and is_deleted = false or auth.uid() = author_id);

create policy "authors can update own questions"
on public.questions
for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "authenticated users can insert thoughts"
on public.thoughts
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "authenticated users can read thoughts on visible questions"
on public.thoughts
for select
to authenticated
using (
  exists (
    select 1
    from public.questions
    where public.questions.id = thoughts.question_id
      and (
        (public.questions.visibility = 'public' and public.questions.is_deleted = false)
        or public.questions.author_id = auth.uid()
      )
  )
);

create policy "authors can update own thoughts"
on public.thoughts
for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);
