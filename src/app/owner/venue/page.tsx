"use client";

import { useState } from "react";
import { Check, ImagePlus, Save } from "lucide-react";
import { MY_VENUE } from "@/lib/ownerData";
import { DISTRICTS, AMENITY_LABELS, PRICE_LABELS, type Amenity, type CoverVariant } from "@/lib/venues";
import { CoverArt } from "@/components/CoverArt";
import { AMENITY_ICONS } from "@/components/icons";

const PHOTOS: CoverVariant[] = ["clay", "teal", "saffron"];

export default function VenueProfilePage() {
  const [name, setName] = useState(MY_VENUE.name);
  const [tagline, setTagline] = useState(MY_VENUE.tagline);
  const [district, setDistrict] = useState<string>(MY_VENUE.district);
  const [address, setAddress] = useState(MY_VENUE.address);
  const [description, setDescription] = useState(MY_VENUE.description);
  const [hours, setHours] = useState(MY_VENUE.openHours);
  const [phone, setPhone] = useState(MY_VENUE.phone);
  const [price, setPrice] = useState<1 | 2 | 3>(MY_VENUE.priceLevel);
  const [amenities, setAmenities] = useState<Set<Amenity>>(new Set(MY_VENUE.amenities));
  const [saved, setSaved] = useState(false);

  const touch = () => setSaved(false);
  const toggleAmenity = (a: Amenity) => {
    touch();
    setAmenities((s) => {
      const n = new Set(s);
      if (n.has(a)) n.delete(a);
      else n.add(a);
      return n;
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Профиль заведения</h1>
          <p className="mt-1 text-muted">Так вашу чайхану видят гости в каталоге.</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Сохранено" : "Сохранить"}
        </button>
      </div>

      {/* Photos */}
      <div className="mt-6 rounded-3xl border border-sand bg-surface p-5">
        <div className="mb-3 font-semibold">Фотографии</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PHOTOS.map((v, i) => (
            <CoverArt key={v} variant={v} dish={MY_VENUE.signatureDishes[i % MY_VENUE.signatureDishes.length]} showBadge={false} className="h-28 w-full rounded-2xl" glyphClassName="text-4xl" />
          ))}
          <button
            type="button"
            className="flex h-28 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-sand-dark text-muted transition hover:border-clay hover:text-clay"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">Добавить</span>
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-sand bg-surface p-5">
          <div className="space-y-4">
            <Field label="Название">
              <input className={inputCls} value={name} onChange={(e) => { setName(e.target.value); touch(); }} />
            </Field>
            <Field label="Слоган">
              <input className={inputCls} value={tagline} onChange={(e) => { setTagline(e.target.value); touch(); }} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Район">
                <select className={inputCls} value={district} onChange={(e) => { setDistrict(e.target.value); touch(); }}>
                  {DISTRICTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="Часы работы">
                <input className={inputCls} value={hours} onChange={(e) => { setHours(e.target.value); touch(); }} />
              </Field>
            </div>
            <Field label="Адрес">
              <input className={inputCls} value={address} onChange={(e) => { setAddress(e.target.value); touch(); }} />
            </Field>
            <Field label="Телефон">
              <input className={inputCls} value={phone} onChange={(e) => { setPhone(e.target.value); touch(); }} />
            </Field>
          </div>
        </div>

        <div className="rounded-3xl border border-sand bg-surface p-5">
          <div className="space-y-4">
            <Field label="Описание">
              <textarea
                rows={5}
                className={`${inputCls} resize-none`}
                value={description}
                onChange={(e) => { setDescription(e.target.value); touch(); }}
              />
            </Field>
            <Field label="Уровень цен">
              <div className="flex gap-2">
                {([1, 2, 3] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => { setPrice(lvl); touch(); }}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      price === lvl ? "border-clay bg-clay/5 text-clay" : "border-sand hover:border-sand-dark"
                    }`}
                  >
                    {"●".repeat(lvl)}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted">{PRICE_LABELS[price]}</p>
            </Field>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-5 rounded-3xl border border-sand bg-surface p-5">
        <div className="mb-3 font-semibold">Удобства</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(AMENITY_LABELS) as Amenity[]).map((a) => {
            const Icon = AMENITY_ICONS[a];
            const on = amenities.has(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggleAmenity(a)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                  on ? "border-teal bg-teal/10 text-teal" : "border-sand text-ink/70 hover:border-sand-dark"
                }`}
              >
                <Icon className="h-4 w-4" />
                {AMENITY_LABELS[a]}
                {on && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-sand bg-cream px-3.5 py-2.5 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      {children}
    </label>
  );
}
