/* ============================================================
   TRAVEL EXPLORER — script.js
   ============================================================ */

// Replace with your free OpenWeather API key from https://openweathermap.org/api
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

/* ============================================================
   DESTINATION DATA
   ============================================================ */
const destinations = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    description: "A city that balances ancient tradition with cutting-edge modernity — neon arcades, serene temples, and the world's best ramen.",
    flightTime: "~7h",
    dailyBudget: "SGD 150–250",
    bestSeason: "Mar–May, Oct–Nov",
    overview: "Tokyo is a city of infinite layers. Whether you're chasing cherry blossoms in Ueno Park, exploring the robot restaurants of Akihabara, or hunting for vintage finds in Shimokitazawa, every neighbourhood offers a new world. The public transport is spotless and punctual, food is extraordinary at every price point, and the city never feels unsafe.",
    itinerary: [
      { day: 1, activities: ["Morning: Tsukiji Outer Market breakfast & fresh sushi", "Afternoon: Shibuya Crossing & Harajuku Takeshita Street", "Evening: Shinjuku Golden Gai — tiny bars, big atmosphere"] },
      { day: 2, activities: ["Morning: Senso-ji Temple, Asakusa — arrive early to avoid crowds", "Afternoon: teamLab Borderless digital art museum", "Evening: Tokyo Skytree observation deck at sunset"] },
      { day: 3, activities: ["Morning: Day trip to Nikko Toshogu Shrine or Hakone (Mt Fuji view)", "Afternoon: Return to Tokyo, explore Ginza for shopping", "Evening: Omakase dinner in Roppongi"] }
    ],
    food: ["Ramen at Ichiran (private booths, pork broth perfection)", "Sushi omakase at Tsukiji or Toyosu", "Yakitori under the tracks at Yurakucho", "Wagyu beef kaiseki in Ginza", "Convenience store onigiri and matcha soft serve"],
    transport: "Get a Suica or Pasmo IC card at the airport. JR Pass is worth it if you're doing day trips to Kyoto or Nikko. Taxis are expensive — use the metro or walk.",
    costs: { accommodation: "SGD 80–200/night", food: "SGD 30–80/day", transport: "SGD 15–30/day" },
    safetyTips: ["Tokyo is one of the safest cities in the world — petty crime is extremely rare", "Watch for pickpockets in Shibuya on busy nights", "Carry cash — many smaller restaurants and izakayas are cash-only", "Download Google Translate's camera mode for menus"],
    photoSpots: ["Shibuya Crossing from the Starbucks overpass", "Senso-ji Temple gate (Kaminarimon) at dawn", "Mt Fuji from Kawaguchiko Lake", "Shinjuku at night from the Metropolitan Government Building (free!)"]
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80",
    description: "K-pop, royal palaces, cutting-edge beauty culture, and some of the world's most electrifying street food — Seoul delivers on every front.",
    flightTime: "~6.5h",
    dailyBudget: "SGD 100–200",
    bestSeason: "Apr–Jun, Sep–Nov",
    overview: "Seoul is a city of incredible contrasts — 600-year-old Joseon palaces sit next to glass skyscrapers, and tteokbokki street carts set up beside Michelin-starred restaurants. The city is young, energetic, and has a magnetic street culture that rewards those who wander. English signage is widely available and the subway is excellent.",
    itinerary: [
      { day: 1, activities: ["Morning: Gyeongbokgung Palace — rent a hanbok for free entry", "Afternoon: Bukchon Hanok Village, traditional architecture", "Evening: Hongdae — live music, street art, late-night eats"] },
      { day: 2, activities: ["Morning: Myeongdong street food breakfast (egg bread, skewers)", "Afternoon: N Seoul Tower & Namsan Park", "Evening: Gangnam district, rooftop bars"] },
      { day: 3, activities: ["Morning: Noryangjin Fish Market — pick your seafood, eat it fresh", "Afternoon: COEX Mall aquarium or Lotte World", "Evening: Insadong antique street, makgeolli tasting"] }
    ],
    food: ["Korean BBQ at a pork belly specialist in Mapo-gu", "Bibimbap at Gogung restaurant", "Tteokbokki and sundae from Gwangjang Market", "Chimaek (fried chicken + beer) in Hongdae", "Patbingsu shaved ice dessert in summer"],
    transport: "T-money card covers all metro and buses. Kakao T app for taxis. Seoul Metro is clean, cheap and covers every major attraction.",
    costs: { accommodation: "SGD 70–180/night", food: "SGD 20–60/day", transport: "SGD 10–20/day" },
    safetyTips: ["Seoul is very safe for solo travellers including women", "Subway can get crowded during rush hours — watch your belongings", "Drinking culture is strong — know your limits", "Carry your passport as ID — required for some clubs"],
    photoSpots: ["Bukchon Hanok Village alleyways at sunrise", "Gyeongbokgung Palace with hanbok rental", "Namsan Tower love lock fence", "Han River at night from the Mapo Bridge area"]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Emerald rice terraces, spiritual Hindu temples, world-class surf breaks, and a wellness culture that draws visitors back year after year.",
    flightTime: "~2.5h",
    dailyBudget: "SGD 80–180",
    bestSeason: "Apr–Oct (dry season)",
    overview: "Bali is more than just a holiday — it's a mood. The island's Hindu spiritual culture permeates every street corner: offerings on the ground, incense in the air, temple gates at every village entrance. Ubud is the cultural heart (rice terraces, yoga, healing retreats), while Seminyak and Canggu offer beach clubs and surf. Uluwatu is for the cliff temples and sunset cocktails.",
    itinerary: [
      { day: 1, activities: ["Morning: Tegallalang Rice Terraces, Ubud", "Afternoon: Monkey Forest Sanctuary", "Evening: Kecak fire dance at Uluwatu Temple at sunset"] },
      { day: 2, activities: ["Morning: Tirta Empul holy spring water temple", "Afternoon: Ubud Art Market & Jalan Hanoman restaurants", "Evening: Traditional Balinese cooking class"] },
      { day: 3, activities: ["Morning: Seminyak beach, sunrise swim", "Afternoon: Canggu — surf lesson or watch the pros at Echo Beach", "Evening: Single Fin cliff bar, Uluwatu — watch the sunset with a Bintang"] }
    ],
    food: ["Babi guling (suckling pig) at Ibu Oka, Ubud", "Nasi campur — rice with mixed sides at any local warung", "Fresh fish BBQ on Jimbaran Bay beach", "Smoothie bowls at any Canggu cafe", "Bebek betutu — slow-cooked spiced duck"],
    transport: "Rent a scooter for SGD 8–12/day if confident. Use Gojek app for cheap private cars. Taxis — always negotiate upfront or insist on the meter.",
    costs: { accommodation: "SGD 60–250/night", food: "SGD 15–50/day", transport: "SGD 10–25/day" },
    safetyTips: ["Beware the 'friendly local' who offers to guide you to a gem store", "Don't pet or feed monkeys — they bite", "Wear a helmet on scooters — checkpoints are frequent", "Be respectful at temples — cover shoulders and wear a sarong"],
    photoSpots: ["Tegallalang Rice Terraces, Ubud", "Gates of Heaven at Pura Lempuyang", "Uluwatu Temple cliff at sunset", "Tanah Lot Temple at low tide"]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    description: "Sparkling harbour views, a global food paradise, and a seamless blend of four cultures — Singapore punches well above its size.",
    flightTime: "Home base",
    dailyBudget: "SGD 100–300",
    bestSeason: "Feb–Apr (least rain)",
    overview: "Singapore may be small but it rewards exploration. From the Michelin-starred hawker stalls of Newton Circus to the cloud forest of Gardens by the Bay, from the colonial shophouses of Tanjong Pagar to the rooftop infinity pool at Marina Bay Sands — this city-state is a masterclass in doing everything well. It's also an ideal base for onward travel across Southeast Asia.",
    itinerary: [
      { day: 1, activities: ["Morning: Kampong Glam — Arab Street, Haji Lane, Sultan Mosque", "Afternoon: Gardens by the Bay — Supertrees & Cloud Forest", "Evening: Marina Bay Sands rooftop infinity pool (hotel guests only) or CE LA VI bar"] },
      { day: 2, activities: ["Morning: Chinatown & Sri Mariamman Temple, then hawker breakfast", "Afternoon: Sentosa Island — Universal Studios or beach", "Evening: Clarke Quay riverside dining and bars"] },
      { day: 3, activities: ["Morning: Little India — Mustafa Centre, Tekka Market", "Afternoon: Singapore Botanic Gardens (UNESCO site)", "Evening: Hawker dinner at Lau Pa Sat, then rooftop bar"] }
    ],
    food: ["Chilli crab at No Signboard or Jumbo Seafood", "Hainanese chicken rice at Tian Tian, Maxwell Hawker Centre", "Laksa at 328 Katong Laksa", "Roti prata at any mamak (late night)", "Char kway teow at Outram Park"],
    transport: "MRT and buses cover everywhere — EZ Link card. Grab app for taxis and delivery. Bike rentals available at East Coast Park.",
    costs: { accommodation: "SGD 100–400/night", food: "SGD 10–60/day", transport: "SGD 5–20/day" },
    safetyTips: ["Singapore is one of the safest cities in Asia", "Fines are real: no littering, no chewing gum imported, no durian on MRT", "Heat and humidity are year-round — stay hydrated", "Check NEA dengue alerts if visiting parks"],
    photoSpots: ["Marina Bay Sands from the helix bridge", "Supertrees at Gardens by the Bay at night", "Merlion with CBD skyline behind", "Jewel Changi Airport waterfall"]
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c079bf7?w=800&q=80",
    description: "Grand golden temples, chaotic night markets, world-famous street food, and rooftop bars that will leave you speechless.",
    flightTime: "~2.5h",
    dailyBudget: "SGD 70–160",
    bestSeason: "Nov–Feb (cool & dry)",
    overview: "Bangkok is sensory overload in the best possible way. The Chao Phraya river snakes through a city of ornate temples and gleaming malls. Tuk-tuks, street carts, and skytrain stations create a chaotic but deeply addictive urban rhythm. Eat everything — the food here is the reference point for all Thai cuisine worldwide.",
    itinerary: [
      { day: 1, activities: ["Morning: Wat Phra Kaew & Grand Palace (arrive before 10am)", "Afternoon: Wat Arun (Temple of Dawn) across the river by ferry", "Evening: Asiatique the Riverfront — night market with river views"] },
      { day: 2, activities: ["Morning: Chatuchak Weekend Market (weekends only) or JJ Green", "Afternoon: Jim Thompson's House museum, then Siam Square malls", "Evening: Vertigo rooftop bar at Banyan Tree hotel for city views"] },
      { day: 3, activities: ["Morning: Day trip to Ayutthaya ancient capital by train (~90 min)", "Afternoon: Return to Bangkok, Khao San Road for sunset beers", "Evening: Late-night feast at Or Tor Kor market or Yaowarat Chinatown"] }
    ],
    food: ["Pad thai from a street cart — best near Wat Arun", "Tom yum goong at Baan Phadthai", "Som tum (green papaya salad) at any local restaurant", "Mango sticky rice from street vendors", "Boat noodles at Or Tor Kor Market"],
    transport: "BTS Skytrain and MRT for most sights. Grab app for taxis. Long-tail boats on Chao Phraya for river hopping. Always negotiate tuk-tuk prices upfront.",
    costs: { accommodation: "SGD 50–200/night", food: "SGD 15–50/day", transport: "SGD 8–20/day" },
    safetyTips: ["Beware of the 'closed temple' scam — tuk-tuk drivers may say Grand Palace is closed (it's not)", "Dress modestly at all temples — shoulders and knees covered", "Tap water not safe to drink — bottled water only", "Flooding during Oct–Nov rainy season — check forecasts"],
    photoSpots: ["Wat Phra Kaew golden spires at dawn", "Wat Arun at sunset from the opposite bank", "Chatuchak market aerial view", "Vertigo rooftop bar at night — 360° city panorama"]
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    country: "China SAR",
    flag: "🇭🇰",
    image: "https://images.unsplash.com/photo-1506374322094-6021fc3926f1?w=800&q=80",
    description: "One of the world's most dramatic skylines, legendary dim sum culture, and a density of experiences per square kilometre unlike anywhere else.",
    flightTime: "~3.5h",
    dailyBudget: "SGD 120–250",
    bestSeason: "Oct–Mar",
    overview: "Hong Kong is a city of contrasts stacked vertically — street food markets below, luxury malls above, and some of Asia's best hiking trails just minutes from the financial district. The dim sum culture alone is worth the flight. Take the Peak Tram, explore the temple-packed streets of Yau Ma Tei, and catch the Symphony of Lights harbour show at 8pm.",
    itinerary: [
      { day: 1, activities: ["Morning: Dim sum breakfast at Tim Ho Wan (book ahead) or Lin Heung Tea House", "Afternoon: Victoria Peak via tram — panoramic harbour views", "Evening: Symphony of Lights show from Tsim Sha Tsui waterfront"] },
      { day: 2, activities: ["Morning: Sham Shui Po — electronics, fabric markets, pineapple buns", "Afternoon: Tian Tan Big Buddha on Lantau Island by cable car", "Evening: Ladies Street night market, then Temple Street Night Market"] },
      { day: 3, activities: ["Morning: Sai Kung fishing village — fresh seafood lunch by the harbour", "Afternoon: Hike Dragon's Back trail (easy, spectacular views)", "Evening: LKF (Lan Kwai Fong) for nightlife"] }
    ],
    food: ["Dim sum — har gow, siu mai, char siu bao at Tim Ho Wan", "Roast goose at Yung Kee restaurant", "Wonton noodle soup at Mak's Noodle", "Egg tarts at Tai Cheong Bakery", "Pineapple bun with butter at any cha chaan teng"],
    transport: "Octopus card for all MTR, buses, trams, and ferries. Star Ferry across Victoria Harbour is a must (SGD 0.40!). Airport Express to/from airport is fast and direct.",
    costs: { accommodation: "SGD 120–350/night", food: "SGD 30–80/day", transport: "SGD 10–25/day" },
    safetyTips: ["Hong Kong is generally very safe for tourists", "Typhoon season is May–November — check T-signal warnings", "Air quality varies — check AQI if you have respiratory issues", "Drink freely — tap water is safe and excellent"],
    photoSpots: ["Victoria Harbour at night from Tsim Sha Tsui Promenade", "Victoria Peak viewpoint at blue hour", "Rainbow Row in Choi Hung Estate car park", "Man Mo Temple interior, Sheung Wan"]
  },
  {
    id: "kualalumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    flag: "🇲🇾",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    description: "The twin towers, incredible multicultural street food, world-class malls, and a gateway to Malaysia's tropical rainforests.",
    flightTime: "~1h",
    dailyBudget: "SGD 60–130",
    bestSeason: "May–Jul, Dec–Feb",
    overview: "KL is a city where Malay, Chinese, and Indian cultures have merged into one of the world's great food destinations. The Petronas Twin Towers dominate the skyline, but wander deeper and you'll find colonial-era buildings, hawker alleys, and a thriving art scene. It's also one of the most affordable major cities in Southeast Asia.",
    itinerary: [
      { day: 1, activities: ["Morning: Petronas Twin Towers skybridge — book tickets in advance", "Afternoon: KLCC Park & Aquaria, then Pavilion Mall", "Evening: Jalan Alor night food street — satay, char kway teow, cendol"] },
      { day: 2, activities: ["Morning: Batu Caves Hindu temple — 272 steps, golden statue", "Afternoon: KL Forest Eco Park, then Merdeka Square colonial buildings", "Evening: Chow Kit Market for local street food"] },
      { day: 3, activities: ["Morning: Petaling Street (Chinatown) — knockoffs & dim sum", "Afternoon: National Museum or Islamic Arts Museum", "Evening: Rooftop bar at Heli Lounge Bar — actual rooftop helipad!"] }
    ],
    food: ["Nasi lemak from a Malay stall — the national breakfast", "Bak kut teh (pork rib soup) at Klang or Old Town", "Char kuey teow at Jalan Alor", "Roti canai with dal at any mamak stall (open 24h)", "Cendol — shaved ice, coconut milk, pandan jelly, palm sugar"],
    transport: "LRT and MRT lines cover most tourist spots. Grab app is very reliable and cheap. KL Sentral is the hub for trains to KLIA airport.",
    costs: { accommodation: "SGD 50–180/night", food: "SGD 10–40/day", transport: "SGD 5–15/day" },
    safetyTips: ["Avoid carrying large amounts of cash in Chinatown and Chow Kit areas", "Book ride-hailing apps rather than street taxis to avoid overcharging", "Modest dress required at mosques and religious sites", "Heat is intense year-round — schedule outdoor activities in the morning"],
    photoSpots: ["Petronas Twin Towers from KLCC Park at night", "Batu Caves colourful stairs", "KL Tower Observation Deck (shorter queues than Petronas)", "Rooftop helipad bar — panoramic 360° city view"]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    flag: "🇲🇻",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    description: "Overwater bungalows, crystal-clear turquoise lagoons, house reef snorkelling, and spectacular underwater biodiversity.",
    flightTime: "~4h + speedboat",
    dailyBudget: "SGD 400–1500",
    bestSeason: "Nov–Apr (dry season)",
    overview: "The Maldives is the ultimate luxury escape — though budget options on local islands now make it accessible to more travellers. The water is an almost unreal shade of turquoise, the house reefs are teeming with turtles and reef sharks, and the sunsets are reliably cinematic every single evening. Choose a resort island for overwater luxury or a local island (Maafushi, Dhigurah) for budget travel.",
    itinerary: [
      { day: 1, activities: ["Morning: Arrive via speedboat, check in, snorkel the house reef", "Afternoon: Stand-up paddleboarding on the lagoon", "Evening: Sunset cocktails on the overwater deck"] },
      { day: 2, activities: ["Morning: Early dolphin cruise before breakfast", "Afternoon: Sandbank picnic — private sandbank, champagne, snorkelling", "Evening: Bioluminescent plankton beach walk at night"] },
      { day: 3, activities: ["Morning: PADI dive at the fish market or hammerhead point", "Afternoon: Maldivian cooking class or spa", "Evening: Underwater restaurant experience"] }
    ],
    food: ["Fresh grilled lobster and fish at resort restaurants", "Mas huni — tuna and coconut breakfast on local islands", "Hedhikaa Maldivian short eats — tuna-filled pastries", "Roshi flatbread with curries", "Freshly cracked coconut on any island"],
    transport: "Most resorts require a speedboat (30–90 mins from Malé). Budget option: ferry to local islands (cheap but only once daily). Seaplane transfers are spectacular but expensive.",
    costs: { accommodation: "SGD 300–2000/night", food: "SGD 80–300/day", transport: "SGD 50–500 (transfer)" },
    safetyTips: ["Apply sunscreen that is reef-safe — mandatory at many resorts", "Don't touch coral under any circumstances", "Current and tides change quickly — check with dive instructors", "Alcohol is only available on resort islands, not local islands"],
    photoSpots: ["Overwater bungalow at golden hour", "Sandbank aerial from drone", "Coral garden while snorkelling", "Bioluminescent beach at night (long exposure)"]
  },
  {
    id: "phuket",
    name: "Phuket & Krabi",
    country: "Thailand",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
    description: "Towering limestone karsts rising from emerald waters, hidden lagoons, and beach clubs that strike the perfect holiday balance.",
    flightTime: "~2h",
    dailyBudget: "SGD 80–200",
    bestSeason: "Nov–Apr",
    overview: "Phuket and Krabi together form one of the world's great beach destinations. Phuket is larger with more infrastructure — Patong for nightlife, Kata for families, Kamala for peace. Krabi's Railay Beach, only reachable by boat, is one of Asia's most dramatic settings. Island-hop to Phi Phi Islands, Ko Lanta, or Four Islands for snorkelling.",
    itinerary: [
      { day: 1, activities: ["Morning: Arrive Phuket, check in, Kata or Kamala beach", "Afternoon: Big Buddha viewpoint, then Chalong Temple", "Evening: Old Phuket Town for street art, Sino-Portuguese architecture, food"] },
      { day: 2, activities: ["Morning: Full-day Phi Phi Islands tour — snorkelling at Maya Bay", "Evening: Return to Phuket, Patong Beach if you want nightlife"] },
      { day: 3, activities: ["Morning: Ferry to Krabi (90 min), check in Railay Beach by longtail", "Afternoon: Railay Beach West — climbing, kayaking, or just swim", "Evening: Sunset from Railay Viewpoint, dinner at Railay Bay"] }
    ],
    food: ["Tom kha gai (coconut milk soup) at any Patong restaurant", "Pad see ew noodles from a street cart", "Seafood BBQ on the beach at Krabi Town", "Massaman curry — slow-cooked beef, peanuts", "Khao niao mamuang — mango sticky rice for dessert"],
    transport: "Grab app in Phuket. Songthaews (shared trucks) are cheap for beach hopping. Ferries and speedboats to islands — book via any travel agency.",
    costs: { accommodation: "SGD 60–300/night", food: "SGD 15–60/day", transport: "SGD 10–30/day" },
    safetyTips: ["Red flag means no swimming — strong rip currents during monsoon months", "Only swim at patrolled beaches with lifeguards", "Watch out for jet ski scam — pre-existing damage claimed on return", "Protect against dengue and mosquitoes especially near forested areas"],
    photoSpots: ["Maya Bay, Phi Phi Le (arrive before 9am for emptier shots)", "Railay Beach West, Krabi — limestone karsts from the water", "Phang Nga Bay (James Bond Island) at sunrise", "Big Buddha Phuket at dusk"]
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    description: "One of the world's most beautiful harbour cities — iconic Opera House, world-class beaches, and a laid-back culture built around food and sunshine.",
    flightTime: "~8h",
    dailyBudget: "SGD 200–400",
    bestSeason: "Sep–Nov, Mar–May",
    overview: "Sydney is effortlessly liveable — the harbour is stunning, the beaches are legendary, and the food scene has matured into one of Asia-Pacific's most exciting. Walk across the Harbour Bridge, swim at Bondi, and eat your way through the diverse neighbourhoods. It's expensive by Asian standards but the quality of experience justifies every dollar.",
    itinerary: [
      { day: 1, activities: ["Morning: Sydney Harbour — circular quay, Opera House tour", "Afternoon: The Rocks historic precinct & weekend market", "Evening: Opera Bar for sunset drinks with harbour view"] },
      { day: 2, activities: ["Morning: Bondi to Coogee coastal walk (6km, stunning)", "Afternoon: Bondi beach swim, then Icebergs ocean pool", "Evening: Surrey Hills and Surry Hills restaurants"] },
      { day: 3, activities: ["Morning: Blue Mountains day trip — Three Sisters, Scenic World cable car", "Afternoon: Return to Sydney, explore Newtown for independent shops", "Evening: Barangaroo Reserve and Darling Harbour for waterfront dinner"] }
    ],
    food: ["Flat white coffee — Sydney claims to have invented it", "Barramundi fish and chips at Bondi Beach kiosks", "Dumplings and yum cha in Chinatown", "Avocado smash at any Newtown or Surry Hills cafe", "Sydney rock oysters at any fish market or harbour restaurant"],
    transport: "Opal card covers trains, buses, ferries, and light rail. Sydney Ferries are a tourist attraction in themselves — take one across the harbour.",
    costs: { accommodation: "SGD 180–450/night", food: "SGD 50–120/day", transport: "SGD 20–40/day" },
    safetyTips: ["Swim between the flags at beaches — lifeguards patrol patrolled sections only", "Strong UV — SPF 50+ sunscreen and a hat are essential", "Drive on the left; international driving licence accepted", "Sydney tap water is excellent — fill a bottle and save money"],
    photoSpots: ["Sydney Opera House from Mrs Macquarie's Chair", "Bondi Beach aerial from the clifftop path", "Harbour Bridge from Milsons Point at night", "Three Sisters rock formation, Blue Mountains at sunrise"]
  },
  {
    id: "taipei",
    name: "Taipei",
    country: "Taiwan",
    flag: "🇹🇼",
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80",
    description: "Night markets, bubble tea birthplace, Taipei 101, and a warm, friendly culture that makes every visit feel like a homecoming.",
    flightTime: "~4.5h",
    dailyBudget: "SGD 80–180",
    bestSeason: "Oct–Dec, Mar–May",
    overview: "Taipei is underrated and fiercely loved by those who visit. The night market culture is unmatched anywhere in Asia — from the giant Shilin to the local Raohe, every evening becomes a food crawl. Taipei 101 still commands the skyline, the MRT is world-class, and the people are among the friendliest in Asia. Day trips to the north coast, Jiufen, and Taroko Gorge are all easily accessible.",
    itinerary: [
      { day: 1, activities: ["Morning: Chiang Kai-shek Memorial Hall and changing of guard", "Afternoon: Da'an District — cafes, bookshops, Yongkang Street for food", "Evening: Shilin Night Market — stinky tofu, scallion pancakes, oyster omelette"] },
      { day: 2, activities: ["Morning: Day trip to Jiufen old street — gold rush mountain town, teahouses", "Afternoon: Yeliu Geopark — weird and wonderful rock formations on the coast", "Evening: Return to Taipei, Din Tai Fung for xiaolongbao (book ahead)"] },
      { day: 3, activities: ["Morning: Taipei 101 observation deck — views over the whole basin", "Afternoon: National Palace Museum — world's greatest Chinese art collection", "Evening: Raohe Night Market, then craft beer in Zhongshan district"] }
    ],
    food: ["Xiaolongbao soup dumplings at Din Tai Fung", "Oyster vermicelli noodles at Shilin Night Market", "Lu rou fan (braised pork rice) at any local shop", "Bubble milk tea — the original at Chun Shui Tang", "Scallion pancakes from a street cart"],
    transport: "Easy Card covers all MRT, buses, and YouBike rental. Taipei Metro is clean, punctual, and has English signage everywhere. Very walkable city.",
    costs: { accommodation: "SGD 70–200/night", food: "SGD 15–50/day", transport: "SGD 5–15/day" },
    safetyTips: ["Taipei is extremely safe — low crime across the board", "Typhoon season June–October — follow government advisories", "Don't eat or drink on the MRT — fines up to TWD 7500", "Free WiFi widely available throughout the city"],
    photoSpots: ["Jiufen tea house alleys at dusk", "Taipei 101 lit up at night", "Elephant Mountain (Xiangshan) for 101 framed by nature", "Shilin Night Market aerial crowd shot"]
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    flag: "🇻🇳",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
    description: "French colonial boulevards, ancient temple lakes, the world's best pho, and a unique Old Quarter where streets are named after the trades once sold there.",
    flightTime: "~3.5h",
    dailyBudget: "SGD 50–120",
    bestSeason: "Oct–Apr (dry & mild)",
    overview: "Hanoi is slower, older, and more melancholy than Ho Chi Minh City — in a beautiful way. The Old Quarter is a dense tangle of streets each historically dedicated to one craft (silk, paper, tin). The lakes — Hoan Kiem and West Lake — provide breathing room. The food is extraordinary and absurdly affordable. Day trips to Ha Long Bay and Ninh Binh are world-class.",
    itinerary: [
      { day: 1, activities: ["Morning: Hoan Kiem Lake & Ngoc Son Temple at dawn — peaceful", "Afternoon: Old Quarter walking tour — 36 streets, French Quarter", "Evening: Bia Hoi corner (corner of Dinh Liet & Luong Ngoc Quyen) — cheapest beer in the world"] },
      { day: 2, activities: ["Morning: Ho Chi Minh Mausoleum & One Pillar Pagoda", "Afternoon: Temple of Literature — Vietnam's first university", "Evening: Train Street — narrow alley where train passes metres away"] },
      { day: 3, activities: ["Morning: Full-day cruise to Ha Long Bay (organised tour) or Ninh Binh", "Evening: Return to Hanoi, pho and spring rolls in the Old Quarter"] }
    ],
    food: ["Pho bo (beef noodle soup) for breakfast — Pho Gia Truyen on Bat Dan St", "Bun cha (grilled pork with noodles) — Obama ate here at Bun Cha Huong Lien", "Banh mi sandwiches from any street cart — SGD 0.50", "Cha ca — sizzling turmeric fish on rice noodles at Cha Ca La Vong", "Egg coffee (ca phe trung) at Cafe Giang"],
    transport: "Grab app for most rides — cheap and reliable. Walking is the best way to explore the Old Quarter. Day trips to Ha Long Bay: book a reputable overnight cruise via your hotel.",
    costs: { accommodation: "SGD 30–150/night", food: "SGD 8–30/day", transport: "SGD 5–15/day" },
    safetyTips: ["Traffic in the Old Quarter is chaotic — walk slowly and steadily into the flow", "Only book Ha Long Bay cruises through verified agencies — check TripAdvisor", "Motorbike snatching does occur — hold bags on the side away from traffic", "Be cautious of restaurants quoting in USD then charging unexpectedly"],
    photoSpots: ["Hoan Kiem Lake and the red Huc Bridge at dawn", "Train Street (alley) — schedule at roughly 7pm and 9:30pm", "Ha Long Bay limestone karsts at sunrise", "Bun cha restaurant breakfast in the Old Quarter"]
  }
];

