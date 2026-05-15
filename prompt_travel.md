#Create a modern travel guide web app

Use **only HTML, CSS, and JavaScript**. Do not use React, Vue, backend frameworks, or databases.

## Objective

Build a stylish travel discovery website for curated city guides, travel tools, weather lookup, currency conversion, safety notes, and travel enquiries.

## Design Style

Replicate the overall feel of TravelInc:

- Editorial travel magazine style
- Large bold hero headline
- Clean white background
- Minimal navigation
- Cinematic destination imagery
- Card-based city guide layout
- Modern typography
- Premium travel brand feel
- Mobile-friendly responsive design
- Smooth hover effects and transitions

Use the brand name:

**Travel Explorer**

Tagline:

**We went, so you know where to go.**

## Images

Use images from **Unsplash** only.

Use realistic travel images for:

- Seoul
- Singapore
- Bali
- Tokyo
- Bangkok
- Hong Kong
- Kuala Lumpur
- Maldives
- Phuket & Krabi
- Sydney
- Taipei
- Hanoi

Use Unsplash image URLs directly or through `source.unsplash.com`.

## Pages / Sections

Create the app as a single-page website with navigation anchors:

1. Home
2. Guides
3. Cities
4. Travel Tools
5. Weather
6. Safety
7. Enquiry

## Home Section

Include:

- Top navigation bar
- Hero headline:  
  **We went, so you know where to go.**
- Short description:
  “Curated travel guides with real prices, realistic itineraries, airport tips, safety notes, weather insights, and local recommendations.”
- Featured city guide card
- Large cinematic hero image
- Call-to-action buttons:
  - Read Latest Guide
  - Send Enquiry

## Enquiry Form on Home Page

Add a visible enquiry form on the home page with:

- Full Name
- Email
- Phone
- Destination of Interest
- Travel Date
- Number of Travellers
- Message
- Submit button

On submit:

- Validate required fields
- Show a success message
- Store enquiry temporarily in browser `localStorage`
- Do not use backend

## City Guide Cards

Create 12 destination cards:

- Destination name
- Country
- Short description
- Estimated flight time from Singapore
- Estimated daily budget in SGD
- Best travel season
- “View Guide” button

## Guide Modal / Detail View

When user clicks “View Guide”, open a modal showing:

- Destination overview
- Suggested 3-day itinerary
- Food recommendations
- Transport tips
- Estimated cost breakdown
- Safety tips
- Best photo spots

## Travel Tools Section

Include interactive tools using JavaScript:

### 1. Trip Budget Calculator

Inputs:

- Destination
- Number of travellers
- Number of days
- Daily budget per person

Output:

- Estimated total cost in SGD

### 2. Packing Checklist

Create checklist categories:

- Documents
- Clothing
- Electronics
- Medication
- Travel essentials

Allow users to tick items.

### 3. Itinerary Planner

Allow users to add:

- Day
- Activity
- Time
- Notes

Display the itinerary below the form.

## Weather API Recommendation

Add a weather widget section.

Recommend using:

**OpenWeather API**  
Website: `https://openweathermap.org/api`

Implement the frontend structure with:

- City input
- “Check Weather” button
- Weather result card

Use placeholder JavaScript function with comments showing where to insert the OpenWeather API key.

Example:

```javascript
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";