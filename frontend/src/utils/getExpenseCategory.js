const categories = [
  {
    name: "Drinks",
    icon: "🥤",
    keywords: ["drink", "drinks", "beer", "coffee", "juice", "bar", "cocktail", "tea", "soda", "water","wine","wishky","rum","vodka","brandy","gin","cold coffee","cold drink","butter milk","lassi","bottle","can"],
  },
  {
    name: "Food",
    icon: "🍽️",
    keywords: ["food", "dinner", "lunch", "breakfast", "restaurant", "pizza", "burger", "meal", "snack","kfc","mcdonalds","McD","dominos","subway","pasta","biryani","thali","dosa","idli","vada","samosa","sandwich","fries","noodles","manchurian","paneer","chicken","mutton","fish","seafood","chinese","italian","indian","south indian","north indian","fruits","vegetables","groceries","grocery","fast food"],
  },
  {
    name: "Transport",
    icon: "🚕",
    keywords: ["taxi", "cab", "uber", "metro", "auto", "rickshaw","ola","transportation","transport","gadi","car rentals","car rental","car hire","car booking"],
  },
  {
    name: "Home",
    icon: "🏠",
    keywords: ["rent", "electricity", "water", "maintenance","home","house","apartment","flat","lpg"],
  },
   {
    name: "fuel",
    icon: "⛽",
    keywords: ["fuel", "petrol", "diesel", "gas","cng"],
  },
   {
    name: "internet",
    icon: "📶",
    keywords: ["internet", "wifi", "data","broadband","mobile data","mobile internet","recharge","wifi bill","wifi recharge","mobile recharge"],
  },
  {
    name: "Travel",
    icon: "✈️",
    keywords: ["flight", "trip", "holiday","bus","redbus","goibibo","makemytrip","yatra"],
  },
    {
    name: "Train",
    icon: "🚇",
    keywords: ["train", "railway", "railroad","rail","irctc","train ticket","train booking","train travel","train journey","railway ticket","railway booking","railway travel","railway journey"],
  },
  {
    name: "Shopping",
    icon: "🛍️",
    keywords: ["shopping", "clothes", "shoes", "gift"],
  },
    {
    name: "Hotel",
    icon: "🏨",
    keywords: ["hotel", "accommodation", "room", "stay","airbnb","booking.com","hotels.com","stay"],
  },
  {
    name: "Entertainment",
    icon: "🎬",
    keywords: ["movie", "concert", "game", "party","entertainment"],
  },
    {
    name: "subscription",
    icon: "📺",
    keywords: ["subscription", "netflix", "prime", "spotify","hotstar","disney+","hulu","youtube premium","apple music","google play music","soundcloud","tidal","deezer","pandora","audible","scribd","kindle unlimited"],
  },
   {
    name: "Utensils",
    icon: "🍴",
    keywords: ["utensil", "cutlery", "plate", "bowl","spoon","fork","knife","glass","cup","mug","pan","pot","kettle","tongs","whisk","grater","peeler","strainer","colander","measuring cup","measuring spoon","ladle","spatula","rolling pin","baking sheet","baking pan","cake pan","muffin tin","loaf pan","pie dish","casserole dish","roasting pan","skillet","frying pan","saucepan","stockpot","wok","pressure cooker","slow cooker","rice cooker"],
  },
  {
    name: "skin care",
    icon: "🎀",
    keywords: ["skin care", "skincare", "cosmetics", "makeup", "beauty","lotion","cream","face wash","face cream","face lotion","face pack","face mask","face scrub","face serum","face oil","face toner","face moisturizer","face cleanser","perfume","fragrance","deodorant","body wash","body lotion","body cream","body butter","body scrub","body oil","body mist","body spray","hair care","hair shampoo","hair conditioner","hair oil","hair serum","hair mask","sun screen","sunscreen","sunscreen lotion","sunscreen cream","sunscreen spray","sunscreen gel","sunscreen stick","sunscreen powder","sunscreen mousse","sunscreen foam","sunscreen balm","sunscreen tint","sunscreen primer","sunscreen foundation","sunscreen concealer","nail polish","nail paint","nail lacquer","nail enamel","nail varnish","nail art","nail stickers","nail decals","nail wraps","nail gems","nail rhinestones","nail studs","nail charms","nail foils","nail tapes","nail brushes","nail files","nail buffers","nail clippers","cuticle nippers","cuticle pushers","cuticle trimmers","shampoo","hair conditioner","conditioner","hair"],
  },

];

export function getExpenseCategory(description) {
  const normalizedDescription = description.toLowerCase();

  return (
    categories.find((category) =>
      category.keywords.some((keyword) =>
        normalizedDescription.includes(keyword),
      ),
    ) ?? {
      name: "General",
      icon: "🧾",
    }
  );
}