/* ============================================================
   PACKING CHECKLIST DATA
   ============================================================ */
const packingData = [
  {
    category: "Documents",
    items: ["Passport (6+ months validity)", "Visa / e-Visa printout", "Travel insurance policy", "Hotel booking confirmations", "Flight e-tickets", "Emergency contact list", "International driving licence"]
  },
  {
    category: "Clothing",
    items: ["Lightweight shirts (×5)", "Shorts / travel pants (×3)", "Underwear (×7)", "Socks (×5 pairs)", "Walking shoes / sneakers", "Sandals or flip-flops", "Rain jacket or packable umbrella", "Sun hat or cap", "Light layer / hoodie for A/C"]
  },
  {
    category: "Electronics",
    items: ["Universal travel adapter", "Power bank (10,000mAh+)", "Phone charger cable", "Earphones / AirPods", "Camera + memory cards", "Laptop or tablet", "E-reader (optional)", "Portable WiFi or local SIM"]
  },
  {
    category: "Medication",
    items: ["Personal prescription medication", "Antihistamines", "Diarrhoea tablets (Imodium)", "Oral rehydration salts", "Paracetamol / ibuprofen", "Antiseptic wipes", "Insect repellent (DEET-based)", "Sunscreen SPF50+", "Motion sickness tablets"]
  },
  {
    category: "Travel Essentials",
    items: ["Luggage locks", "Travel towel (quick-dry)", "Reusable water bottle", "Neck pillow for long flights", "Sleep mask & earplugs", "Zip-lock bags (for liquids)", "Waterproof phone pouch", "Small day backpack", "Local currency (cash for arrival)"]
  }
];

