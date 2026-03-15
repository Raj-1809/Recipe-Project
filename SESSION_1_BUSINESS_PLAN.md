# FitMeal Planner — Session 1 Business Plan & Technical Document
**Date:** 15 March 2026
**Session:** 1 of ongoing development
**Branch:** `claude/fitness-meal-planner-app-fAQ6W`

---

## 1. Product Vision

**FitMeal Planner** is a web-based fitness meal planning tool designed for working fitness enthusiasts who want instant, macro-aware meal suggestions without the friction of a full app installation or subscription.

**Core Promise:** *"Know what to cook, know what you're eating — in under a minute."*

---

## 2. Target Users

| Profile | Detail |
|---|---|
| **Primary** | Working adults (25–45) who train regularly (gym, running, sports) |
| **Goal** | Hit daily macro targets (protein, calories) without spending time researching |
| **Pain Point** | Don't know what to cook with what they have; don't want to count manually |
| **Tech level** | Comfortable with smartphones and basic web apps |
| **Usage context** | Quick check before grocery shopping or meal prep |

---

## 3. Features Built — Session 1

### Feature 1: Recipe Browser
The user can browse all available recipes and get detailed nutritional breakdowns.

**User flow:**
1. Land on Recipe Browser (default view)
2. Optionally open Filters panel → set constraints
3. Optionally sort cards (Protein / Calories / Time / Carbs / Fat / A–Z)
4. Browse recipe cards — each shows:
   - Dish name, cuisine badge, difficulty (Easy/Medium/Hard), cook time
   - Diet tag (Veg / Vegan / Non-Veg)
   - **Per-serving macros**: Protein (g), Carbs (g), Fat (g), Calories (kcal)
   - **Macro bar**: visual split of protein/carbs/fat calorie contribution
   - Allergen tags (Gluten, Dairy, Eggs, Fish, Soy, Red Meat, Poultry)
5. Click any card → modal opens with:
   - **Serving adjuster** (+/− buttons, range 1–20 servings)
   - All macros update live per serving as servings change
   - Ingredient list with gram quantities scaled to current servings
   - Step-by-step cooking instructions

### Feature 2: What's In My Kitchen? (Ingredient Finder)
The user selects available ingredients and gets personalised recipe recommendations.

**User flow:**
1. Switch to "What's In My Kitchen?" mode
2. Open ingredient accordion (categories: Vegetables / Dairy & Eggs / Grains / Proteins / Pulses)
   - Each category has a "Select All" toggle
   - Running count of selected ingredients shown
   - Staples (garlic, ginger, onion, oil, butter, ghee, spices) are auto-assumed — not shown
3. Click **"Find My Recipes"**
4. Results appear in two sections:
   - ✅ **Can Make Now** — full matches (have all required ingredients)
   - 🟡 **Almost There — 1–2 Ingredients Away** — near matches with exact missing ingredients called out
5. Filters apply to both sections
6. Click any recipe card to open the same modal as Feature 1

### Filters (apply to both features)
| Filter | Type | Options |
|---|---|---|
| Max Calories | Slider | 100 – 3,000 kcal (per serving) |
| Min Protein | Slider | 0 – 150g (per serving) |
| Max Cook Time | Slider | 5 – 120 minutes |
| Diet Type | Toggle group | All / Vegetarian / Vegan / Non-Veg |
| Cuisine | Toggle group | All / North Indian / South Indian / European / British / Healthy Fast Food |
| Exclude Allergens | Chip toggles | Gluten / Dairy / Eggs / Fish / Soy / Red Meat / Poultry |

---

## 4. Recipe Database — Session 1

**39 recipes** across 5 cuisines:

| Cuisine | Count | Examples |
|---|---|---|
| North Indian | 10 | Butter Chicken, Palak Paneer, Dal Makhani, Chicken Biryani |
| South Indian | 5 | Masala Dosa, Idli with Sambar, Chicken 65, Rasam |
| European | 9 | Spaghetti Bolognese, Paella, Pasta Alfredo, Ratatouille |
| British | 8 | Shepherd's Pie, Fish & Chips, Full English, Macaroni Cheese |
| Healthy Fast Food | 7 | Grilled Chicken Salad, Quinoa Salad, Burrito Bowl, Salmon & Veggies |

**Macro data per recipe:** Total protein (g), carbs (g), fat (g), calories (kcal), base servings
**Per-serving macros** computed as: `total / baseServings`

---

## 5. Technical Architecture

### Tech Stack
| Layer | Technology | Reason |
|---|---|---|
| Front-end | HTML5 + CSS3 + Vanilla JavaScript | Zero install, runs anywhere, no server needed |
| UI Framework | Bootstrap 5.3.0 (CDN) | Responsive grid, modals, accordions |
| Icons | Bootstrap Icons 1.11.0 (CDN) | Clean, lightweight icon set |
| Data | Embedded JSON in script tag | No backend required at this stage |
| Hosting | Any static host (GitHub Pages, Netlify, etc.) | Free, instant deployment |

### File Structure (Session 1)
```
Recipe-Project/
├── index.html          ← Complete single-file app (1,192 lines)
└── app (2).html        ← Original prototype (kept for reference)
```

### Key Code Architecture

#### Allergen Detection (automatic, from ingredient names)
```
gluten  → flour, wheat flour, pasta, bread, oats
dairy   → milk, butter, cheese, yogurt, ghee, paneer
eggs    → egg
fish    → cod, salmon
soy     → tofu
meat    → beef, lamb, pork
poultry → chicken breast, chicken thigh
```

