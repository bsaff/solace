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
  - specialty input, debounced search
  - update backend to accept params
- Improve result rendering with <AdvocateCard>
- Add no results state
- Sort by years of experience



Assumptions:
- One key thing I could assume is that a patient is going to be searching primarily based on the type of health problem they're having. They want to have an expert that's dealt with an advocate that's dealt with their particular ailment. And I think it's also going to be important for them to see `yearsOfExperience` but I'm not sure a patient needs to control that, the results can sort by years of experience.

One other assumption is that advocate services will be primarily remote and location is not really an issue as long as they're in the U.S.

I don't understand how important degree is, so I'm going to just assume it's not that important for this.

I'm also assuming the user isn't really going to be doing it might not be helpful for a user to just explore unfiltered results, but I'm not sure about that because they may want to just see what a few advocates look like. So maybe just showing the top 10 by `yearsOfExperience` might be a good trade-off there, just to show them what kind of keywords they could search for. But I actually think that obfuscates what they need to do, the tasks they need to do. So I probably actually err on the side of just starting with the search input and letting them initiate from there.


Backend optimization:

Yeah, I would love to explore this text vector thing. I explored basically this text vector thing, so like basically flattening the arrays of specialties into these large text just flat text fields and then basically using this Postgres vectorization of the text you can split it on space and for each token you can basically index advocates. Do you can do like this reverse index thing that allows any of these tokens to be kind of mapped to n number of advocates. I thought that was interesting but I ran into a lot of friction. I'd never used Drizzle before and I had some trouble applying database changes to Postgres, especially given the fact that this was a pretty complex use case of Postgres and Drizzle didn't have full support. So I had to backpedal and just leave that whole effort into like a footnote and say like basically I realize it's very unoptimal but rather than using my time to learn something new I figured I should use this assessment just to show what I can do and so I kind of stopped.
