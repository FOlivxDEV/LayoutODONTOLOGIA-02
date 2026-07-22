create table public.site_content (
  section text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now(),
  constraint site_content_section_format check (section ~ '^[a-z_]+$'),
  constraint site_content_object_check check (jsonb_typeof(content) in ('object', 'array'))
);

comment on table public.site_content is
  'Public institutional content for the JR Odontologia website. Contains no patient or clinical data.';

alter table public.site_content enable row level security;
revoke all on table public.site_content from anon, authenticated;
grant select on table public.site_content to anon, authenticated;

create policy "Institutional content is publicly readable"
on public.site_content
for select
to anon, authenticated
using (true);

-- The production migration was seeded with the five institutional sections:
-- clinic, insurances, treatment_categories, professionals and faqs.
-- Patient, appointment and clinical information must never be stored here.
