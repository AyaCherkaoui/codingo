-- Codingo backend. Run once in Supabase: SQL Editor -> paste -> Run.

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,20}$'),
  xp int not null default 0,
  streak int not null default 0,
  completed_count int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists user_progress (
  user_id uuid primary key references auth.users on delete cascade,
  progress jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists friendships (
  id bigserial primary key,
  requester uuid not null references profiles(id) on delete cascade,
  addressee uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  unique (requester, addressee),
  check (requester <> addressee)
);

alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table friendships enable row level security;

-- profiles: any signed-in user can read (needed to find friends and show leaderboards)
create policy "profiles read" on profiles for select to authenticated using (true);
create policy "profiles insert own" on profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles update own" on profiles for update to authenticated using (auth.uid() = id);

-- progress: private to its owner
create policy "progress own" on user_progress for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- friendships: visible to both people; you can only send as yourself; only the addressee accepts
create policy "friends read" on friendships for select to authenticated
  using (auth.uid() in (requester, addressee));
create policy "friends request" on friendships for insert to authenticated
  with check (auth.uid() = requester and status = 'pending');
create policy "friends accept" on friendships for update to authenticated
  using (auth.uid() = addressee) with check (auth.uid() = addressee);
create policy "friends remove" on friendships for delete to authenticated
  using (auth.uid() in (requester, addressee));