/* ============================================================
   TRANSLATION SYSTEM
   ============================================================ */
const SUPPORTED_LANGS = [
  { code: "en", flag: "🇬🇧", label: "EN", name: "English" },
  { code: "zh", flag: "🇨🇳", label: "ZH", name: "中文" },
  { code: "ja", flag: "🇯🇵", label: "JA", name: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "KO", name: "한국어" },
  { code: "th", flag: "🇹🇭", label: "TH", name: "ไทย" },
  { code: "vi", flag: "🇻🇳", label: "VI", name: "Tiếng Việt" },
];

const uiTranslations = {
  en: {
    "nav-home": "Home", "nav-guides": "Guides", "nav-cities": "Cities",
    "nav-tools": "Travel Tools", "nav-weather": "Weather", "nav-safety": "Safety", "nav-enquiry": "Enquiry",
    "hero-eyebrow": "Asia's Premier Travel Guide",
    "hero-headline": "We went, so you know<br>where to go.",
    "hero-sub": "Curated travel guides with real prices, realistic itineraries, airport tips, safety notes, weather insights, and local recommendations.",
    "hero-cta1": "Read Latest Guide", "hero-cta2": "Send Enquiry", "hero-scroll": "Scroll to explore",
    "guides-label": "Latest Guides",
    "guides-title": "Hand-picked destinations,<br>real traveller insights",
    "guides-sub": "Our editors have visited every city on this list — prices, itineraries, and tips are based on actual trips.",
    "featured-badge": "Editor's Pick",
    "meta-flight": "Flight from SG", "meta-budget": "Daily Budget", "meta-season": "Best Season",
    "btn-read-full": "Read Full Guide",
    "cities-label": "Destinations", "cities-title": "12 Cities Worth Every Hour of the Flight",
    "btn-view-guide": "View Guide", "card-flight": "Flight (SG)", "card-budget": "Daily Budget", "card-best": "Best:",
    "tools-label": "Travel Tools", "tools-title": "Plan smarter, travel better",
    "budget-tool-title": "Trip Budget Calculator",
    "budget-tool-desc": "Estimate your total trip cost in SGD before you book.",
    "budget-dest-label": "Destination", "budget-dest-ph": "Select destination",
    "budget-travellers-label": "Number of Travellers", "budget-travellers-ph": "e.g. 2",
    "budget-days-label": "Number of Days", "budget-days-ph": "e.g. 5",
    "budget-daily-label": "Daily Budget per Person (SGD)", "budget-daily-ph": "e.g. 200",
    "btn-calculate": "Calculate",
    "packing-tool-title": "Packing Checklist",
    "packing-tool-desc": "Tick off items as you pack. Your progress is saved in the browser.",
    "itin-tool-title": "Itinerary Planner",
    "itin-tool-desc": "Build your day-by-day trip plan and reference it anytime.",
    "itin-day-label": "Day", "itin-day-ph": "1", "itin-time-label": "Time",
    "itin-activity-label": "Activity", "itin-activity-ph": "e.g. Visit Senso-ji Temple",
    "itin-notes-label": "Notes", "itin-notes-ph": "Optional notes",
    "btn-add-entry": "Add Entry", "btn-clear-all": "Clear All",
    "itin-th-day": "Day", "itin-th-time": "Time", "itin-th-activity": "Activity", "itin-th-notes": "Notes",
    "itin-day-prefix": "Day",
    "weather-label": "Weather", "weather-title": "Check the forecast before you fly",
    "weather-sub": "Powered by OpenWeather. Add your free API key to activate live weather lookups.",
    "weather-city-ph": "Enter city name, e.g. Tokyo", "btn-check-weather": "Check Weather",
    "weather-humidity": "Humidity", "weather-wind": "Wind", "weather-feels": "Feels like",
    "safety-label": "Travel Safety", "safety-title": "Travel smart, stay safe",
    "safety-sub": "Our editors have compiled essential safety information for every destination on this list.",
    "safety-ins-h": "Travel Insurance", "safety-health-h": "Health Precautions",
    "safety-scam-h": "Scam Awareness", "safety-emergency-h": "Emergency Numbers",
    "safety-solo-h": "Solo Travel Tips", "safety-levels-h": "Destination Safety Levels",
    "enquiry-label": "Get in Touch", "enquiry-title": "Plan your perfect trip with us",
    "enquiry-sub": "Tell us where you want to go. Our travel editors will put together a personalised guide tailored to your dates and budget.",
    "enquiry-p1": "✓ Response within 24 hours", "enquiry-p2": "✓ Custom itinerary suggestions", "enquiry-p3": "✓ No obligation, no spam",
    "form-name": "Full Name", "form-email": "Email", "form-phone": "Phone",
    "form-name-ph": "Jane Smith", "form-email-ph": "jane@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "Destination of Interest", "form-dest-ph": "Select a destination",
    "form-date": "Travel Date", "form-travellers": "Number of Travellers", "form-travellers-ph": "2",
    "form-message": "Message", "form-message-ph": "Tell us about your trip plans, interests, or any questions...",
    "btn-send": "Send Enquiry",
    "form-success": "Enquiry sent!", "form-success-msg": "Thank you! We'll be in touch within 24 hours.",
    "footer-tagline": "We went, so you know where to go.",
  },

  zh: {
    "nav-home": "首页", "nav-guides": "指南", "nav-cities": "城市",
    "nav-tools": "旅行工具", "nav-weather": "天气", "nav-safety": "安全", "nav-enquiry": "询问",
    "hero-eyebrow": "亚洲首席旅游指南",
    "hero-headline": "我们亲身前往，<br>让你知道该去哪里。",
    "hero-sub": "精心策划的旅游指南，包含真实价格、实际行程、机场贴士、安全须知、天气洞察及本地推荐。",
    "hero-cta1": "阅读最新指南", "hero-cta2": "发送询问", "hero-scroll": "滚动探索",
    "guides-label": "最新指南",
    "guides-title": "精心挑选的目的地，<br>真实旅行者见解",
    "guides-sub": "我们的编辑亲身到访此列表上的每一座城市——价格、行程和攻略均基于实际旅行。",
    "featured-badge": "编辑推荐",
    "meta-flight": "新加坡出发航班", "meta-budget": "每日预算", "meta-season": "最佳季节",
    "btn-read-full": "阅读完整指南",
    "cities-label": "目的地", "cities-title": "12座值得飞行每一小时的城市",
    "btn-view-guide": "查看指南", "card-flight": "航班（新加坡）", "card-budget": "每日预算", "card-best": "最佳：",
    "tools-label": "旅行工具", "tools-title": "更智慧地计划，更好地旅行",
    "budget-tool-title": "旅行预算计算器",
    "budget-tool-desc": "在预订前估算您的总旅行费用（新元）。",
    "budget-dest-label": "目的地", "budget-dest-ph": "选择目的地",
    "budget-travellers-label": "旅行人数", "budget-travellers-ph": "例如 2",
    "budget-days-label": "天数", "budget-days-ph": "例如 5",
    "budget-daily-label": "每人每日预算（新元）", "budget-daily-ph": "例如 200",
    "btn-calculate": "计算",
    "packing-tool-title": "打包清单",
    "packing-tool-desc": "打包时逐项勾选。您的进度将保存在浏览器中。",
    "itin-tool-title": "行程规划器",
    "itin-tool-desc": "制定您的逐日行程并随时参考。",
    "itin-day-label": "天", "itin-day-ph": "1", "itin-time-label": "时间",
    "itin-activity-label": "活动", "itin-activity-ph": "例如：参观浅草寺",
    "itin-notes-label": "备注", "itin-notes-ph": "可选备注",
    "btn-add-entry": "添加条目", "btn-clear-all": "清除所有",
    "itin-th-day": "天", "itin-th-time": "时间", "itin-th-activity": "活动", "itin-th-notes": "备注",
    "itin-day-prefix": "第",
    "weather-label": "天气", "weather-title": "飞行前查看天气预报",
    "weather-sub": "由OpenWeather驱动。添加您的免费API密钥以启用实时天气查询。",
    "weather-city-ph": "输入城市名称，例如 东京", "btn-check-weather": "查看天气",
    "weather-humidity": "湿度", "weather-wind": "风速", "weather-feels": "体感温度",
    "safety-label": "旅行安全", "safety-title": "智慧旅行，保持安全",
    "safety-sub": "我们的编辑为此列表上的每个目的地汇编了基本安全信息。",
    "safety-ins-h": "旅行保险", "safety-health-h": "健康预防措施",
    "safety-scam-h": "防诈骗意识", "safety-emergency-h": "紧急电话号码",
    "safety-solo-h": "独自旅行贴士", "safety-levels-h": "目的地安全等级",
    "enquiry-label": "联系我们", "enquiry-title": "和我们一起规划您的完美旅行",
    "enquiry-sub": "告诉我们您想去哪里。我们的旅游编辑将根据您的日期和预算制定个性化指南。",
    "enquiry-p1": "✓ 24小时内回复", "enquiry-p2": "✓ 定制行程建议", "enquiry-p3": "✓ 无需承诺，无垃圾邮件",
    "form-name": "全名", "form-email": "电子邮件", "form-phone": "电话",
    "form-name-ph": "张三", "form-email-ph": "zhang@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "感兴趣的目的地", "form-dest-ph": "选择目的地",
    "form-date": "出行日期", "form-travellers": "旅行人数", "form-travellers-ph": "2",
    "form-message": "留言", "form-message-ph": "告诉我们您的旅行计划、兴趣或任何问题...",
    "btn-send": "发送询问",
    "form-success": "询问已发送！", "form-success-msg": "谢谢！我们将在24小时内与您联系。",
    "footer-tagline": "我们亲身前往，让你知道该去哪里。",
  },

  ja: {
    "nav-home": "ホーム", "nav-guides": "ガイド", "nav-cities": "都市",
    "nav-tools": "旅行ツール", "nav-weather": "天気", "nav-safety": "安全", "nav-enquiry": "お問い合わせ",
    "hero-eyebrow": "アジア最高の旅行ガイド",
    "hero-headline": "私たちが行ったから、<br>あなたはどこへ行けばいいかわかる。",
    "hero-sub": "実際の価格、現実的な旅程、空港のヒント、安全情報、天気の洞察、地元のおすすめを網羅したキュレーション済み旅行ガイド。",
    "hero-cta1": "最新ガイドを読む", "hero-cta2": "お問い合わせ", "hero-scroll": "スクロールして探索",
    "guides-label": "最新ガイド",
    "guides-title": "厳選された目的地、<br>リアルな旅行者の情報",
    "guides-sub": "編集部がこのリストのすべての都市を実際に訪れています — 価格、旅程、ヒントはすべて実際の旅行に基づいています。",
    "featured-badge": "編集部のおすすめ",
    "meta-flight": "SG発フライト", "meta-budget": "1日の予算", "meta-season": "ベストシーズン",
    "btn-read-full": "全ガイドを読む",
    "cities-label": "目的地", "cities-title": "フライトの時間に見合う12都市",
    "btn-view-guide": "ガイドを見る", "card-flight": "フライト（SG）", "card-budget": "1日の予算", "card-best": "ベスト：",
    "tools-label": "旅行ツール", "tools-title": "もっと賢く計画し、より良い旅を",
    "budget-tool-title": "旅行予算計算機",
    "budget-tool-desc": "予約前にSGDでの総旅行コストを見積もりましょう。",
    "budget-dest-label": "目的地", "budget-dest-ph": "目的地を選択",
    "budget-travellers-label": "旅行者数", "budget-travellers-ph": "例：2",
    "budget-days-label": "日数", "budget-days-ph": "例：5",
    "budget-daily-label": "1人1日の予算（SGD）", "budget-daily-ph": "例：200",
    "btn-calculate": "計算する",
    "packing-tool-title": "荷造りチェックリスト",
    "packing-tool-desc": "荷造りしながらアイテムをチェックオフ。進捗はブラウザに保存されます。",
    "itin-tool-title": "旅程プランナー",
    "itin-tool-desc": "日程ごとの旅行プランを作成していつでも参照できます。",
    "itin-day-label": "日", "itin-day-ph": "1", "itin-time-label": "時刻",
    "itin-activity-label": "アクティビティ", "itin-activity-ph": "例：浅草寺を訪問",
    "itin-notes-label": "メモ", "itin-notes-ph": "任意のメモ",
    "btn-add-entry": "エントリーを追加", "btn-clear-all": "すべてクリア",
    "itin-th-day": "日", "itin-th-time": "時刻", "itin-th-activity": "アクティビティ", "itin-th-notes": "メモ",
    "itin-day-prefix": "Day",
    "weather-label": "天気", "weather-title": "フライト前に天気予報を確認",
    "weather-sub": "OpenWeatherが提供。無料のAPIキーを追加してリアルタイム天気検索を有効にしてください。",
    "weather-city-ph": "都市名を入力（例：東京）", "btn-check-weather": "天気を確認",
    "weather-humidity": "湿度", "weather-wind": "風速", "weather-feels": "体感温度",
    "safety-label": "旅行の安全", "safety-title": "賢く旅して安全に",
    "safety-sub": "編集部がこのリストのすべての目的地の重要な安全情報をまとめています。",
    "safety-ins-h": "旅行保険", "safety-health-h": "健康上の注意",
    "safety-scam-h": "詐欺への注意", "safety-emergency-h": "緊急連絡先",
    "safety-solo-h": "一人旅のヒント", "safety-levels-h": "目的地の安全レベル",
    "enquiry-label": "お問い合わせ", "enquiry-title": "私たちと一緒に完璧な旅行を計画しましょう",
    "enquiry-sub": "どこへ行きたいか教えてください。旅行編集部があなたの日程と予算に合わせたパーソナライズガイドをご用意します。",
    "enquiry-p1": "✓ 24時間以内に返信", "enquiry-p2": "✓ カスタム旅程の提案", "enquiry-p3": "✓ 義務なし、スパムなし",
    "form-name": "フルネーム", "form-email": "メール", "form-phone": "電話",
    "form-name-ph": "山田 花子", "form-email-ph": "yamada@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "興味のある目的地", "form-dest-ph": "目的地を選択",
    "form-date": "旅行日", "form-travellers": "旅行者数", "form-travellers-ph": "2",
    "form-message": "メッセージ", "form-message-ph": "旅行プラン、興味、またはご質問をお知らせください...",
    "btn-send": "お問い合わせ送信",
    "form-success": "お問い合わせが送信されました！", "form-success-msg": "ありがとうございます！24時間以内にご連絡します。",
    "footer-tagline": "私たちが行ったから、あなたはどこへ行けばいいかわかる。",
  },

  ko: {
    "nav-home": "홈", "nav-guides": "가이드", "nav-cities": "도시",
    "nav-tools": "여행 도구", "nav-weather": "날씨", "nav-safety": "안전", "nav-enquiry": "문의",
    "hero-eyebrow": "아시아 최고의 여행 가이드",
    "hero-headline": "우리가 가봤으니,<br>어디로 갈지 알 수 있어요.",
    "hero-sub": "실제 가격, 현실적인 일정, 공항 팁, 안전 정보, 날씨 인사이트 및 현지 추천을 포함한 큐레이션된 여행 가이드.",
    "hero-cta1": "최신 가이드 읽기", "hero-cta2": "문의하기", "hero-scroll": "스크롤하여 탐색",
    "guides-label": "최신 가이드",
    "guides-title": "엄선된 목적지,<br>진짜 여행자 인사이트",
    "guides-sub": "저희 편집자들이 이 목록의 모든 도시를 직접 방문했습니다 — 가격, 일정, 팁은 실제 여행을 기반으로 합니다.",
    "featured-badge": "편집자 추천",
    "meta-flight": "SG 출발 항공편", "meta-budget": "일일 예산", "meta-season": "최적 시즌",
    "btn-read-full": "전체 가이드 읽기",
    "cities-label": "목적지", "cities-title": "비행 시간이 아깝지 않은 12개 도시",
    "btn-view-guide": "가이드 보기", "card-flight": "항공편 (SG)", "card-budget": "일일 예산", "card-best": "최적:",
    "tools-label": "여행 도구", "tools-title": "더 스마트하게 계획하고, 더 잘 여행하세요",
    "budget-tool-title": "여행 예산 계산기",
    "budget-tool-desc": "예약 전 SGD로 총 여행 비용을 계산해보세요.",
    "budget-dest-label": "목적지", "budget-dest-ph": "목적지 선택",
    "budget-travellers-label": "여행자 수", "budget-travellers-ph": "예: 2",
    "budget-days-label": "여행 일수", "budget-days-ph": "예: 5",
    "budget-daily-label": "1인당 일일 예산 (SGD)", "budget-daily-ph": "예: 200",
    "btn-calculate": "계산하기",
    "packing-tool-title": "짐 싸기 체크리스트",
    "packing-tool-desc": "짐을 싸면서 항목을 체크하세요. 진행 상황이 브라우저에 저장됩니다.",
    "itin-tool-title": "여행 일정 계획",
    "itin-tool-desc": "일별 여행 계획을 세우고 언제든지 참고하세요.",
    "itin-day-label": "일", "itin-day-ph": "1", "itin-time-label": "시간",
    "itin-activity-label": "활동", "itin-activity-ph": "예: 센소지 사원 방문",
    "itin-notes-label": "메모", "itin-notes-ph": "선택적 메모",
    "btn-add-entry": "항목 추가", "btn-clear-all": "모두 지우기",
    "itin-th-day": "일", "itin-th-time": "시간", "itin-th-activity": "활동", "itin-th-notes": "메모",
    "itin-day-prefix": "Day",
    "weather-label": "날씨", "weather-title": "비행 전 날씨 예보 확인",
    "weather-sub": "OpenWeather 제공. 실시간 날씨 조회를 활성화하려면 무료 API 키를 추가하세요.",
    "weather-city-ph": "도시 이름 입력, 예: 도쿄", "btn-check-weather": "날씨 확인",
    "weather-humidity": "습도", "weather-wind": "바람", "weather-feels": "체감 온도",
    "safety-label": "여행 안전", "safety-title": "스마트하게 여행하고, 안전하게 지내세요",
    "safety-sub": "저희 편집자들이 이 목록의 모든 목적지에 대한 필수 안전 정보를 정리했습니다.",
    "safety-ins-h": "여행 보험", "safety-health-h": "건강 주의사항",
    "safety-scam-h": "사기 주의", "safety-emergency-h": "비상 연락처",
    "safety-solo-h": "혼자 여행 팁", "safety-levels-h": "목적지 안전 등급",
    "enquiry-label": "문의하기", "enquiry-title": "우리와 함께 완벽한 여행을 계획하세요",
    "enquiry-sub": "어디로 가고 싶은지 알려주세요. 저희 여행 편집자들이 날짜와 예산에 맞춘 맞춤형 가이드를 준비해 드립니다.",
    "enquiry-p1": "✓ 24시간 내 응답", "enquiry-p2": "✓ 맞춤 일정 제안", "enquiry-p3": "✓ 의무 없음, 스팸 없음",
    "form-name": "성명", "form-email": "이메일", "form-phone": "전화",
    "form-name-ph": "김지수", "form-email-ph": "kim@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "관심 목적지", "form-dest-ph": "목적지 선택",
    "form-date": "여행 날짜", "form-travellers": "여행자 수", "form-travellers-ph": "2",
    "form-message": "메시지", "form-message-ph": "여행 계획, 관심사 또는 질문을 알려주세요...",
    "btn-send": "문의 보내기",
    "form-success": "문의가 전송되었습니다!", "form-success-msg": "감사합니다! 24시간 내에 연락드리겠습니다.",
    "footer-tagline": "우리가 가봤으니, 어디로 갈지 알 수 있어요.",
  },

  th: {
    "nav-home": "หน้าแรก", "nav-guides": "คู่มือ", "nav-cities": "เมือง",
    "nav-tools": "เครื่องมือท่องเที่ยว", "nav-weather": "สภาพอากาศ", "nav-safety": "ความปลอดภัย", "nav-enquiry": "สอบถาม",
    "hero-eyebrow": "คู่มือท่องเที่ยวชั้นนำของเอเชีย",
    "hero-headline": "เราไปมาแล้ว เพื่อให้คุณ<br>รู้ว่าควรไปที่ไหน",
    "hero-sub": "คู่มือท่องเที่ยวที่คัดสรรพร้อมราคาจริง แผนการเดินทางที่ใช้งานได้จริง เคล็ดลับสนามบิน หมายเหตุความปลอดภัย ข้อมูลสภาพอากาศ และคำแนะนำจากคนท้องถิ่น",
    "hero-cta1": "อ่านคู่มือล่าสุด", "hero-cta2": "ส่งข้อสอบถาม", "hero-scroll": "เลื่อนเพื่อสำรวจ",
    "guides-label": "คู่มือล่าสุด",
    "guides-title": "จุดหมายที่คัดสรร<br>ข้อมูลจากนักเดินทางจริง",
    "guides-sub": "บรรณาธิการของเราได้ไปเยือนทุกเมืองในรายการนี้ด้วยตัวเอง — ราคา แผนการเดินทาง และเคล็ดลับต่างๆ ล้วนมาจากการเดินทางจริง",
    "featured-badge": "ตัวเลือกบรรณาธิการ",
    "meta-flight": "เที่ยวบินจาก SG", "meta-budget": "งบประมาณรายวัน", "meta-season": "ฤดูกาลที่ดีที่สุด",
    "btn-read-full": "อ่านคู่มือฉบับเต็ม",
    "cities-label": "จุดหมายปลายทาง", "cities-title": "12 เมืองที่คุ้มทุกชั่วโมงของการบิน",
    "btn-view-guide": "ดูคู่มือ", "card-flight": "เที่ยวบิน (SG)", "card-budget": "งบประมาณรายวัน", "card-best": "ดีที่สุด:",
    "tools-label": "เครื่องมือท่องเที่ยว", "tools-title": "วางแผนอย่างชาญฉลาด เดินทางได้ดีขึ้น",
    "budget-tool-title": "เครื่องคำนวณงบประมาณการเดินทาง",
    "budget-tool-desc": "ประมาณค่าใช้จ่ายทั้งหมดในการเดินทางของคุณเป็น SGD ก่อนการจอง",
    "budget-dest-label": "จุดหมายปลายทาง", "budget-dest-ph": "เลือกจุดหมายปลายทาง",
    "budget-travellers-label": "จำนวนนักเดินทาง", "budget-travellers-ph": "เช่น 2",
    "budget-days-label": "จำนวนวัน", "budget-days-ph": "เช่น 5",
    "budget-daily-label": "งบประมาณรายวันต่อคน (SGD)", "budget-daily-ph": "เช่น 200",
    "btn-calculate": "คำนวณ",
    "packing-tool-title": "รายการตรวจสอบการแพ็คกระเป๋า",
    "packing-tool-desc": "ทำเครื่องหมายรายการขณะแพ็คกระเป๋า ความคืบหน้าจะถูกบันทึกไว้ในเบราว์เซอร์",
    "itin-tool-title": "เครื่องมือวางแผนการเดินทาง",
    "itin-tool-desc": "สร้างแผนการเดินทางรายวันและอ้างอิงได้ทุกเมื่อ",
    "itin-day-label": "วัน", "itin-day-ph": "1", "itin-time-label": "เวลา",
    "itin-activity-label": "กิจกรรม", "itin-activity-ph": "เช่น เยี่ยมชมวัดเซ็นโซจิ",
    "itin-notes-label": "หมายเหตุ", "itin-notes-ph": "หมายเหตุเพิ่มเติม",
    "btn-add-entry": "เพิ่มรายการ", "btn-clear-all": "ลบทั้งหมด",
    "itin-th-day": "วัน", "itin-th-time": "เวลา", "itin-th-activity": "กิจกรรม", "itin-th-notes": "หมายเหตุ",
    "itin-day-prefix": "วันที่",
    "weather-label": "สภาพอากาศ", "weather-title": "ตรวจสอบพยากรณ์อากาศก่อนบิน",
    "weather-sub": "ขับเคลื่อนโดย OpenWeather เพิ่ม API Key ฟรีเพื่อเปิดใช้งานการค้นหาสภาพอากาศแบบสด",
    "weather-city-ph": "ป้อนชื่อเมือง เช่น โตเกียว", "btn-check-weather": "ตรวจสอบสภาพอากาศ",
    "weather-humidity": "ความชื้น", "weather-wind": "ลม", "weather-feels": "อุณหภูมิที่รู้สึก",
    "safety-label": "ความปลอดภัยในการเดินทาง", "safety-title": "ท่องเที่ยวอย่างชาญฉลาด ปลอดภัยตลอดการเดินทาง",
    "safety-sub": "บรรณาธิการของเราได้รวบรวมข้อมูลความปลอดภัยที่จำเป็นสำหรับทุกจุดหมายในรายการนี้",
    "safety-ins-h": "ประกันการเดินทาง", "safety-health-h": "ข้อควรระวังด้านสุขภาพ",
    "safety-scam-h": "การตระหนักรู้เรื่องการหลอกลวง", "safety-emergency-h": "หมายเลขฉุกเฉิน",
    "safety-solo-h": "เคล็ดลับการเดินทางคนเดียว", "safety-levels-h": "ระดับความปลอดภัยของจุดหมาย",
    "enquiry-label": "ติดต่อเรา", "enquiry-title": "วางแผนการเดินทางที่สมบูรณ์แบบกับเรา",
    "enquiry-sub": "บอกเราว่าคุณอยากไปที่ไหน บรรณาธิการด้านการท่องเที่ยวของเราจะจัดทำคู่มือเฉพาะบุคคลที่เหมาะกับวันที่และงบประมาณของคุณ",
    "enquiry-p1": "✓ ตอบกลับภายใน 24 ชั่วโมง", "enquiry-p2": "✓ ข้อเสนอแนะแผนการเดินทางที่กำหนดเอง", "enquiry-p3": "✓ ไม่มีข้อผูกมัด ไม่มีสแปม",
    "form-name": "ชื่อ-นามสกุล", "form-email": "อีเมล", "form-phone": "โทรศัพท์",
    "form-name-ph": "สมชาย ใจดี", "form-email-ph": "somchai@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "จุดหมายปลายทางที่สนใจ", "form-dest-ph": "เลือกจุดหมายปลายทาง",
    "form-date": "วันที่เดินทาง", "form-travellers": "จำนวนนักเดินทาง", "form-travellers-ph": "2",
    "form-message": "ข้อความ", "form-message-ph": "บอกเราเกี่ยวกับแผนการเดินทาง ความสนใจ หรือคำถามของคุณ...",
    "btn-send": "ส่งข้อสอบถาม",
    "form-success": "ส่งข้อสอบถามแล้ว!", "form-success-msg": "ขอบคุณ! เราจะติดต่อกลับภายใน 24 ชั่วโมง",
    "footer-tagline": "เราไปมาแล้ว เพื่อให้คุณรู้ว่าควรไปที่ไหน",
  },

  vi: {
    "nav-home": "Trang chủ", "nav-guides": "Hướng dẫn", "nav-cities": "Thành phố",
    "nav-tools": "Công cụ du lịch", "nav-weather": "Thời tiết", "nav-safety": "An toàn", "nav-enquiry": "Hỏi thăm",
    "hero-eyebrow": "Hướng dẫn du lịch hàng đầu Châu Á",
    "hero-headline": "Chúng tôi đã đến, để bạn<br>biết nên đi đâu.",
    "hero-sub": "Hướng dẫn du lịch được tuyển chọn với giá cả thực tế, lịch trình thực tế, mẹo sân bay, ghi chú an toàn, thông tin thời tiết và đề xuất địa phương.",
    "hero-cta1": "Đọc hướng dẫn mới nhất", "hero-cta2": "Gửi yêu cầu", "hero-scroll": "Cuộn để khám phá",
    "guides-label": "Hướng dẫn mới nhất",
    "guides-title": "Điểm đến chọn lọc,<br>góc nhìn thực của du khách",
    "guides-sub": "Các biên tập viên của chúng tôi đã đến thăm mọi thành phố trong danh sách này — giá cả, lịch trình và mẹo dựa trên các chuyến đi thực tế.",
    "featured-badge": "Lựa chọn của biên tập viên",
    "meta-flight": "Chuyến bay từ SG", "meta-budget": "Ngân sách hàng ngày", "meta-season": "Mùa tốt nhất",
    "btn-read-full": "Đọc hướng dẫn đầy đủ",
    "cities-label": "Điểm đến", "cities-title": "12 thành phố xứng đáng với mỗi giờ bay",
    "btn-view-guide": "Xem hướng dẫn", "card-flight": "Chuyến bay (SG)", "card-budget": "Ngân sách hàng ngày", "card-best": "Tốt nhất:",
    "tools-label": "Công cụ du lịch", "tools-title": "Lập kế hoạch thông minh hơn, du lịch tốt hơn",
    "budget-tool-title": "Máy tính ngân sách chuyến đi",
    "budget-tool-desc": "Ước tính tổng chi phí chuyến đi bằng SGD trước khi đặt.",
    "budget-dest-label": "Điểm đến", "budget-dest-ph": "Chọn điểm đến",
    "budget-travellers-label": "Số lượng người đi", "budget-travellers-ph": "vd. 2",
    "budget-days-label": "Số ngày", "budget-days-ph": "vd. 5",
    "budget-daily-label": "Ngân sách hàng ngày mỗi người (SGD)", "budget-daily-ph": "vd. 200",
    "btn-calculate": "Tính toán",
    "packing-tool-title": "Danh sách kiểm tra đồ đạc",
    "packing-tool-desc": "Đánh dấu các mục khi đóng gói. Tiến trình của bạn được lưu trên trình duyệt.",
    "itin-tool-title": "Công cụ lập kế hoạch hành trình",
    "itin-tool-desc": "Lập kế hoạch chuyến đi từng ngày và tham khảo bất cứ lúc nào.",
    "itin-day-label": "Ngày", "itin-day-ph": "1", "itin-time-label": "Thời gian",
    "itin-activity-label": "Hoạt động", "itin-activity-ph": "vd. Thăm chùa Senso-ji",
    "itin-notes-label": "Ghi chú", "itin-notes-ph": "Ghi chú tùy chọn",
    "btn-add-entry": "Thêm mục", "btn-clear-all": "Xóa tất cả",
    "itin-th-day": "Ngày", "itin-th-time": "Thời gian", "itin-th-activity": "Hoạt động", "itin-th-notes": "Ghi chú",
    "itin-day-prefix": "Ngày",
    "weather-label": "Thời tiết", "weather-title": "Kiểm tra dự báo thời tiết trước khi bay",
    "weather-sub": "Được cung cấp bởi OpenWeather. Thêm khóa API miễn phí để kích hoạt tra cứu thời tiết trực tiếp.",
    "weather-city-ph": "Nhập tên thành phố, vd. Tokyo", "btn-check-weather": "Kiểm tra thời tiết",
    "weather-humidity": "Độ ẩm", "weather-wind": "Gió", "weather-feels": "Cảm giác như",
    "safety-label": "An toàn du lịch", "safety-title": "Du lịch thông minh, an toàn suốt chuyến đi",
    "safety-sub": "Các biên tập viên của chúng tôi đã tổng hợp thông tin an toàn thiết yếu cho mọi điểm đến trong danh sách này.",
    "safety-ins-h": "Bảo hiểm du lịch", "safety-health-h": "Biện pháp phòng ngừa sức khỏe",
    "safety-scam-h": "Nhận thức về lừa đảo", "safety-emergency-h": "Số khẩn cấp",
    "safety-solo-h": "Mẹo du lịch một mình", "safety-levels-h": "Mức độ an toàn điểm đến",
    "enquiry-label": "Liên hệ với chúng tôi", "enquiry-title": "Lập kế hoạch chuyến đi hoàn hảo cùng chúng tôi",
    "enquiry-sub": "Hãy cho chúng tôi biết bạn muốn đến đâu. Các biên tập viên du lịch của chúng tôi sẽ chuẩn bị hướng dẫn cá nhân hóa phù hợp với ngày tháng và ngân sách của bạn.",
    "enquiry-p1": "✓ Phản hồi trong 24 giờ", "enquiry-p2": "✓ Đề xuất lịch trình tùy chỉnh", "enquiry-p3": "✓ Không có nghĩa vụ, không có thư rác",
    "form-name": "Họ và tên", "form-email": "Email", "form-phone": "Điện thoại",
    "form-name-ph": "Nguyễn Thị Lan", "form-email-ph": "nguyen@email.com", "form-phone-ph": "+65 9123 4567",
    "form-dest": "Điểm đến quan tâm", "form-dest-ph": "Chọn điểm đến",
    "form-date": "Ngày du lịch", "form-travellers": "Số lượng người đi", "form-travellers-ph": "2",
    "form-message": "Tin nhắn", "form-message-ph": "Cho chúng tôi biết về kế hoạch chuyến đi, sở thích hoặc bất kỳ câu hỏi nào...",
    "btn-send": "Gửi yêu cầu",
    "form-success": "Yêu cầu đã gửi!", "form-success-msg": "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong 24 giờ.",
    "footer-tagline": "Chúng tôi đã đến, để bạn biết nên đi đâu.",
  },
};