#### Diet Type Classification
```
Non-Veg  → contains meat OR poultry OR fish
Vegetarian → no meat/fish, but has dairy or eggs
Vegan    → none of the above allergen groups
```

#### Serving Adjuster Logic
```
Per-serving macro = total_recipe_macro / currentServings
Ingredient qty shown = recipe_qty_g × (currentServings / baseServings)
```

#### Ingredient Matching Logic
```
requiredIngredients = all recipe ingredients NOT in STAPLES set
missing = requiredIngredients - selectedIngredients
canMake   → missing.length === 0
almostThere → missing.length === 1 OR 2
```

#### Staples (always assumed available)
```
garlic, ginger, salt, olive oil, butter, ghee, onion, spices
```

---

## 6. App Flows — Diagrams

### Recipe Browser Flow
```
[Open App]
    ↓
[Recipe Browser — Default View]
    ↓
[Filters Panel] → [Set: Max Cal / Min Protein / Max Time / Diet / Cuisine / Allergens]
    ↓
[Sort: Protein | Calories | Time | Carbs | Fat | A–Z]
    ↓
[Recipe Cards Grid] — shows per-serving macros + macro bar
    ↓
[Click Card]
    ↓
[Modal Opens]
    ├── [Serving Adjuster +/-] → macros & ingredients update live
    ├── [Ingredient List — scaled to servings]
    └── [Instructions]
```

### Ingredient Finder Flow
```
[Switch to "What's In My Kitchen?" Mode]
    ↓
[Ingredient Accordion — 5 categories]
    ├── [Vegetables — 25 items]
    ├── [Dairy & Eggs — 5 items]
    ├── [Grains — 8 items]
    ├── [Proteins — 7 items]
    └── [Pulses — 5 items]
    ↓
[Click "Find My Recipes"]
    ↓
[Results — Two Sections]
    ├── ✅ CAN MAKE NOW
    │     → Full matches → recipe cards → click → modal
    └── 🟡 ALMOST THERE (1–2 ingredients away)
          → Near matches → recipe cards + missing ingredient badges → click → modal
```

---

## 7. What Was Decided — Design Choices

| Decision | Choice Made | Reason |
|---|---|---|
| Tech platform | Single HTML file, no framework | Zero friction — open in browser, share via file or link |
| Theme | Dark fitness aesthetic | Matches target audience (gym apps, fitness tracking tools) |
| Macro display | Per serving (not total) | More useful for tracking individual meals |
| Staples logic | Auto-assumed available | Reduces checkbox fatigue for always-available pantry items |
| "Almost There" threshold | 1–2 missing ingredients | 3+ is too many; 1–2 is actionable for a quick shop |
| Filter scope | Applies to both modes | Consistent UX — set once, applies everywhere |

---

## 8. Roadmap — Sessions Ahead

### Session 2 (Recommended Next Steps)
- [ ] **Meal Plan Builder** — drag recipes into a daily/weekly grid, see total daily macros
- [ ] **Favourites** — save/star recipes (localStorage, no login needed)
- [ ] **Recipe Search** — type-ahead search bar by name or ingredient
- [ ] **More recipes** — expand to 75–100 recipes (add more cuisines: Mediterranean, Japanese, Mexican)

### Session 3
- [ ] **Custom Recipe Entry** — user adds their own recipe with ingredient weights
- [ ] **Grocery List Generator** — from selected recipes, generate a shopping list grouped by category
- [ ] **Calorie Goal Setting** — user sets daily calorie/protein target, app highlights suitable recipes

### Session 4+
- [ ] **User accounts** — save preferences, meal plans, favourites across devices
- [ ] **Mobile app** — Progressive Web App (PWA) — installable on phone home screen
- [ ] **API integration** — real nutritional data from USDA or Open Food Facts
- [ ] **AI-powered recommendations** — "Based on your goal and what you've eaten this week..."

---

## 9. Business Considerations

### Monetisation Options (future)
| Model | Description |
|---|---|
| Freemium | Free: 39 recipes, basic filters. Premium: full library, meal planner, custom recipes |
| One-time purchase | Buy the full app for a flat fee (no subscription fatigue) |
| Brand partnerships | Nutritional supplement brands, grocery delivery integrations |
| White-label | License the app to gyms, personal trainers, fitness coaches |

### Distribution
- **Phase 1:** GitHub Pages (free, instant) — share URL
- **Phase 2:** Custom domain (e.g. fitmealmx.com) — £10/year
- **Phase 3:** App stores (PWA wrapper) — once user base is validated

### Competitive Differentiation
| Feature | FitMeal | MyFitnessPal | Cronometer |
|---|---|---|---|
| Ingredient-based suggestions | ✅ | ❌ | ❌ |
| "Almost there" near-matches | ✅ | ❌ | ❌ |
| Live serving adjuster | ✅ | Partial | Partial |
| No login required | ✅ | ❌ | ❌ |
| Indian cuisine focus | ✅ | Limited | Limited |
| Free | ✅ | Freemium | Freemium |

---

## 10. Session 1 Summary

**What was built:** A complete, working fitness meal planner web app in a single HTML file.

**Time invested:** Session 1

**Files created:**
- `index.html` — 1,192 lines — full app

**Committed to:** `claude/fitness-meal-planner-app-fAQ6W`

**Next session should focus on:** Favourites functionality + Search bar + expanding recipe database

---

*Document auto-generated at end of Session 1 — 15 March 2026*
