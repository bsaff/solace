# Assumptions
* Patients are the main users
* Patients will primarily search by their **health problem**.
* `yearsOfExperience` is a strong trust signal; results can be **sorted by experience** rather than user-controlled.
* Advocate services are assumed to be **remote (U.S.-based)**, so location isn’t a critical detail.
* Degrees may not be a key factor; advocates are already screened by Solace.
* Browsing unfiltered results isn’t very useful; better to start with a **search input**.

---

# Frontend to-dos

### Optimizations
* Add Pagination support / progressively loading results on scroll
* Use **React Query or SWR** to cache repeat searches.
* Add **predictive autocomplete** from common specialties.
* Trigger search on button click or predicted specialty selection.
* Cleanup timeout reference on unmount
* React Virtuoso for rendering advocate cards (for real data, 100+ results)

### UX Details
* Handle **loading** and **error states** gracefully.
* Truncate long specialties list with an expand button.


---

# Backend to-dos
* Add Pagination support
* Cache responses for identical search inputs (Upstash in production).
* Explore **Postgres text vectorization**:
  * Flatten specialties into text fields.
  * Tokenized indexing for fast reverse lookups.
* Alternative: normalize model with a **specialty-advocate join table** and indexed lookups.

---

# Product Thoughts
* **Trust** is an important factor for patients in advocate selection; they are vulnerable, and want an advocate with expertise, experience, and compassion
  * Trust gained via `yearsOfExperience` and listed **specialties**.
  * An advocate's personality or helping style could be an interesting thing to model and represent to users.
* **Specialty overload**: future iterations should emphasize **primary specialties** to ease user's decision making.
* If Solace collects user medical information during onboarding, advocate search can be much smarter, showing best advovate matches immediately; potentially no need for a user to manually search

---

# Challenges
* Had not worked with **Drizzle** before; combining it with **Postgres text vectorization** created friction points. Walked back to a **simpler, less performant search** for iteration one. This ensured I delivered a functional demo that highlights **product thinking and engineering judgment**, while noting a clear path for technical improvement later.
