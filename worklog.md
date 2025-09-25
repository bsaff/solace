Worklog
- Init repo
- Install docker
- Setup db
- Wire db to client
- page.tsx fixes
  - add Advocate type
  - add key to rendering of advocate result.
  - use component state for search term
- install biome, shadcn components
- Plan improved search
  - specialty input
  - update backend to accept params


Todos:
- Debounce search term entry.
- One key thing I could assume is that a patient is going to be searching primarily based on the type of health problem they're having. They want to have an expert that's dealt with an advocate that's dealt with their particular ailment. And I think it's also going to be important for them to see `yearsOfExperience` but I'm not sure a patient needs to control that, the results can sort by years of experience.

One other assumption is that advocate services will be primarily remote and location is not really an issue as long as they're in the U.S.

I don't understand how important degree is, so I'm going to just assume it's not that important for this.
