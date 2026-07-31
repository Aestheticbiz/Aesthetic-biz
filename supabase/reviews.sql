-- AestheticBiz patient reviews (optional Supabase upgrade path)
-- Demo site currently stores seed + pending reviews as JSON under /data.
-- Run this when connecting a live Supabase project.

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

-- Public videos bucket (mirror of LAVA-SA 008_videos_bucket.sql)
-- insert into storage.buckets (id, name, public) values ('videos', 'videos', true)
-- on conflict do nothing;
