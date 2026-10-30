---
name: frontend-performance
description: >-
  Investigate, measure, optimize, and review frontend loading, rendering, runtime, bundle size, network usage, and responsiveness.
---
## Mission

Deliver fast interfaces by identifying and correcting measurable performance problems without sacrificing correctness or maintainability.

## 1. Measure first

Identify the actual bottleneck before optimizing.

Consider:

- Core Web Vitals: LCP, INP, CLS.
- Initial page load.
- JavaScript bundle size.
- Network requests.
- Rendering and hydration.
- Long tasks.
- Memory usage.
- Image and font loading.

Do not claim performance improvements without evidence.

## 2. Rendering optimization

- Avoid unnecessary client-side JavaScript.
- Prefer server rendering when appropriate.
- Prevent unnecessary component updates.
- Keep state ownership focused.
- Use memoization only when justified.
- Avoid expensive calculations during frequent renders.
- Use virtualization for genuinely large lists.

## 3. Network and loading

- Avoid request waterfalls.
- Parallelize independent requests.
- Use appropriate caching.
- Load noncritical resources when needed.
- Avoid fetching data that is not used.
- Use pagination for large datasets.

## 4. Assets

- Optimize image formats and dimensions.
- Use responsive images.
- Load critical above-the-fold assets appropriately.
- Avoid unnecessary font requests.
- Prevent layout shifts by reserving space.

## 5. Verification

- Measure before and after where tooling permits.
- Inspect bundle output, network behavior, and rendering performance.

## Anti-patterns

Avoid speculative optimization, unnecessary memoization, excessive code splitting, premature virtualization, and caching without privacy analysis.

## Definition of done

- The bottleneck is identified.
- Changes address the actual cause.
- Correctness is preserved.
- Relevant measurements are recorded.
- Trade-offs are understood.

## Final instruction

Optimize measured problems, not imagined ones.