let currentLang = localStorage.getItem("te_lang") || "en";

function t(key) {
  const langBlock = uiTranslations[currentLang] || uiTranslations.en;
  return langBlock[key] || uiTranslations.en[key] || key;
}

function applyTranslations(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = t(key);
    if (val) el.placeholder = val;
  });
  document.querySelectorAll("[data-i18n-opt]").forEach(el => {
    const key = el.dataset.i18nOpt;
    const val = t(key);
    if (val) el.textContent = val;
  });
  renderCities();
  renderItin();
  document.documentElement.lang = lang;
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.find(l => l.code === lang)) return;
  localStorage.setItem("te_lang", lang);
  applyTranslations(lang);
  const langMeta = SUPPORTED_LANGS.find(l => l.code === lang);
  document.getElementById("langBtnFlag").textContent = langMeta.flag;
  document.getElementById("langBtnCode").textContent = langMeta.label;
  document.querySelectorAll("#langDropdown li").forEach(li => {
    li.classList.toggle("active", li.dataset.lang === lang);
  });
  document.getElementById("langSelector").classList.remove("open");
}

function initLangSelector() {
  const selector = document.getElementById("langSelector");
  const btn = document.getElementById("langBtn");
  const dropdown = document.getElementById("langDropdown");

  btn.addEventListener("click", e => {
    e.stopPropagation();
    selector.classList.toggle("open");
  });

  dropdown.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => setLanguage(li.dataset.lang));
  });

  document.addEventListener("click", e => {
    if (!selector.contains(e.target)) selector.classList.remove("open");
  });

  setLanguage(currentLang);
}

