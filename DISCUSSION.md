# Assumptions
* Patients will primarily search by **type of health problem**.
* `yearsOfExperience` is a strong trust signal; results can be **sorted by experience** rather than user-controlled.
* Advocate services are assumed to be **remote (U.S.-based)**, so location isn’t critical.
* Degrees may not be a key factor; advocates are already screened by Solace.
* Browsing unfiltered results isn’t very useful; better to start with a **search input**.

---

# Frontend to-dos

### Optimizations
* Use **React Query or SWR** to cache repeat searches.
* Add **predictive autocomplete** from common specialties.
* Trigger search **on button click** or predicted specialty selection.

### UX Details
* Handle **loading** and **error states** gracefully.
* Truncate long specialties list with an expand button.
* (Optional) Refactor to **shared input/form components** for consistency.

---

# Backend to-dos
* Cache responses for identical search inputs (Upstash in production).
* Explore **Postgres text vectorization**:
  * Flatten specialties into text fields.
  * Tokenized indexing for fast reverse lookups.
* Alternative: normalize model with a **specialty-advocate join table** and indexed lookups.

---

# Product Thoughts
* **Trust** is the one of the most important factor for patients in advocate selection; they are vulnerable, and need someone with expertise, experience, and compassion to help them through their medical journey.
  * Trust communicated via `yearsOfExperience` and listed **specialties**.
  * An advocate's personality or helping style could be an interesting thing to model and represent to users.
* **Specialty overload**: future iterations should emphasize **primary specialties** to ease user's decision making.

---

# Challenges
* Had not worked with **Drizzle** before; combining it with **Postgres text vectorization** created friction points.
* Walked back to a **simpler, less performant search** for iteration one.
* This ensured I delivered a functional demo that highlights **product thinking and engineering judgment**, while noting a clear path for technical improvement later.
