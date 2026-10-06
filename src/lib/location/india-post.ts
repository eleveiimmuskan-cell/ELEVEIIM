export type LocationSuggestion = {
  id: string;
  label: string;
  city: string;
  district: string;
  state: string;
  pin: string;
};

type PostalOffice = {
  Name?: string;
  District?: string;
  Block?: string;
  State?: string;
  Pincode?: string;
};

type PostalResponse = {
  Status?: string;
  PostOffice?: PostalOffice[] | null;
};

function text(value: unknown) {
  return String(value ?? "").trim();
}

function mapOffices(offices: PostalOffice[]): LocationSuggestion[] {
  const seen = new Set<string>();
  const items: LocationSuggestion[] = [];
  for (const office of offices) {
    const city = text(office.Name) || text(office.Block) || text(office.District);
    const district = text(office.District);
    const state = text(office.State);
    const pin = text(office.Pincode).replace(/\D/g, "").slice(0, 6);
    if (!city && !district && !state && !pin) continue;
    const id = `${pin}-${city}-${district}-${state}`.toLowerCase();
    if (seen.has(id)) continue;
    seen.add(id);
    items.push({
      id,
      label: [city, district, state, pin].filter(Boolean).join(", "),
      city,
      district,
      state,
      pin,
    });
    if (items.length >= 12) break;
  }
  return items;
}

export async function searchIndiaLocations(query: string): Promise<LocationSuggestion[]> {
  const raw = query.trim();
  if (raw.length < 3) return [];
  const pin = raw.replace(/\D/g, "");
  const url =
    pin.length === 6 && /^\d{6}$/.test(pin)
      ? `https://api.postalpincode.in/pincode/${pin}`
      : `https://api.postalpincode.in/postoffice/${encodeURIComponent(raw)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const payload = (await res.json()) as PostalResponse[];
    const row = Array.isArray(payload) ? payload[0] : null;
    if (!row || row.Status !== "Success" || !Array.isArray(row.PostOffice)) return [];
    return mapOffices(row.PostOffice);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