/* ============================================================
   NAVBAR — scroll effect & hamburger
   ============================================================ */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ============================================================
   CITY CARDS — render
   ============================================================ */
function renderCities() {
  const grid = document.getElementById("citiesGrid");
  grid.innerHTML = destinations.map((d, i) => `
    <div class="city-card reveal" style="transition-delay:${(i % 3) * 0.1}s">
      <div class="city-card-img">
        <img src="${d.image}" alt="${d.name}" loading="lazy" />
        <div class="city-season-badge">${t("card-best")} ${d.bestSeason}</div>
      </div>
      <div class="city-card-body">
        <div class="city-name-row">
          <span class="city-name">${d.name}</span>
          <span class="city-flag">${d.flag}</span>
        </div>
        <p class="city-country">${d.country}</p>
        <p class="city-desc">${d.description}</p>
        <div class="city-meta">
          <div class="city-meta-item">
            <span class="city-meta-label">${t("card-flight")}</span>
            <span class="city-meta-val">${d.flightTime}</span>
          </div>
          <div class="city-meta-item">
            <span class="city-meta-label">${t("card-budget")}</span>
            <span class="city-meta-val">${d.dailyBudget}</span>
          </div>
        </div>
      </div>
      <div class="city-card-footer">
        <button class="btn btn-primary" onclick="openModal('${d.id}')">${t("btn-view-guide")}</button>
      </div>
    </div>
  `).join("");
}

