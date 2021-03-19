---
date: [2020-06-14 Sun]
title: Probabilité de couvrir le Goncourt
---

Le Goncourt se déroule en 4 sélections. À la première sélection, le
jury retient 15 livres. Aux suivantes, il retient: 9 livres (ou 8
certaines années), puis 4 livres (les finalistes), et enfin 1 livre
(le vainqueur).

La question: tu lis K livres sur les N de la liste, combien sont dans
la prochaine sélection (avec quelle probabilité)?

----------------------------------------------------------------------

Une sélection se déroule: le jury choisit (au hasard) n livres dans la
liste. Combien de choix de n livres possibles y a-t-il? C~N,n~. On
peut partitionner ces choix possibles sur combien ils ont de livres en
commun avec ta lecture. Pour k livres sélectionnés et lus, n-k ont été
sélectionnés mais non lus. Combien de choix possibles de sélectionner
k livres parmi les lus? C~K,k~. Et n-k livres parmi les non lus?
C~N-K,n-k~.

Parmi les livres lus, avoir exactement k livres sélectionnés a donc
une probabilité de C~K,k~C~N-K,n-k~/C~N,n~. En fait cette expérience
suit la loi hypergéométrique de paramètres N,K,n. (Note: en sommant
sur k dans [0..K], on peut vérifier qu'on obtienne bien 1 en utilisant
l'identité de Vandermonde.)

----------------------------------------------------------------------

Exemple. Il y a 15 livres dans la liste. Tu en lis 5. 9 sont
sélectionnés.

  k   exactement k livres   entre k et 5 livres
  --- --------------------- ---------------------
  0   0.20%                 100.00%
  1   4.50%                 99.80%
  2   23.98%                95.30%
  3   41.96%                71.33%
  4   25.17%                29.37%
  5   4.20%                 4.20%

  : =HYPGEOM.HIST(**k**,9,5,15,0)

Il y a 71% de chance qu'au moins 3 des 5 livres soient dans la
sélection.

Mais ce modèle fait une supposition simplificatrice: chaque livre a
autant de chance d'être sélectionné qu'un autre. Dans les faits, un
livre chez Gallimard a beaucoup plus de chance d'être sélectionné
qu'un livre dans une plus petite maison d'édition.

----------------------------------------------------------------------

Note de fin: le jury et le lecteur ont un rôle identique (effectuer
une sélection). Le modèle est symétrique. En effet, échanger n et K
donne la même distribution. Sauf qu'en échangeant, ça suppose que le
lecteur choisisse les livres au hasard *à chaque sélection*. Ça n'a
pas de sens: on ne peut pas lire un livre à une sélection et ne pas
l'avoir lu à la suivante.
