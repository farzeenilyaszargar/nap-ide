-- Make auth signup resilient: never block auth user creation if billing bootstrap fails.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  begin
    insert into public.user_usage (user_id, balance)
    values (new.id, 0)
    on conflict (user_id) do nothing;
  exception
    when others then
      -- Avoid breaking OAuth/email signup due to usage bootstrap issues.
      raise warning 'handle_new_user failed for user %: %', new.id, sqlerrm;
  end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