/* ============================================================
   GUIDE MODAL
   ============================================================ */
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

function openModal(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;

  document.getElementById("modalHeroImg").src = d.image;
  document.getElementById("modalHeroImg").alt = d.name;
  document.getElementById("modalFlag").textContent = `${d.flag} ${d.country}`;
  document.getElementById("modalTitle").textContent = d.name;

  const itineraryHtml = d.itinerary.map(day => `
    <div class="itinerary-day">
      <div class="itinerary-day-label">Day ${day.day}</div>
      <ul>${day.activities.map(a => `<li>${a}</li>`).join("")}</ul>
    </div>
  `).join("");

  document.getElementById("modalBody").innerHTML = `
    <div class="modal-section">
      <h3>Overview</h3>
      <p>${d.overview}</p>
    </div>
    <div class="modal-section">
      <h3>3-Day Itinerary</h3>
      ${itineraryHtml}
    </div>
    <div class="modal-section">
      <h3>Food Recommendations</h3>
      <ul>${d.food.map(f => `<li>${f}</li>`).join("")}</ul>
    </div>
    <div class="modal-section">
      <h3>Getting Around</h3>
      <p>${d.transport}</p>
    </div>
    <div class="modal-section">
      <h3>Estimated Cost Breakdown</h3>
      <div class="cost-grid">
        <div class="cost-item">
          <div class="cost-item-label">Accommodation</div>
          <div class="cost-item-val">${d.costs.accommodation}</div>
        </div>
        <div class="cost-item">
          <div class="cost-item-label">Food & Drinks</div>
          <div class="cost-item-val">${d.costs.food}</div>
        </div>
        <div class="cost-item">
          <div class="cost-item-label">Transport</div>
          <div class="cost-item-val">${d.costs.transport}</div>
        </div>
      </div>
    </div>
    <div class="modal-section">
      <h3>Safety Tips</h3>
      <ul>${d.safetyTips.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>
    <div class="modal-section">
      <h3>Best Photo Spots</h3>
      <ul>${d.photoSpots.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>
  `;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* ============================================================
   BUDGET CALCULATOR
   ============================================================ */
const budgetBaseRates = {
  tokyo: { accommodation: 140, food: 60, transport: 20 },
  seoul: { accommodation: 110, food: 45, transport: 15 },
  bali: { accommodation: 120, food: 30, transport: 15 },
  singapore: { accommodation: 200, food: 35, transport: 12 },
  bangkok: { accommodation: 90, food: 30, transport: 12 },
  hongkong: { accommodation: 200, food: 60, transport: 15 },
  kualalumpur: { accommodation: 90, food: 25, transport: 10 },
  maldives: { accommodation: 700, food: 150, transport: 60 },
  phuket: { accommodation: 130, food: 35, transport: 15 },
  sydney: { accommodation: 280, food: 80, transport: 30 },
  taipei: { accommodation: 110, food: 30, transport: 10 },
  hanoi: { accommodation: 70, food: 20, transport: 10 }
};

function calcBudget() {
  const dest = document.getElementById("bc-dest").value;
  const travellers = parseInt(document.getElementById("bc-travellers").value);
  const days = parseInt(document.getElementById("bc-days").value);
  const customBudget = parseFloat(document.getElementById("bc-budget").value);
  const resultEl = document.getElementById("bc-result");
  const totalEl = document.getElementById("bc-total");
  const breakdownEl = document.getElementById("bc-breakdown");

  if (!dest || !travellers || !days) {
    alert("Please fill in all required fields.");
    return;
  }

  const rates = budgetBaseRates[dest];
  const dailyPerPerson = customBudget || (rates.accommodation / travellers + rates.food + rates.transport);
  const total = dailyPerPerson * travellers * days;

  const accommodation = (customBudget ? customBudget * 0.45 : rates.accommodation / travellers) * days * travellers;
  const food = (customBudget ? customBudget * 0.35 : rates.food) * days * travellers;
  const transport = (customBudget ? customBudget * 0.20 : rates.transport) * days * travellers;

  totalEl.textContent = `Total: SGD ${Math.round(total).toLocaleString()}`;
  breakdownEl.innerHTML = `
    ${travellers} traveller${travellers > 1 ? "s" : ""} × ${days} day${days > 1 ? "s" : ""}<br>
    Accommodation: SGD ${Math.round(accommodation).toLocaleString()}<br>
    Food & Drinks: SGD ${Math.round(food).toLocaleString()}<br>
    Transport: SGD ${Math.round(transport).toLocaleString()}
  `;

  resultEl.hidden = false;
}

/* ============================================================
   PACKING CHECKLIST — render & interact
   ============================================================ */
function renderChecklist() {
  const container = document.getElementById("checklistCategories");
  const saved = JSON.parse(localStorage.getItem("packingChecked") || "{}");

  container.innerHTML = packingData.map(cat => `
    <div class="checklist-category">
      <div class="checklist-category-title">${cat.category}</div>
      ${cat.items.map(item => {
        const key = cat.category + "|" + item;
        const checked = saved[key] || false;
        return `
          <label class="checklist-item${checked ? " checked" : ""}">
            <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleCheck('${cat.category}','${item.replace(/'/g,"\\'")}',this)" />
            ${item}
          </label>
        `;
      }).join("")}
    </div>
  `).join("");

  updateChecklistProgress();
}

