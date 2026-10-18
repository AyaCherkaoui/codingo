-- Security hardening.

-- 1) Friendships: the addressee may only flip status. Nobody can rewrite who the two people are.
create or replace function friendships_lock_columns() returns trigger language plpgsql as $$
begin
  if new.requester <> old.requester or new.addressee <> old.addressee or new.id <> old.id then
    raise exception 'friendship participants cannot be changed';
  end if;
  if new.status = 'pending' and old.status = 'accepted' then
    raise exception 'cannot un-accept a friendship';
  end if;
  return new;
end $$;
drop trigger if exists friendships_lock on friendships;
create trigger friendships_lock before update on friendships for each row execute function friendships_lock_columns();

-- 1b) Cap outgoing requests (anti-spam).
create or replace function friendships_limit() returns trigger language plpgsql as $$
begin
  if (select count(*) from friendships where requester = new.requester and status = 'pending') >= 100 then
    raise exception 'too many pending friend requests';
  end if;
  return new;
end $$;
drop trigger if exists friendships_cap on friendships;
create trigger friendships_cap before insert on friendships for each row execute function friendships_limit();

-- 2) Leaderboard stats are derived on the server from the saved progress, with sanity caps.
--    Clients can no longer write xp / streak / completed_count directly.
revoke update on profiles from authenticated;
grant update (username) on profiles to authenticated;

alter table user_progress drop constraint if exists user_progress_size;
alter table user_progress add constraint user_progress_size check (pg_column_size(progress) < 200000);

create or replace function sync_profile_stats() returns trigger language plpgsql security definer set search_path = public as $$
declare
  done int := least(coalesce(jsonb_array_length(case when jsonb_typeof(new.progress->'completed') = 'array' then new.progress->'completed' else '[]'::jsonb end), 0), 250);
  raw_xp numeric := case when jsonb_typeof(new.progress->'xp') = 'number' then (new.progress->>'xp')::numeric else 0 end;
  raw_streak numeric := case when jsonb_typeof(new.progress->'streak') = 'number' then (new.progress->>'streak')::numeric else 0 end;
begin
  update profiles set
    completed_count = done,
    xp = greatest(0, least(raw_xp, done * 80 + 500))::int,
    streak = greatest(0, least(raw_streak, 3650))::int,
    updated_at = now()
  where id = new.user_id;
  return new;
end $$;
drop trigger if exists user_progress_sync on user_progress;
create trigger user_progress_sync after insert or update on user_progress for each row execute function sync_profile_stats();
revoke execute on function sync_profile_stats() from public, anon, authenticated;

-- 3) New profiles can only choose a username; stats start at defaults.
revoke insert on profiles from authenticated;
grant insert (id, username) on profiles to authenticated;
