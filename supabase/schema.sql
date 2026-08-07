-- AestheticBiz — run once in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  city text,
  subject_label text,
  product_slug text,
  treatment_slug text,
  review_scope text check (review_scope in ('general', 'treatment', 'product')),
  rating int check (rating between 1 and 5),
  headline text,
  review text,
  answers_json jsonb,
  approved boolean not null default false,
  review_type text check (review_type in ('written', 'text', 'video')),
  video_url text,
  featured boolean default false,
  source text default 'web'
);

create index if not exists reviews_approved_idx on public.reviews (approved, created_at desc);
create index if not exists reviews_treatment_idx on public.reviews (treatment_slug);
create index if not exists reviews_product_idx on public.reviews (product_slug);

-- Discovery Call bookings (business / CRM sales). Shape must match
-- app/api/discovery-bookings/route.ts and supabase/discovery-bookings.sql.
create table if not exists public.discovery_bookings (
  id          text primary key,
  start_utc   timestamptz not null,
  end_utc     timestamptz not null,
  slot_date   text not null,
  slot_time   text not null,
  timezone    text not null,
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  phone       text,
  company     text not null,
  role        text,
  website     text,
  message     text not null,
  source      text,
  created_at  timestamptz not null default now()
);

create unique index if not exists discovery_bookings_start_utc_key
  on public.discovery_bookings (start_utc);

create index if not exists discovery_bookings_created_at_idx
  on public.discovery_bookings (created_at desc);

alter table public.reviews enable row level security;
alter table public.discovery_bookings enable row level security;

-- Public can insert reviews (moderation via approved flag)
drop policy if exists "reviews_public_insert" on public.reviews;
create policy "reviews_public_insert" on public.reviews
  for insert to anon, authenticated with check (true);

drop policy if exists "reviews_public_read_approved" on public.reviews;
create policy "reviews_public_read_approved" on public.reviews
  for select to anon, authenticated using (approved = true);

-- Discovery: API uses service role (bypasses RLS). No anon policies for PII.

-- Storage for review videos (optional)
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;