function toggleCheck(category, item, checkbox) {
  const saved = JSON.parse(localStorage.getItem("packingChecked") || "{}");
  const key = category + "|" + item;
  saved[key] = checkbox.checked;
  localStorage.setItem("packingChecked", JSON.stringify(saved));
  const label = checkbox.parentElement;
  label.classList.toggle("checked", checkbox.checked);
  updateChecklistProgress();
}

function updateChecklistProgress() {
  const all = document.querySelectorAll(".checklist-item input");
  const checked = document.querySelectorAll(".checklist-item input:checked");
  const pct = all.length ? Math.round((checked.length / all.length) * 100) : 0;
  document.getElementById("checklistFill").style.width = pct + "%";
  document.getElementById("checklistPct").textContent = pct + "% packed";
}

/* ============================================================
   ITINERARY PLANNER
   ============================================================ */
let itinEntries = JSON.parse(localStorage.getItem("itinerary") || "[]");

function renderItin() {
  const tbody = document.getElementById("itinBody");
  const wrap = document.getElementById("itinTableWrap");
  if (!itinEntries.length) {
    wrap.hidden = true;
    return;
  }
  wrap.hidden = false;
  const sorted = [...itinEntries].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  tbody.innerHTML = sorted.map((e, i) => `
    <tr>
      <td><strong>${t("itin-day-prefix")} ${e.day}</strong></td>
      <td>${e.time || "—"}</td>
      <td>${escapeHtml(e.activity)}</td>
      <td style="color:#6b6b6b">${escapeHtml(e.notes)}</td>
      <td><button class="itin-delete" onclick="deleteItin(${i})" title="Remove">✕</button></td>
    </tr>
  `).join("");
}

