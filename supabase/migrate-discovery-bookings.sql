-- Run once in Supabase SQL Editor for AestheticBiz.
-- Replaces any older discovery_bookings shape (name/practice_name/slot_start)
-- with the columns used by app/api/discovery-bookings/route.ts.
--
-- Safe if the table does not exist yet. Drops prior rows (demo/test only).

drop table if exists public.discovery_bookings cascade;

create table public.discovery_bookings (
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

create unique index discovery_bookings_start_utc_key
  on public.discovery_bookings (start_utc);

create index discovery_bookings_created_at_idx
  on public.discovery_bookings (created_at desc);

alter table public.discovery_bookings enable row level security;
