import { User } from '@/types';

export default async function fetcherWithUser<JSON = any>(
  input: { url: string; args: User },
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(`${input.url}?email=${input.args.email}`, init);
  return res.json();
}
