-- ============================================================
-- 0. EXTENSIONS
-- ============================================================
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. HELPER: updated_at auto-update
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 2. PROFILES (extends auth.users)
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  email text,
  phone text,
  public_email text,
  tagline text,
  avatar_url text,
  role text not null default 'author' check (role in ('author','editor','admin')),
  must_change_password boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_profiles_email on profiles(email);

drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated
  before update on profiles
  for each row execute function set_updated_at();

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, email, public_email, role)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1),
    new.email,
    new.email,
    'author'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- 3. ADMIN SESSIONS
-- ============================================================
create table if not exists admin_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_token text not null unique,
  refresh_token text not null unique,
  ip_address text,
  user_agent text,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  refresh_expires_at timestamptz not null,
  revoked_at timestamptz,
  last_used_at timestamptz default now()
);

create index if not exists idx_admin_sessions_user on admin_sessions(user_id);
create index if not exists idx_admin_sessions_token on admin_sessions(session_token);
create index if not exists idx_admin_sessions_refresh on admin_sessions(refresh_token);

-- ============================================================
-- 4. POSTS
-- ============================================================
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  subtitle text,
  category text not null,
  category_path text not null,
  image text,
  author text default 'Mwalimu Malata Benson',
  date text,
  read_time text,
  status text not null default 'draft' check (status in ('published','draft','hidden')),
  body jsonb not null default '[]'::jsonb,
  views integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz,
  deleted_at timestamptz
);

create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_posts_status on posts(status);
create index if not exists idx_posts_category on posts(category);
create index if not exists idx_posts_created on posts(created_at desc);

drop trigger if exists trg_posts_updated on posts;
create trigger trg_posts_updated
  before update on posts
  for each row execute function set_updated_at();

-- ============================================================
-- 5. COMMENTS (with threaded replies)
-- ============================================================
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  name text not null,
  text text not null,
  is_admin boolean not null default false,
  is_visible boolean not null default true,
  ip_address text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_comments_post on comments(post_id);
create index if not exists idx_comments_parent on comments(parent_id);
create index if not exists idx_comments_visible on comments(is_visible);

drop trigger if exists trg_comments_updated on comments;
create trigger trg_comments_updated
  before update on comments
  for each row execute function set_updated_at();

-- ============================================================
-- 6. CONTACT REQUESTS
-- ============================================================
create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  interest text not null,
  status text not null default 'new' check (status in ('new','replied','closed')),
  notes text,
  ip_address text,
  handled_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_contact_status on contact_requests(status);
create index if not exists idx_contact_created on contact_requests(created_at desc);

drop trigger if exists trg_contact_updated on contact_requests;
create trigger trg_contact_updated
  before update on contact_requests
  for each row execute function set_updated_at();

-- ============================================================
-- 7. RATINGS
-- ============================================================
create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  stars integer not null check (stars between 0 and 5),
  page text,
  ip_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_ratings_session on ratings(session_id);
create index if not exists idx_ratings_stars on ratings(stars);

drop trigger if exists trg_ratings_updated on ratings;
create trigger trg_ratings_updated
  before update on ratings
  for each row execute function set_updated_at();

-- ============================================================
-- 8. LOGIN ATTEMPTS (rate limit)
-- ============================================================
create table if not exists login_attempts (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  ip_address text,
  success boolean not null default false,
  attempted_at timestamptz default now()
);

create index if not exists idx_login_attempts_username on login_attempts(username, attempted_at desc);
create index if not exists idx_login_attempts_ip on login_attempts(ip_address, attempted_at desc);
create index if not exists idx_login_attempts_time on login_attempts(attempted_at desc);

-- ============================================================
-- 9. PASSWORD RESET REQUESTS (rate limit)
-- ============================================================
create table if not exists password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  ip_address text,
  requested_at timestamptz default now()
);

create index if not exists idx_prr_email on password_reset_requests(email, requested_at desc);
create index if not exists idx_prr_ip on password_reset_requests(ip_address, requested_at desc);

-- ============================================================
-- 10. AUDIT LOGS
-- ============================================================
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null check (action in (
    'create','update','delete','restore',
    'login','logout','login_failed',
    'password_change','password_reset','password_reset_request',
    'role_change','publish','unpublish','hide','view'
  )),
  table_name text,
  row_id uuid,
  description text,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

create index if not exists idx_audit_user on audit_logs(user_id);
create index if not exists idx_audit_action on audit_logs(action);
create index if not exists idx_audit_table on audit_logs(table_name);
create index if not exists idx_audit_created on audit_logs(created_at desc);

-- ============================================================
-- 11. GENERIC AUDIT TRIGGER
-- ============================================================
create or replace function audit_row_change()
returns trigger as $$
declare
  v_user uuid;
  v_action text;
  v_before jsonb;
  v_after jsonb;
  v_row_id uuid;
begin
  v_user := auth.uid();

  if (tg_op = 'INSERT') then
    v_action := 'create'; v_before := null; v_after := to_jsonb(new); v_row_id := new.id;
  elsif (tg_op = 'UPDATE') then
    v_action := 'update'; v_before := to_jsonb(old); v_after := to_jsonb(new); v_row_id := new.id;
  elsif (tg_op = 'DELETE') then
    v_action := 'delete'; v_before := to_jsonb(old); v_after := null; v_row_id := old.id;
  end if;

  insert into audit_logs (user_id, action, table_name, row_id, before_data, after_data)
  values (v_user, v_action, tg_table_name, v_row_id, v_before, v_after);

  return coalesce(new, old);
