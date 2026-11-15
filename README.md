## Inspiration
 
Cybersecurity classes teach plenty of theory (phishing, firewalls, MFA), but students rarely get to **practice the order of decisions** during a real incident.ms is risky. We wanted a safe place wherestudents can make mistakes, see why they were wrong, and try again.
 
## What it does
 
**csChamp** is a browser game where you play a security analyst. Each round is a short, fictional incident: a phishing
email, an unreachable server, a suspicious lve found in the parking lot, or a passwordleak.
 
- You read the alert and the **evidence**, then choose an action.
- Good steps earn points. Risky steps cost pe leads to a *compromised* ending.
- The end screen shows your score, the number of steps, and the **concept** the scenario teaches.
 
The score for a run is simply:
 
$$
S = \sum_{i=1}^{n} p_i \qquad \text{where }
$$
 
Here $n$ is the number of steps taken. The best path is the one that reaches the safe ending with the highest $S$ in
the fewest steps.
 
## How we built it
 
- **React + Vite**, running entirely in the , so nothing can fail during the demo.
- **Scenarios in plain JSON** (`src/data/scenarios.json`). Each scenario is a small graph of nodes, where every choice
points to the next node and the endings carrnd teachers can add scenarios withouttouching the code.
- **A game engine built with `useReducer`**,ore, step count and history.
- **React Router** for navigation, with topic selection kept for future subjects.
- **A hacker / terminal theme** in pure CSS scanlines, blinking cursor), so no imageassets were needed.
- An **optional Arduino controller** (potent) connected through the Web Serial API. Thegame always stays playable with a mouse.
 
## Challenges we faced
 
- **Learning React under time pressure:** hook imports (`import { useState }` vs `import useState`), and understanding
that JSX inside a click handler does nothing
- **Routing:** setting up React Router, avoiding nested routers, and planning for GitHub Pages, where client-side
routes break on refresh.
- **Teamwork in a 6-hour build:** splitting the engine, the UI and the content into separate files to avoid conflicts.
- **Writing good scenarios:** each wrong chouence and a clear lesson, not just "wronganswer".
 
## What we worked on
 
- React fundamentals: components, state, event handlers and routing.
- How to model a decision tree as data inste
- Real incident-response habits: check before acting, contain first, and change only what is needed.
- Scoping: shipping one complete, playable lfeatures.
 
## What's next
 
- More topics on the same engine (IT support, ncepts to review" list on the end screen, atimer per incident, and a scenario creator form.)
- Adding your own custom topics