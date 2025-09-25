# Assumptions
* Patients will primarily search by **type of health problem**.
* `yearsOfExperience` is a strong trust signal; results can be **sorted by experience** rather than user-controlled.
* Advocate services are assumed to be **remote (U.S.-based)**, so location isn’t critical.
* Degrees may not be a key factor; advocates are already screened by Solace.
* Browsing unfiltered results isn’t very useful; better to start with a **search input**.

---

# Frontend

### Optimizations
* Use **React Query or SWR** to cache repeat searches.
* Add **predictive autocomplete** from common specialties.
* Trigger search **on button click** or predicted specialty selection.

### UX Details
* Handle **loading** and **error states** gracefully.
* Format phone numbers consistently.
* Truncate long specialties list with an expand button.
* (Optional) Refactor to **shared input/form components** for consistency.

---

# Backend
* Cache responses for identical search inputs (LRU in demo, Redis in production).
* Explore **Postgres text vectorization**:
  * Flatten specialties into text fields.
  * Tokenized indexing for fast reverse lookups.
* Alternative: normalize model with a **specialty-advocate join table** and indexed lookups.

---

# Product Thoughts
* **Trust** is the most important factor for patients; they can be in an extremely vulnerable, and need expertise, experience, and compassion.
  * Trust communicated via `yearsOfExperience` and listed **specialties**.
* **Specialty overload**: future iterations should emphasize **primary specialties** to ease user's decision making.

---

# Challenges
* Had not worked with **Drizzle** before; combining it with **Postgres text vectorization** created friction points.
* Walked back to a **simpler, less performant search** for iteration one.
* This ensured I delivered a functional demo that highlights **product thinking and engineering judgment**, while noting a clear path for technical improvement later.