function addItinEntry() {
  const day = parseInt(document.getElementById("itin-day").value);
  const time = document.getElementById("itin-time").value;
  const activity = document.getElementById("itin-activity").value.trim();
  const notes = document.getElementById("itin-notes").value.trim();

  if (!day || !activity) {
    alert("Please enter at least the day number and activity.");
    return;
  }

  itinEntries.push({ day, time, activity, notes });
  localStorage.setItem("itinerary", JSON.stringify(itinEntries));

  document.getElementById("itin-day").value = "";
  document.getElementById("itin-time").value = "";
  document.getElementById("itin-activity").value = "";
  document.getElementById("itin-notes").value = "";

  renderItin();
}

function deleteItin(index) {
  const sorted = [...itinEntries].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  const entry = sorted[index];
  itinEntries = itinEntries.filter(e => e !== entry);
  localStorage.setItem("itinerary", JSON.stringify(itinEntries));
  renderItin();
}

function clearItin() {
  if (!itinEntries.length) return;
  if (confirm("Clear all itinerary entries?")) {
    itinEntries = [];
    localStorage.removeItem("itinerary");
    renderItin();
  }
}

/* ============================================================
   WEATHER WIDGET
   ============================================================ */
async function checkWeather() {
  const city = document.getElementById("weather-city").value.trim();
  const resultEl = document.getElementById("weather-result");
  const errorEl = document.getElementById("weather-error");

  resultEl.hidden = true;
  errorEl.hidden = true;

  if (!city) {
    errorEl.textContent = "Please enter a city name.";
    errorEl.hidden = false;
    return;
  }

  if (OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
    errorEl.textContent = "Weather API not yet activated. Add your free OpenWeather API key in script.js to enable live weather lookups.";
    errorEl.hidden = false;
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error(`City "${city}" not found. Try a different spelling.`);
      throw new Error("Unable to fetch weather data. Please try again.");
    }
    const data = await res.json();

    document.getElementById("w-city").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("w-temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("w-desc").textContent = data.weather[0].description;
    document.getElementById("w-humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("w-wind").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById("w-feels").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("w-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("w-icon").alt = data.weather[0].description;

    resultEl.hidden = false;
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.hidden = false;
  }
}

document.getElementById("weather-city").addEventListener("keydown", e => {
  if (e.key === "Enter") checkWeather();
});

/* ============================================================
   ENQUIRY FORM
   ============================================================ */
const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  const data = {
    name: document.getElementById("f-name").value.trim(),
    email: document.getElementById("f-email").value.trim(),
    phone: document.getElementById("f-phone").value.trim(),
    destination: document.getElementById("f-dest").value,
    travelDate: document.getElementById("f-date").value,
    travellers: document.getElementById("f-travellers").value,
    message: document.getElementById("f-message").value.trim(),
    submittedAt: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem("enquiries") || "[]");
  existing.push(data);
  localStorage.setItem("enquiries", JSON.stringify(existing));

  enquiryForm.reset();
  document.getElementById("form-success").hidden = false;
  enquiryForm.querySelectorAll(".field-error").forEach(el => (el.textContent = ""));
  setTimeout(() => {
    document.getElementById("form-success").hidden = true;
  }, 8000);
});

function validateForm() {
  let valid = true;

  const name = document.getElementById("f-name").value.trim();
  const email = document.getElementById("f-email").value.trim();
  const dest = document.getElementById("f-dest").value;
  const date = document.getElementById("f-date").value;
  const travellers = document.getElementById("f-travellers").value;

  setErr("err-name", name ? "" : "Full name is required.");
  if (!name) valid = false;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setErr("err-email", email ? (emailOk ? "" : "Please enter a valid email.") : "Email is required.");
  if (!email || !emailOk) valid = false;

  setErr("err-dest", dest ? "" : "Please select a destination.");
  if (!dest) valid = false;

  setErr("err-date", date ? "" : "Please select a travel date.");
  if (!date) valid = false;

  setErr("err-travellers", travellers && parseInt(travellers) > 0 ? "" : "Please enter number of travellers.");
  if (!travellers || parseInt(travellers) < 1) valid = false;

  return valid;
}

function setErr(id, msg) {
  document.getElementById(id).textContent = msg;
}

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ============================================================
   UTILITY
   ============================================================ */
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initLangSelector();
  renderChecklist();
  renderItin();
  initReveal();
});
