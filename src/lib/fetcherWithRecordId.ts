export default async function fetcherWithRecordId<JSON = any>(
  input: { url: string; recordId: string },
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(`${input.url}?recordId=${input.recordId}`, init);
  return res.json();
}
