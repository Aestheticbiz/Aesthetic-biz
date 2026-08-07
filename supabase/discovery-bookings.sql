-- Discovery Call bookings.
-- Prefer migrate-discovery-bookings.sql if an older table may already exist.
-- Run in the Supabase SQL editor for the AestheticBiz project.

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

alter table public.discovery_bookings enable row level security;
