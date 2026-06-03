The "Senior Touch": Include a brief README.md explaining how you would handle
an API error (e.g., if the DHL rate service is down) and how you would optimize the
bundle size for slow 3G connections in emerging markets.

- For the DHL service is down first we setup all our requests with a retry with backoff we should show correct states for loading and error and for the error message to be appropriate also we need to give users the ability to retry again if we want to 

---

- For the second part with slow 3G there are a few setps to be ready for that
    1. Always use optimized assets 
    2. We should pick dependencies that are ligher in weight for example (moment to be replaced with date-fns)
    3. We should aim for dependencies that support tree-shaking especially with icon libraries
    4. We can debug the dependency graph so we're able to see what the heavy dependencies are
    5. Code splitting and lazy loading could help as well