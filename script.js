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
        <div class="city-season-badge">Best: ${d.bestSeason}</div>
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
            <span class="city-meta-label">Flight (SG)</span>
            <span class="city-meta-val">${d.flightTime}</span>
          </div>
          <div class="city-meta-item">
            <span class="city-meta-label">Daily Budget</span>
            <span class="city-meta-val">${d.dailyBudget}</span>
          </div>
        </div>
      </div>
      <div class="city-card-footer">
        <button class="btn btn-primary" onclick="openModal('${d.id}')">View Guide</button>
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
      <td><strong>Day ${e.day}</strong></td>
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
  renderCities();
  renderChecklist();
  renderItin();
  initReveal();
});
