# DogTrial — inventaire des notifications et cartes de l'app (14 octobre 2026)

Source : code de l'app (`www/index.html`, `www/notifications-catalog.js`, `www/incident-rules.json`, `www/absence-consequence-engine.js`). Les textes sont en anglais dans l'app ; l'interface a aussi une version française.

## Vue d'ensemble

| Famille | Nombre | Où ça apparaît | Photo aujourd'hui |
|---|---|---|---|
| A. Dog Moments (centre de notifications + bulle + carte) | 16 | écran Notifications, onglets All / Dog Moments | **aucune** (icône seulement) |
| B. Trial Updates (mises à jour d'essai) | 1 (« Day 1 complete ») | onglet Trial Updates | aucune |
| C. Incidents après une absence | 10 | même centre, étiquette « Incident » | **oui** (10 photos) |
| D. Rappels de soins intelligents (notifications locales) | 98 modèles | notification du téléphone + écran Reminders | aucune |
| E. Alerte besoin (notification web) | 3 messages | notification du navigateur (web/PWA) | aucune |
| F. Carte « sniffing » du jour (accueil) | 1 par jour | carte d'accueil, pas dans le centre de notifications | **oui** (race × âge, 30 photos) |
| G. Onglet Tips | **0** | existe dans les filtres mais rien ne l'alimente | — |

## A. Dog Moments (16)
Une carte s'ouvre au toucher : catégorie, titre, explication, « What to do », bouton « Got it ». Chaque moment dépend de l'état réel de la simulation (pas d'aléatoire pur).

| # | Id | Catégorie | Titre | Explication | Que faire | Déclencheur | Rythme |
|---|---|---|---|---|---|---|---|
| 1 | `explore_no_settle` | Exploration | They may be looking for a place to settle. | A new environment can be overwhelming. Dogs often benefit from having a quiet place where they can rest without constant activity around them. | Keep their resting area quiet and let them choose when to settle. | entre 1 h 30 et 6 h après le début de l'essai, énergie ≥ 40 | une seule fois par essai |
| 2 | `continued_sniffing` | Exploration | Still sniffing? That's normal. | Dogs use scent to gather information about people, objects and places around them. | If the area is safe, give them time to investigate instead of constantly calling them away. | chiot ou adolescent, énergie ≥ 55, lien < 80 | délai minimum 20 h |
| 3 | `bathroom_warning` | Toilet | Watch closely. A bathroom break may be coming. | Young puppies have limited bladder control and do not automatically know where they are supposed to go. | Take them to their designated toilet area now and reward them when they get it right. | chiot, vessie ≤ 30 | délai minimum 3 h |
| 4 | `missed_bathroom_signal` | Toilet | Too late this time. | Puppies do not automatically understand your schedule. Accidents can happen during house training. | Clean it properly and adjust your supervision or routine. Never punish the accident. | événement : accident d'un chiot | déclenché par un événement |
| 5 | `chewing_risk` | Chewing | That chair suddenly looks interesting. | Dogs investigate their environment with their mouths. Chewing can also be part of play, exploration or normal development. | Calmly redirect them to an appropriate chew toy. Avoid turning the moment into a chase. | propreté < 70, énergie ≥ 50, pas d'entraînement depuis plus de 3 h | délai minimum 10 h |
| 6 | `food_smell_unsafe` | Safety | That smell is VERY interesting. | Dogs investigate their environment through scent. Food smells can be especially difficult for them to ignore. | Redirect them before they get into something unsafe. | énergie ≥ 45 et faim ≤ 40 | délai minimum 12 h |
| 7 | `sudden_tiredness` | Rest | And now... crash. | Young puppies can switch from intense activity to sleep very quickly. Rest is an important part of their routine. | Let them sleep. Don't keep stimulating them just because they were playing a minute ago. | énergie ≤ 25, chiot ou adolescent | délai minimum 5 h |
| 8 | `wants_play` | Play | Your dog wants to interact with you. | Play is not only exercise. It can also help build the relationship between a dog and its owner. | Give them a short, focused play session and stop before they become overly stimulated. | énergie ≥ 70 et lien < 75 | délai minimum 8 h |
| 9 | `boredom_outlet` | Play | Your dog may be looking for something to do. | When appropriate outlets are unavailable, dogs may find their own entertainment. | Offer a chew, sniffing activity, short training session or supervised play. | énergie ≥ 70, propriétaire présent, pas d'entraînement depuis plus de 10 h | délai minimum 14 h |
| 10 | `learning_from_owner` | Bond | Your dog is learning from you already. | Dogs learn from everyday interactions, not only formal training sessions. | Reward behaviors you want to see again. Don't wait for a formal training session. | jours 1 à 7 de l'essai, lien ≥ 45 | une seule fois par essai |
| 11 | `watching_owner` | Bond | They're watching what you do. | Your dog is learning your routines, movements and reactions. | Be predictable. Calm and consistent responses help your dog understand what happens next. | lien entre 50 et 85 | délai minimum 30 h |
| 12 | `attachment_developing` | Bond | They're starting to look for you. | Repeated positive interactions help your dog learn that you're part of their new social environment. | Keep building the relationship through calm play, rewards and predictable routines. | lien ≥ 70 | une seule fois par essai |
| 13 | `departure_moment` | Separation | You disappeared. | Your dog has just experienced a small separation from you. This is an observation, not a diagnosis of separation anxiety. | Keep departures and returns calm. Don't turn every separation into a major event. | dans les 15 minutes après un départ (« Leave for work ») | délai minimum 1 h |
| 14 | `new_visitor` | Socialization | Someone new just entered their world. | Some dogs rush to greet new people. Others need time before approaching. | Let your dog choose the distance. Don't force an interaction. | événement : un visiteur arrive | déclenché par un événement, délai minimum 48 h |
| 15 | `new_sound` | Environment | What's that? | Your dog just encountered a new sound. Their reaction can depend on temperament and previous experiences. | Stay calm. Give them space and let them observe rather than forcing them toward the sound. | logement autre que jardin, entre 9 h et 19 h | délai minimum 18 h |
| 16 | `overstimulation` | Overstimulation | That may have been enough for now. | New experiences can add up quickly. Your dog may need a break before the next activity. | Give them a quiet space and let them decompress. | charge propriétaire ≥ 65 | délai minimum 10 h |

## B. Trial Updates (1)

- `day1_complete` · **Day 1 complete.** — You didn't just spend a day with a dog. Your dog spent a day learning what life with you looks like. — À faire : Tomorrow, the routine starts to matter. (une seule fois, dès le jour 1)

**Manque :** aucune mise à jour pour les jours 7, 14, 21 et 30, ni aucune pour la fin de l'essai.

## C. Incidents après une absence (10)
Déclenchés une seule fois par absence, à son retour, avec au plus un par jour. Le texte « explication » est généré : « [cause] Breed, age, and housing adjust the risk, but never prove the cause — this is probably associated, not certain. » Conseil selon la cause principale (walk, play, training, toilet, meal).

| Id | Titre | Photo | Âges concernés | Logements | Causes principales | Possible dans une caisse |
|---|---|---|---|---|---|---|
| `pee_accident` | Toilet accident | `pee_accident.jpg` | puppy, adolescent, adult | garden, apartment_terrace, apartment_crate | toilet 1.0, walk 0.2 | oui |
| `soil_spill` | Spilled soil | `soil_spill.jpg` | puppy, adolescent, adult | garden, apartment_terrace | play 0.5, walk 0.35, training 0.15 | non |
| `chewed_shoe` | Chewed shoe | `chewed_shoe.jpg` | puppy, adolescent, adult | garden, apartment_terrace | walk 0.45, play 0.4, training 0.15 | non |
| `torn_cushion` | Torn cushion | `torn_cushion.jpg` | adolescent, adult | garden, apartment_terrace | walk 0.5, play 0.4, training 0.1 | non |
| `tipped_bin` | Tipped bin | `tipped_bin.jpg` | puppy, adolescent, adult | garden, apartment_terrace | meal 0.55, training 0.3, play 0.15 | non |
| `unrolled_toilet_paper` | Unrolled toilet paper | `unrolled_toilet_paper.jpg` | puppy, adolescent | garden, apartment_terrace | play 0.55, training 0.3, walk 0.15 | non |
| `chewed_plant` | Chewed plant | `chewed_plant.jpg` | puppy, adolescent, adult | garden, apartment_terrace | play 0.5, training 0.3, walk 0.2 | non |
| `torn_book` | Torn book | `torn_book.jpg` | puppy, adolescent | garden, apartment_terrace | play 0.5, training 0.3, walk 0.2 | non |
| `damaged_remote` | Damaged remote | `damaged_remote.jpg` | puppy, adolescent, adult | garden, apartment_terrace | walk 0.45, play 0.4, training 0.15 | non |
| `stolen_food` | Stolen food | `stolen_food.jpg` | puppy, adolescent, adult | garden, apartment_terrace | meal 0.6, training 0.3, play 0.1 | non |

Conseils par cause :
- walk : « Finish today's walk to close the gap before it happens again. »
- play : « A short play session now would help close today's gap. »
- training : « A quick training session would help close today's gap. »
- toilet : « Get back on schedule with toilet breaks today. »
- meal : « Get back on schedule with meals today. »

## D. Rappels de soins intelligents (98 modèles)
Notifications locales du téléphone, filtrées par race, âge (puppy / adolescent / adult) et mode (essai ou après adoption). Un modèle propre à la race remplace un modèle générique. 8 modèles pour « toutes les races » et 9 par race.

Catégories : activity (22), care (11), daily (65). Actions : open_appointment, open_cleanup, open_meal, open_rest, open_routine, open_training, open_walk.

### Toutes les races (8)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · Quiet moment | Time to settle after our activity. | Your planned routine reminder is ready. | activity | open_rest |
| adult | {dogName} · Care appointment | Our saved care appointment is coming up. | Your planned routine reminder is ready. | care | open_appointment |
| all | {dogName} · Virtual dog update | Oops, a little accident. Can you help me? |  | daily | open_cleanup |
| all | {dogName} · Outdoor break | Our planned walk is still waiting. | Your planned routine reminder is ready. | daily | open_walk |
| puppy | {dogName} · Potty break | Meal finished. Ready for a potty break? | Your planned routine reminder is ready. | daily | open_walk |
| puppy | {dogName} · Potty break | After play, a little outdoor break? | Your planned routine reminder is ready. | daily | open_walk |
| puppy | {dogName} · Quiet moment | Let’s enjoy a quiet little break. | Your planned routine reminder is ready. | activity | open_rest |
| puppy | {dogName} · Potty break | I’m awake. A little potty break? | Your planned routine reminder is ready. | daily | open_walk |

### Labrador Retriever (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | Try a gentle retrieve game. | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | Time for my planned weight check-in. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | Reward a calm greeting. | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Siberian Husky (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | A secure sniff adventure together? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | My coat-care routine is waiting. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | Let’s practise coming back to you. | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### French Bulldog (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | Let’s choose a comfortable, easy activity. | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | Time for my planned skin-care routine. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | A calm little exploration together? | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Border Collie (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | Ready for a little search game? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | My brushing routine is ready. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | A tiny learning moment together? | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Chihuahua (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | A small puzzle, a big adventure? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | Time for my planned tooth-care routine. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | A gentle handling practice together? | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### American Staffordshire Terrier (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | A little lead-walking practice? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | My coat-care check-in is ready. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | Let’s practise a calm hello. | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Cane Corso (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | Let’s practise walking together calmly. | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | Time to review my planned care routine. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | A calm new experience together? | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Belgian Malinois (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | Ready for our next search game? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | Let’s check in on my activity routine. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | A short focus game together? | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### German Shepherd (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | A little recall practice together? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | My brushing routine is waiting. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | Let’s practise looking back at you. | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

### Bichon Frise (9)

| Âge | Titre | Message (essai) | Message (après adoption) | Catégorie | Action |
|---|---|---|---|---|---|
| adolescent | {dogName} · A moment together | A playful little learning break? | Your planned activity reminder is ready. | activity | open_training |
| adolescent | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adolescent | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| adult | {dogName} · A moment together | My coat-care appointment is waiting. | Your planned care activity reminder is ready. | care | open_routine |
| adult | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| adult | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |
| puppy | {dogName} · A moment together | Let’s get comfortable with my brush. | Your planned activity reminder is ready. | activity | open_training |
| puppy | {dogName} · Mealtime | My scheduled meal is ready. | Your planned meal reminder is ready. | daily | open_meal |
| puppy | {dogName} · Outdoor break | Our planned outdoor break is ready. | Your planned outdoor break reminder is ready. | daily | open_walk |

## E. Alertes besoin (web)
Notification du navigateur, titre « The 30-Day Dog » (**ancien nom de l'app, à corriger en « DogTrial »**), au plus une toutes les 2 h par besoin, quand la jauge passe sous 20 :
- faim : « [Nom] is pacing by the food bowl, waiting. »
- vessie : « [Nom] is circling by the door and whining. »
- énergie : « [Nom] is bouncing off the walls with pent-up energy. »

## F. Carte « sniffing » du jour
Carte d'accueil, une fois par jour, avec une photo `media/moments/sniffing/{race}_{âge}.jpg` (10 races × puppy / adolescent / adult = 30 photos). Pas dans le centre de notifications.

## Écarts à combler (pour les cartes avec photo)
1. **Les 16 Dog Moments n'ont aucune photo.** Les incidents en ont, et le code de la carte sait déjà afficher une photo.
2. **Les rappels (98) n'ont ni photo ni carte détaillée.** Ils ouvrent seulement une action (balade, repas, entraînement) ou rien du tout.
3. **Trial Updates** : seule « Day 1 complete » existe.
4. **Tips** : l'onglet est vide.
5. **Les textes des Dog Moments ne varient pas selon la race** : un Border Collie et un Bulldog Français reçoivent exactement la même explication. C'est le plus gros potentiel de personnalisation.
6. **Les alertes web utilisent l'ancien nom « The 30-Day Dog ».**
