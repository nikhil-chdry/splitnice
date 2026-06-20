import { useState, useMemo } from "react";

const emojiKeywords = [
  { emoji: "🏖️", keywords: ["beach", "goa", "trip", "vacation", "holiday", "resort", "sea", "ocean", "mountain", "trek", "hike", "camping"] },
  { emoji: "🏠", keywords: ["flat", "house", "home", "roommate", "rent", "apartment", "room", "pg", "hostel", "society", "building"] },
  { emoji: "✈️", keywords: ["flight", "travel", "airport", "plane", "flying", "tour", "bangkok", "dubai", "europe", "thailand", "bali", "maldives"] },
  { emoji: "🍽️", keywords: ["dinner", "lunch", "food", "restaurant", "eat", "kitchen", "cooking", "chef", "brunch", "buffet", "cafe"] },
  { emoji: "🎉", keywords: ["party", "birthday", "celebration", "wedding", "event", "fun", "weekend", "new year", "anniversary"] },
  { emoji: "🎬", keywords: ["movie", "cinema", "film", "theatre", "show", "concert", "netflix", "amazon prime", "ott"] },
  { emoji: "🏋️", keywords: ["gym", "fitness", "workout", "exercise", "health", "yoga", "sports", "cricket", "football", "badminton"] },
  { emoji: "📚", keywords: ["study", "college", "school", "university", "class", "course", "exam", "project", "batch", "semester"] },
  { emoji: "🎮", keywords: ["game", "gaming", "play", "pubg", "cod", "console", "pc", "xbox", "ps5", "esports", "lan"] },
  { emoji: "🛍️", keywords: ["shopping", "mall", "market", "buy", "purchase", "sale", "fashion", "outlet", "bazaar"] },
  { emoji: "🚗", keywords: ["car", "road", "drive", "petrol", "fuel", "vehicle", "bike", "motorcycle", "scooter", "cab", "taxi"] },
  { emoji: "💼", keywords: ["office", "work", "job", "company", "business", "team", "colleague", "project", "client", "startup"] },
  { emoji: "🏥", keywords: ["hospital", "doctor", "medical", "health", "clinic", "medicine", "pharmacy", "dentist"] },
  { emoji: "🐶", keywords: ["dog", "pet", "cat", "animal", "puppy", "vet", "pet care"] },
  { emoji: "🌱", keywords: ["garden", "plant", "nature", "park", "green", "eco", "environment"] },
];

const DEFAULT_EMOJI = "📝";

function getEmojiForName(name) {
  if (!name.trim()) return DEFAULT_EMOJI;
  const lower = name.toLowerCase();
  const match = emojiKeywords.find((item) =>
    item.keywords.some((kw) => lower.includes(kw))
  );
  return match ? match.emoji : DEFAULT_EMOJI;
}

function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
  const [name, setName] = useState("");
  const detectedEmoji = useMemo(() => getEmojiForName(name), [name]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    onCreateGroup({
      name: name.trim(),
      icon: detectedEmoji,
    });

    setName("");
    onClose();
  }

  function handleClose() {
    setName("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-cream p-6 text-ink shadow-2xl md:p-9"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold tracking-[-0.05em]">
            Create a group
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-xl transition hover:bg-ink hover:text-white"
          >
            ×
          </button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold">Group name</span>
            <input
              type="text"
              placeholder="Trip to Manali, Flat 301..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-white p-4 outline-none focus:border-brand"
            />
          </label>

          {name.trim() && (
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
              <span className="text-4xl">{detectedEmoji}</span>
              <div>
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">
                  Assigned icon
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  {detectedEmoji === DEFAULT_EMOJI
                    ? "No keyword match — using default"
                    : "Matched from your group name"}
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;