end;
$$ language plpgsql security definer;

drop trigger if exists trg_audit_posts on posts;
create trigger trg_audit_posts
  after insert or update or delete on posts
  for each row execute function audit_row_change();

drop trigger if exists trg_audit_comments on comments;
create trigger trg_audit_comments
  after insert or update or delete on comments
  for each row execute function audit_row_change();

drop trigger if exists trg_audit_contact on contact_requests;
create trigger trg_audit_contact
  after insert or update or delete on contact_requests
  for each row execute function audit_row_change();

drop trigger if exists trg_audit_profiles on profiles;
create trigger trg_audit_profiles
  after update on profiles
  for each row execute function audit_row_change();

-- ============================================================
-- 12. HELPER: is_admin()
-- ============================================================
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('author','editor','admin')
      and deleted_at is null
  );
$$ language sql stable;

-- ============================================================
-- 13. ROW LEVEL SECURITY
-- ============================================================
alter table profiles               enable row level security;
alter table admin_sessions         enable row level security;
alter table posts                  enable row level security;
alter table comments               enable row level security;
alter table contact_requests       enable row level security;
alter table ratings                enable row level security;
alter table login_attempts         enable row level security;
alter table password_reset_requests enable row level security;
alter table audit_logs             enable row level security;

-- PROFILES
drop policy if exists "profiles_self_read" on profiles;
create policy "profiles_self_read" on profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_self_update" on profiles;
create policy "profiles_self_update" on profiles
  for update using (auth.uid() = id);

-- ADMIN SESSIONS
drop policy if exists "sessions_self_all" on admin_sessions;
create policy "sessions_self_all" on admin_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- POSTS
drop policy if exists "posts_public_read" on posts;
create policy "posts_public_read" on posts
  for select using (status = 'published' and deleted_at is null);

drop policy if exists "posts_admin_read" on posts;
create policy "posts_admin_read" on posts
  for select using (is_admin());

drop policy if exists "posts_admin_insert" on posts;
create policy "posts_admin_insert" on posts
  for insert with check (is_admin());

drop policy if exists "posts_admin_update" on posts;
create policy "posts_admin_update" on posts
  for update using (is_admin());

drop policy if exists "posts_admin_delete" on posts;
create policy "posts_admin_delete" on posts
  for delete using (is_admin());

-- COMMENTS
drop policy if exists "comments_public_read" on comments;
create policy "comments_public_read" on comments
  for select using (
    is_visible = true
    and deleted_at is null
    and exists (
      select 1 from posts
      where posts.id = comments.post_id
        and posts.status = 'published'
        and posts.deleted_at is null
    )
  );

drop policy if exists "comments_public_insert" on comments;
create policy "comments_public_insert" on comments
  for insert with check (is_admin = false);

drop policy if exists "comments_admin_all" on comments;
create policy "comments_admin_all" on comments
  for all using (is_admin()) with check (is_admin());

-- CONTACT REQUESTS
drop policy if exists "contact_public_insert" on contact_requests;
create policy "contact_public_insert" on contact_requests
  for insert with check (true);

drop policy if exists "contact_admin_all" on contact_requests;
create policy "contact_admin_all" on contact_requests
  for all using (is_admin()) with check (is_admin());

-- RATINGS
drop policy if exists "ratings_public_read" on ratings;
create policy "ratings_public_read" on ratings
  for select using (true);

drop policy if exists "ratings_public_insert" on ratings;
create policy "ratings_public_insert" on ratings
  for insert with check (true);

drop policy if exists "ratings_public_update" on ratings;
create policy "ratings_public_update" on ratings
  for update using (true);

-- LOGIN ATTEMPTS (server only)
drop policy if exists "login_attempts_server_all" on login_attempts;
create policy "login_attempts_server_all" on login_attempts
  for all using (false) with check (false);

-- PASSWORD RESET REQUESTS (server only)
drop policy if exists "prr_server_all" on password_reset_requests;
create policy "prr_server_all" on password_reset_requests
  for all using (false) with check (false);

-- AUDIT LOGS
drop policy if exists "audit_admin_read" on audit_logs;
create policy "audit_admin_read" on audit_logs
  for select using (is_admin());

drop policy if exists "audit_server_insert" on audit_logs;
create policy "audit_server_insert" on audit_logs
  for insert with check (true);

-- ============================================================
-- 14. STORAGE BUCKET + POLICIES
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "post_images_public_read"   on storage.objects;
drop policy if exists "post_images_admin_insert"  on storage.objects;
drop policy if exists "post_images_admin_update"  on storage.objects;
drop policy if exists "post_images_admin_delete"  on storage.objects;
drop policy if exists "post_images_admin_select"  on storage.objects;

create policy "post_images_public_read"
on storage.objects for select
using (bucket_id = 'post-images');

create policy "post_images_admin_insert"
on storage.objects for insert
with check (bucket_id = 'post-images' and is_admin());

create policy "post_images_admin_update"
on storage.objects for update
using (bucket_id = 'post-images' and is_admin());

create policy "post_images_admin_delete"
on storage.objects for delete
using (bucket_id = 'post-images' and is_admin());

create policy "post_images_admin_select"
on storage.objects for select
using (bucket_id = 'post-images' and is_admin());