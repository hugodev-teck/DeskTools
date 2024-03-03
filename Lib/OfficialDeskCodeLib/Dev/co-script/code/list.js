const jsonData = [
  {
    "title": "Boucle For en JavaScript",
    "description": "Exemple d'une boucle for en JavaScript affichant les nombres de 1 à 5.",
    "code": "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}"
  },
  {
    "title": "Fonction en Python",
    "description": "Exemple d'une fonction en Python calculant la somme de deux nombres.",
    "code": "def addition(a, b):\n  return a + b"
  },
  {
    "title": "Requête SQL de Sélection",
    "description": "Exemple d'une requête SQL sélectionnant tous les utilisateurs.",
    "code": "SELECT * FROM utilisateurs;"
  },
  {
    "title": "Classe en Java",
    "description": "Exemple d'une classe simple en Java représentant un étudiant.",
    "code": "public class Etudiant {\n  private String nom;\n  private int age;\n}"
  },
  {
    "title": "Condition If en C++",
    "description": "Exemple d'une condition if en C++ vérifiant si un nombre est pair.",
    "code": "if (nombre % 2 == 0) {\n  // Faire quelque chose si le nombre est pair\n}"
  },
  {
    "title": "Manipulation de Chaînes en JavaScript",
    "description": "Exemple de manipulation de chaîne en JavaScript inversant une phrase.",
    "code": "const phrase = 'Bonjour le monde!';\nconst phraseInverse = phrase.split('').reverse().join('');"
  },
  {
    "title": "Création de Tableau en Python",
    "description": "Exemple de création d'un tableau en Python avec des éléments.",
    "code": "tableau = [1, 2, 3, 4, 5]"
  },
  {
    "title": "Boucle While en JavaScript",
    "description": "Exemple d'une boucle while en JavaScript affichant les nombres de 1 à 5.",
    "code": "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}"
  },
  {
    "title": "Création de Dictionnaire en Python",
    "description": "Exemple de création d'un dictionnaire en Python avec des clés et des valeurs.",
    "code": "dictionnaire = {'nom': 'Alice', 'âge': 25, 'ville': 'Paris'}"
  },
  {
    "title": "Manipulation de Tableau en JavaScript",
    "description": "Exemple de manipulation de tableau en JavaScript triant les nombres.",
    "code": "const nombres = [3, 1, 4, 1, 5, 9, 2, 6];\nnombres.sort((a, b) => a - b);"
  },
  {
    "title": "Boucle forEach en JavaScript",
    "description": "Exemple d'une boucle forEach en JavaScript sur un tableau de nombres.",
    "code": "const nombres = [1, 2, 3, 4, 5];\nnombres.forEach(nombre => console.log(nombre));"
  },
  {
    "title": "Définition de Classe en Python",
    "description": "Exemple de définition d'une classe en Python pour représenter un animal.",
    "code": "class Animal:\n  def __init__(self, nom, espece):\n    self.nom = nom\n    self.espece = espece"
  },
  {
    "title": "Requête API en JavaScript",
    "description": "Exemple de requête GET vers une API externe en JavaScript.",
    "code": "fetch('https://api.exemple.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data));"
  },
  {
    "title": "Création de Fonction en C++",
    "description": "Exemple de création d'une fonction en C++ calculant la factorielle d'un nombre.",
    "code": "int factorielle(int n) {\n  return (n == 1 || n == 0) ? 1 : n * factorielle(n - 1);\n}"
  },
  {
    "title": "Manipulation de Date en Python",
    "description": "Exemple de manipulation de date en Python pour afficher la date d'aujourd'hui.",
    "code": "from datetime import date\naujourdhui = date.today()\nprint(aujourdhui)"
  },
  {
    "title": "Création de Liste en Ruby",
    "description": "Exemple de création d'une liste en Ruby avec des éléments.",
    "code": "liste = [\"Pomme\", \"Banane\", \"Orange\"]"
  },
  {
    "title": "Boucle do-while en C",
    "description": "Exemple d'une boucle do-while en C affichant les nombres de 1 à 5.",
    "code": "int i = 1;\ndo {\n  printf(\"%d\\n\", i);\n  i++;\n} while (i <= 5);"
  },
  {
    "title": "Création de Fichier en Java",
    "description": "Exemple de création d'un fichier en Java et écriture de données.",
    "code": "File fichier = new File(\"mon_fichier.txt\");\ntry (PrintWriter writer = new PrintWriter(fichier)) {\n  writer.println(\"Contenu du fichier...\");\n}"
  },
  {
    "title": "Manipulation de Tableau Associatif en PHP",
    "description": "Exemple de manipulation d'un tableau associatif en PHP.",
    "code": "$personne = array(\"nom\" => \"Alice\", \"age\" => 30, \"ville\" => \"Paris\");"
  },
  {
    "title": "Création de Classe en C#",
    "description": "Exemple de création d'une classe en C# représentant un véhicule.",
    "code": "public class Vehicule {\n  public string Marque { get; set; }\n  public string Modele { get; set; }\n}"
  },
  {
    "title": "Tri de Tableau en JavaScript",
    "description": "Exemple de tri d'un tableau de chaînes de caractères en JavaScript.",
    "code": "const fruits = ['Orange', 'Pomme', 'Banane', 'Fraise'];\nfruits.sort();"
  },
  {
    "title": "Manipulation de Chaîne en Python",
    "description": "Exemple de manipulation de chaîne en Python pour obtenir une sous-chaîne.",
    "code": "chaine = 'Exemple de manipulation';\nsous_chaine = chaine[8:20];"
  },
  {
    "title": "Création de Classe en JavaScript",
    "description": "Exemple de création d'une classe en JavaScript pour représenter un livre.",
    "code": "class Livre {\n  constructor(titre, auteur) {\n    this.titre = titre;\n    this.auteur = auteur;\n  }\n}"
  },
  {
    "title": "Boucle for-each en Java",
    "description": "Exemple d'une boucle for-each en Java sur un tableau d'entiers.",
    "code": "int[] nombres = {1, 2, 3, 4, 5};\nfor (int nombre : nombres) {\n  System.out.println(nombre);\n}"
  },
  {
    "title": "Gestion de Fichier en PHP",
    "description": "Exemple de lecture et écriture dans un fichier en PHP.",
    "code": "$fichier = 'mon_fichier.txt';\n$contenu = file_get_contents($fichier);\necho $contenu;\nfile_put_contents($fichier, 'Nouveau contenu');"
  },
  {
    "title": "Création de Dictionnaire en JavaScript",
    "description": "Exemple de création d'un objet de type dictionnaire en JavaScript.",
    "code": "const utilisateur = {\n  nom: 'Alice',\n  age: 30,\n  ville: 'Paris'\n};"
  },
  {
    "title": "Manipulation de Liste en C#",
    "description": "Exemple de manipulation d'une liste en C# en ajoutant et en supprimant des éléments.",
    "code": "List<string> villes = new List<string>();\nvilles.Add(\"Paris\");\nvilles.Add(\"Londres\");\nvilles.Remove(\"Paris\");"
  },
  {
    "title": "Création de Fonction en Ruby",
    "description": "Exemple de création d'une fonction en Ruby calculant la somme de deux nombres.",
    "code": "def somme(a, b)\n  return a + b\nend"
  },
  {
    "title": "Manipulation de Tableau en PHP",
    "description": "Exemple de manipulation de tableau en PHP pour trouver la valeur maximale.",
    "code": "$nombres = array(10, 5, 8, 3, 12);\n$max = max($nombres);"
  },
  {
    "title": "Gestion de Date en Java",
    "description": "Exemple de manipulation de date en Java pour afficher le jour actuel.",
    "code": "import java.util.Date;\nDate date = new Date();\nSystem.out.println(date);"
  },
  {
    "title": "Création de Liste en JavaScript",
    "description": "Exemple de création d'une liste de nombres en JavaScript.",
    "code": "const nombres = [1, 2, 3, 4, 5];"
  },
  {
    "title": "Création de Fonction en Java",
    "description": "Exemple de création d'une fonction en Java calculant la factorielle.",
    "code": "public int factorielle(int n) {\n  return (n <= 1) ? 1 : n * factorielle(n - 1);\n}"
  },
  {
    "title": "Requête GET en Python",
    "description": "Exemple de requête GET vers une API externe en Python.",
    "code": "import requests\nresponse = requests.get('https://api.exemple.com/data')\nprint(response.json())"
  },
  {
    "title": "Création de Classe en TypeScript",
    "description": "Exemple de création d'une classe en TypeScript pour représenter un produit.",
    "code": "class Produit {\n  constructor(public nom: string, public prix: number) {}\n}"
  },
  {
    "title": "Manipulation de Chaîne en PHP",
    "description": "Exemple de manipulation de chaîne en PHP pour obtenir la longueur.",
    "code": "$chaine = 'Exemple de chaîne';\n$longueur = strlen($chaine);"
  },
  {
    "title": "Création de Tableau Associatif en JavaScript",
    "description": "Exemple de création d'un tableau associatif en JavaScript.",
    "code": "const utilisateur = {\n  nom: 'Alice',\n  age: 25,\n  ville: 'Paris'\n};"
  },
  {
    "title": "Boucle While en Python",
    "description": "Exemple d'une boucle while en Python affichant les nombres de 1 à 5.",
    "code": "i = 1\nwhile i <= 5:\n    print(i)\n    i += 1"
  },
  {
    "title": "Manipulation de Tableau en TypeScript",
    "description": "Exemple de manipulation de tableau en TypeScript pour filtrer les nombres pairs.",
    "code": "const nombres: number[] = [1, 2, 3, 4, 5];\nconst nombresPairs = nombres.filter(nombre => nombre % 2 === 0);"
  },
  {
    "title": "Création de Classe en Kotlin",
    "description": "Exemple de création d'une classe en Kotlin pour représenter un livre.",
    "code": "class Livre(val titre: String, val auteur: String)"
  },
  {
    "title": "Manipulation de Liste en Swift",
    "description": "Exemple de manipulation d'une liste en Swift pour trier les éléments.",
    "code": "var nombres = [5, 2, 8, 1, 7];\nnombres.sort()"
  },
  {
    "title": "Gestion de Fichiers en JavaScript",
    "description": "Exemple de lecture et écriture dans un fichier en JavaScript côté serveur.",
    "code": "const fs = require('fs');\nconst contenu = fs.readFileSync('mon_fichier.txt', 'utf-8');\nfs.writeFileSync('nouveau_fichier.txt', 'Nouveau contenu');"
  },
  {
    "title": "Manipulation de Liste en Python",
    "description": "Exemple de manipulation d'une liste en Python pour inverser l'ordre des éléments.",
    "code": "liste = [1, 2, 3, 4, 5]\nliste_inverse = liste[::-1]"
  },
  {
    "title": "Création de Fonction en PHP",
    "description": "Exemple de création d'une fonction en PHP pour calculer la moyenne.",
    "code": "function calculerMoyenne($notes) {\n  return array_sum($notes) / count($notes);\n}"
  },
  {
    "title": "Requête POST en Python",
    "description": "Exemple de requête POST vers une API externe en Python.",
    "code": "import requests\nurl = 'https://api.exemple.com/data'\ndonnees = {'nom': 'Alice', 'age': 30}\nresponse = requests.post(url, json=donnees)"
  },
  {
    "title": "Création de Classe en Swift",
    "description": "Exemple de création d'une classe en Swift pour représenter un véhicule.",
    "code": "class Vehicule {\n  var marque: String\n  var modele: String\n  init(marque: String, modele: String) {\n    self.marque = marque\n    self.modele = modele\n  }\n}"
  },
  {
    "title": "Gestion de Fichier en C#",
    "description": "Exemple de lecture et écriture dans un fichier en C#.",
    "code": "string chemin = \"mon_fichier.txt\";\nstring contenu = File.ReadAllText(chemin);\nFile.WriteAllText(chemin, \"Nouveau contenu\");"
  },
  {
    "title": "Création de Tableau Associatif en PHP",
    "description": "Exemple de création d'un tableau associatif en PHP.",
    "code": "$utilisateur = array(\"nom\" => \"Alice\", \"age\" => 30, \"ville\" => \"Paris\");"
  },
  {
    "title": "Boucle do-while en JavaScript",
    "description": "Exemple d'une boucle do-while en JavaScript affichant les nombres de 1 à 5.",
    "code": "let i = 1;\ndo {\n  console.log(i);\n  i++;\n} while (i <= 5);"
  },
  {
    "title": "Création de Fonction en Kotlin",
    "description": "Exemple de création d'une fonction en Kotlin pour calculer la somme.",
    "code": "fun calculerSomme(a: Int, b: Int): Int {\n  return a + b\n}"
  },
  {
    "title": "Manipulation de Date en C++",
    "description": "Exemple de manipulation de date en C++ pour afficher la date actuelle.",
    "code": "#include <iostream>\n#include <ctime>\nint main() {\n  time_t t = time(0);\n  std::cout << ctime(&t);\n}"
  },
  {
    "title": "Manipulation de Liste en Scala",
    "description": "Exemple de manipulation d'une liste en Scala pour filtrer les nombres pairs.",
    "code": "val nombres = List(1, 2, 3, 4, 5)\nval nombresPairs = nombres.filter(_ % 2 == 0)"
  },
  {
    "title": "Création de Classe en Go",
    "description": "Exemple de création d'une structure en Go pour représenter un utilisateur.",
    "code": "type Utilisateur struct {\n  Nom string\n  Age int\n  Email string\n}"
  },
  {
    "title": "Requête DELETE en Node.js",
    "description": "Exemple de requête DELETE vers une API en utilisant Node.js et Axios.",
    "code": "const axios = require('axios');\naxios.delete('https://api.exemple.com/data/1')"
  },
  {
    "title": "Manipulation de Fichier en Rust",
    "description": "Exemple de lecture et écriture dans un fichier en Rust.",
    "code": "use std::fs;\nfn main() {\n    let contenu = fs::read_to_string(\"mon_fichier.txt\");\n    fs::write(\"nouveau_fichier.txt\", contenu.unwrap());\n}"
  },
  {
    "title": "Création de Fonction en Swift",
    "description": "Exemple de création d'une fonction en Swift pour calculer la moyenne.",
    "code": "func calculerMoyenne(notes: [Double]) -> Double {\n    return notes.reduce(0, +) / Double(notes.count)\n}"
  },
  {
    "title": "Manipulation de Chaîne en Perl",
    "description": "Exemple de manipulation de chaîne en Perl pour obtenir la longueur.",
    "code": "my $chaine = 'Exemple de chaîne';\nmy $longueur = length($chaine);"
  },
  {
    "title": "Manipulation de Chaîne en Perl",
    "description": "Exemple de manipulation de chaîne en Perl pour obtenir la longueur.",
    "code": "my $chaine = 'Exemple de chaîne';\nmy $longueur = length($chaine);"
  },
  {
    "title": "Gestion de Fichier en Ruby",
    "description": "Exemple de lecture et écriture dans un fichier en Ruby.",
    "code": "contenu = File.read('mon_fichier.txt')\nFile.write('nouveau_fichier.txt', contenu)"
  },
  {
    "title": "Création de Fonction en TypeScript",
    "description": "Exemple de création d'une fonction en TypeScript pour calculer la puissance.",
    "code": "function calculerPuissance(base: number, exposant: number): number {\n  return Math.pow(base, exposant);\n}"
  },
  {
    "title": "Création de Fonction en TypeScript",
    "description": "Exemple de création d'une fonction en TypeScript pour calculer la puissance.",
    "code": "function calculerPuissance(base: number, exposant: number): number {\n  return Math.pow(base, exposant);\n}"
  },
  {
    "title": "Création de Dictionnaire en Python",
    "description": "Exemple de création d'un dictionnaire en Python avec des clés et des valeurs.",
    "code": "dictionnaire = {'nom': 'Alice', 'age': 30, 'ville': 'Paris'}"
  },
  {
    "title": "Manipulation de Tableau en Perl",
    "description": "Exemple de manipulation d'un tableau en Perl pour trouver la taille.",
    "code": "my @tableau = (1, 2, 3, 4, 5);\nmy $taille = scalar @tableau;"
  },
  {
    "title": "Manipulation de Chaîne en Groovy",
    "description": "Exemple de manipulation de chaîne en Groovy pour obtenir une sous-chaîne.",
    "code": "def chaine = 'Exemple de manipulation'\ndef sousChaine = chaine[8..20]"
  },
  {
    "title": "Boucle foreach en Ruby",
    "description": "Exemple d'une boucle foreach en Ruby sur un tableau de chaînes.",
    "code": "nombres = [1, 2, 3, 4, 5]\nnombres.each { |nombre| puts nombre }"
  },
  {
    "title": "Manipulation de Date en Lua",
    "description": "Exemple de manipulation de date en Lua pour obtenir le jour actuel.",
    "code": "local date = os.date('%A')\nprint(date)"
  },
  {
    "title": "Création de Fichier en Go",
    "description": "Exemple de création d'un fichier en Go et écriture de données.",
    "code": "package main\nimport (\n    \"fmt\"\n    \"io/ioutil\"\n)\nfunc main() {\n    data := []byte(\"Contenu du fichier...\")\n    err := ioutil.WriteFile(\"mon_fichier.txt\", data, 0644)\n    if err != nil {\n        fmt.Println(err)\n    }\n}"
  },
  {
    "title": "Manipulation de Liste en Lua",
    "description": "Exemple de manipulation d'une liste en Lua pour trier les éléments.",
    "code": "local nombres = {5, 2, 8, 1, 7}\ntable.sort(nombres)"
  },
  {
    "title": "Création de Fonction en Perl",
    "description": "Exemple de création d'une fonction en Perl pour calculer la somme.",
    "code": "sub calculerSomme {\n    my @nombres = @_;\n    my $somme = 0;\n    foreach my $nombre (@nombres) {\n        $somme += $nombre;\n    }\n    return $somme;\n}"
  },
  {
    "title": "Création de Fonction en Perl",
    "description": "Exemple de création d'une fonction en Perl pour calculer la somme.",
    "code": "sub calculerSomme {\n    my @nombres = @_;\n    my $somme = 0;\n    foreach my $nombre (@nombres) {\n        $somme += $nombre;\n    }\n    return $somme;\n}"
  },
  {
    "title": "Création de Liste en Rust",
    "description": "Exemple de création d'une liste en Rust avec des valeurs.",
    "code": "let nombres = vec![1, 2, 3, 4, 5];"
  },
  {
    "title": "Manipulation de Chaîne en Swift",
    "description": "Exemple de manipulation de chaîne en Swift pour obtenir une sous-chaîne.",
    "code": "let chaine = \"Exemple de chaîne\"\nlet sousChaine = chaine[8..<20]"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Fonction en Julia",
    "description": "Exemple de création d'une fonction en Julia pour calculer la moyenne.",
    "code": "function calculerMoyenne(nombres)\n    return sum(nombres) / length(nombres)\nend"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Création de Classe en Scala",
    "description": "Exemple de création d'une classe en Scala pour représenter un utilisateur.",
    "code": "class Utilisateur(val nom: String, val age: Int)"
  },
  {
    "title": "Manipulation de Tableau en C",
    "description": "Exemple de manipulation d'un tableau en C pour trier les éléments.",
    "code": "int nombres[] = {5, 2, 8, 1, 7};\nint taille = sizeof(nombres) / sizeof(nombres[0]);\nqsort(nombres, taille, sizeof(int), comparaison);\n/* Fonction de comparaison */\nint comparaison(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}"
  },
  {
    "title": "Allocation Dynamique en C",
    "description": "Exemple d'allocation dynamique en C pour un tableau d'entiers.",
    "code": "int *tableau;\nint taille = 5;\ntableau = (int *)malloc(taille * sizeof(int));\nif (tableau == NULL) {\n    // Gérer l'échec de l'allocation\n}"
  },
  {
    "title": "Structure en C",
    "description": "Exemple de création et d'utilisation d'une structure en C.",
    "code": "struct Personne {\n    char nom[50];\n    int age;\n};\nstruct Personne p1;\np1.age = 25;\nstrcpy(p1.nom, \"Alice\");"
  },
  {
    "title": "Pointeurs en C",
    "description": "Exemple d'utilisation de pointeurs en C.",
    "code": "int nombre = 10;\nint *ptr;\nptr = &nombre;\nprintf(\"Valeur de nombre : %d\", *ptr);"
  },
  {
    "title": "Lecture de Fichier en C",
    "description": "Exemple de lecture d'un fichier en C.",
    "code": "FILE *fichier;\nchar caractere;\nfichier = fopen(\"mon_fichier.txt\", \"r\");\nif (fichier) {\n    while ((caractere = getc(fichier)) != EOF) {\n        // Traitement du caractère\n    }\n    fclose(fichier);\n}"
  },
  {
    "title": "Utilisation de Fonctions en C",
    "description": "Exemple d'utilisation de fonctions en C pour calculer la factorielle.",
    "code": "int factorielle(int n) {\n    if (n == 0) {\n        return 1;\n    } else {\n        return n * factorielle(n - 1);\n    }\n}\nint resultat = factorielle(5);"
  },
  {
    "title": "Manipulation de Chaîne en C",
    "description": "Exemple de manipulation de chaîne en C pour obtenir la longueur.",
    "code": "#include <stdio.h>\n#include <string.h>\nint main() {\n    char chaine[] = \"Exemple de chaîne\";\n    int longueur = strlen(chaine);\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Structures de Contrôle en C",
    "description": "Exemple d'utilisation des structures de contrôle en C.",
    "code": "int a = 10;\nif (a > 5) {\n    // Faire quelque chose\n} else {\n    // Faire autre chose\n}"
  },
  {
    "title": "Allocation de Mémoire en C",
    "description": "Exemple d'allocation de mémoire en C pour un seul entier.",
    "code": "int *nombre;\nnombre = (int *)malloc(sizeof(int));\nif (nombre == NULL) {\n    // Gérer l'échec de l'allocation\n}"
  },
  {
    "title": "Utilisation de Boucles en C",
    "description": "Exemple d'utilisation de boucles en C.",
    "code": "for (int i = 0; i < 5; i++) {\n    // Faire quelque chose\n}\nint j = 0;\nwhile (j < 5) {\n    // Faire autre chose\n    j++;\n}"
  },
  {
    "title": "Manipulation de Chaîne en C++",
    "description": "Exemple de manipulation de chaîne en C++ pour obtenir la longueur.",
    "code": "#include <iostream>\n#include <string>\nint main() {\n    std::string chaine = \"Exemple de chaîne\";\n    int longueur = chaine.length();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Vecteurs en C++",
    "description": "Exemple d'utilisation de vecteurs en C++ pour stocker des entiers.",
    "code": "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> nombres = {1, 2, 3, 4, 5};\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Classes en C++",
    "description": "Exemple d'utilisation de classes en C++ pour représenter un utilisateur.",
    "code": "#include <iostream>\n#include <string>\nclass Utilisateur {\npublic:\n    std::string nom;\n    int age;\n};\nint main() {\n    Utilisateur user;\n    user.nom = \"Alice\";\n    user.age = 25;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Fonctions en C++",
    "description": "Exemple d'utilisation de fonctions en C++ pour calculer la somme.",
    "code": "#include <iostream>\nint somme(int a, int b) {\n    return a + b;\n}\nint main() {\n    int resultat = somme(3, 5);\n    return 0;\n}"
  },
  {
    "title": "Allocation Dynamique en C++",
    "description": "Exemple d'allocation dynamique en C++ pour un tableau d'entiers.",
    "code": "#include <iostream>\nint main() {\n    int taille = 5;\n    int *tableau = new int[taille];\n    delete[] tableau;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Pointeurs en C++",
    "description": "Exemple d'utilisation de pointeurs en C++.",
    "code": "#include <iostream>\nint main() {\n    int nombre = 10;\n    int *ptr = &nombre;\n    std::cout << \"Valeur de nombre : \" << *ptr << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Lecture de Fichier en C++",
    "description": "Exemple de lecture d'un fichier en C++.",
    "code": "#include <iostream>\n#include <fstream>\nint main() {\n    std::ifstream fichier(\"mon_fichier.txt\");\n    char caractere;\n    if (fichier) {\n        while (fichier.get(caractere)) {\n            // Traitement du caractère\n        }\n        fichier.close();\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Structures de Contrôle en C++",
    "description": "Exemple d'utilisation des structures de contrôle en C++.",
    "code": "#include <iostream>\nint main() {\n    int a = 10;\n    if (a > 5) {\n        // Faire quelque chose\n    } else {\n        // Faire autre chose\n    }\n    return 0;\n}"
  },
  {
    "title": "Allocation de Mémoire en C++",
    "description": "Exemple d'allocation de mémoire en C++ pour un seul entier.",
    "code": "#include <iostream>\nint main() {\n    int *nombre = new int;\n    delete nombre;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Boucles en C++",
    "description": "Exemple d'utilisation de boucles en C++.",
    "code": "#include <iostream>\nint main() {\n    for (int i = 0; i < 5; i++) {\n        // Faire quelque chose\n    }\n    int j = 0;\n    while (j < 5) {\n        // Faire autre chose\n        j++;\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Tableaux Multidimensionnels en C",
    "description": "Exemple d'utilisation de tableaux multidimensionnels en C.",
    "code": "int tableau[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n// Accès aux éléments : tableau[ligne][colonne]"
  },
  {
    "title": "Manipulation de Fichiers en C",
    "description": "Exemple de manipulation de fichiers en C pour écrire des données.",
    "code": "FILE *fichier;\nfichier = fopen(\"donnees.txt\", \"w\");\nif (fichier != NULL) {\n    fprintf(fichier, \"Hello, World!\");\n    fclose(fichier);\n}"
  },
  {
    "title": "Utilisation de Fonctions Récursives en C",
    "description": "Exemple d'utilisation de fonctions récursives en C pour calculer la somme.",
    "code": "int sommeRec(int n) {\n    if (n == 0) {\n        return 0;\n    }\n    return n + sommeRec(n - 1);\n}"
  },
  {
    "title": "Utilisation de Macros en C",
    "description": "Exemple d'utilisation de macros en C pour définir des constantes.",
    "code": "#define PI 3.14159\n// Utilisation : float rayon = 5;\n// float aire = PI * rayon * rayon;"
  },
  {
    "title": "Utilisation de la Bibliothèque Mathématique en C",
    "description": "Exemple d'utilisation de fonctions mathématiques en C (ex. sqrt, sin).",
    "code": "#include <math.h>\n// Exemple : double resultat = sqrt(25); // résultat = 5.0"
  },
  {
    "title": "Utilisation de Pointeurs de Fonction en C",
    "description": "Exemple d'utilisation de pointeurs de fonction en C pour des fonctions callback.",
    "code": "void fonction1() {\n    printf(\"Fonction 1 appelée.\");\n}\nvoid fonction2() {\n    printf(\"Fonction 2 appelée.\");\n}\nvoid appeler(void (*fonction)()) {\n    fonction();\n}"
  },
  {
    "title": "Utilisation de Classes Abstraites en C++",
    "description": "Exemple d'utilisation de classes abstraites et de fonctions virtuelles en C++.",
    "code": "class Forme {\npublic:\n    virtual void dessiner() = 0;\n};\nclass Cercle : public Forme {\npublic:\n    void dessiner() override { /* Dessiner le cercle */ }\n};"
  },
  {
    "title": "Utilisation de l'Opérateur de Surcharge en C++",
    "description": "Exemple d'utilisation de l'opérateur de surcharge en C++.",
    "code": "class Point {\npublic:\n    int x, y;\n    Point operator+(const Point &p) {\n        Point nouveau;\n        nouveau.x = x + p.x;\n        nouveau.y = y + p.y;\n        return nouveau;\n    }\n};"
  },
  {
    "title": "Utilisation de la Programmation Orientée Objet en C++",
    "description": "Exemple d'utilisation de la programmation orientée objet (POO) en C++.",
    "code": "class Animal {\npublic:\n    virtual void parler() = 0;\n};\nclass Chien : public Animal {\npublic:\n    void parler() override { std::cout << \"Woof!\"; }\n};"
  },
  {
    "title": "Manipulation de Fichiers en C++",
    "description": "Exemple de manipulation de fichiers en C++ pour lire des données.",
    "code": "#include <iostream>\n#include <fstream>\nint main() {\n    std::ifstream fichier(\"donnees.txt\");\n    char caractere;\n    if (fichier) {\n        while (fichier.get(caractere)) {\n            // Traitement du caractère\n        }\n        fichier.close();\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Généricité en C++",
    "description": "Exemple d'utilisation de la généricité en C++ avec les templates.",
    "code": "template <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\nint main() {\n    int max = maximum(5, 10);\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Gestion d'Exceptions en C++",
    "description": "Exemple d'utilisation de la gestion d'exceptions en C++ avec try-catch.",
    "code": "try {\n    // Code pouvant générer une exception\n} catch (const std::exception &e) {\n    // Gérer l'exception\n}"
  },
  {
    "title": "Utilisation de la Programmation Fonctionnelle en C++",
    "description": "Exemple d'utilisation de la programmation fonctionnelle en C++ avec les lambdas.",
    "code": "auto addition = [](int a, int b) { return a + b; };\nint resultat = addition(3, 5);"
  },
  {
    "title": "Utilisation de la Bibliothèque Mathématique en C",
    "description": "Exemple d'utilisation de fonctions mathématiques en C (ex. sqrt, sin).",
    "code": "#include <math.h>\n// Exemple : double resultat = sqrt(25); // résultat = 5.0"
  },
  {
    "title": "Utilisation de Pointeurs de Fonction en C",
    "description": "Exemple d'utilisation de pointeurs de fonction en C pour des fonctions callback.",
    "code": "void fonction1() {\n    printf(\"Fonction 1 appelée.\");\n}\nvoid fonction2() {\n    printf(\"Fonction 2 appelée.\");\n}\nvoid appeler(void (*fonction)()) {\n    fonction();\n}"
  },
  {
    "title": "Utilisation de Tableaux de Chaînes de Caractères en C",
    "description": "Exemple d'utilisation de tableaux de chaînes de caractères en C.",
    "code": "char *mots[] = {\"Bonjour\", \"monde\", \"!\"};\n// Accès aux éléments : mots[indice]"
  },
  {
    "title": "Gestion de la Mémoire Dynamique en C",
    "description": "Exemple de gestion de la mémoire dynamique en C avec malloc et free.",
    "code": "int *nombre;\nnombre = (int *)malloc(sizeof(int));\nif (nombre != NULL) {\n    *nombre = 5;\n    free(nombre);\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Temps en C",
    "description": "Exemple d'utilisation de la bibliothèque de temps en C pour mesurer le temps d'exécution.",
    "code": "#include <time.h>\nint main() {\n    clock_t debut, fin;\n    double temps_ecoule;\n    debut = clock();\n    // Code à mesurer\n    fin = clock();\n    temps_ecoule = ((double)(fin - debut)) / CLOCKS_PER_SEC;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de l'Allocation Statique en C",
    "description": "Exemple d'utilisation de l'allocation statique en C pour déclarer des tableaux.",
    "code": "int tableau[10];\n// Accès aux éléments : tableau[indice]"
  },
  {
    "title": "Utilisation de la Bibliothèque de Fichiers en C",
    "description": "Exemple d'utilisation de la bibliothèque de fichiers en C pour renommer un fichier.",
    "code": "#include <stdio.h>\nint main() {\n    if (rename(\"ancien.txt\", \"nouveau.txt\") == 0) {\n        printf(\"Renommage réussi.\");\n    } else {\n        printf(\"Erreur lors du renommage.\");\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Génération de Nombres Aléatoires en C",
    "description": "Exemple d'utilisation de la génération de nombres aléatoires en C.",
    "code": "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int aleatoire = rand() % 100; // Nombres aléatoires de 0 à 99\n    printf(\"Nombre aléatoire : %d\", aleatoire);\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Lambda en C++",
    "description": "Exemple d'utilisation de la programmation lambda en C++.",
    "code": "auto addition = [](int a, int b) { return a + b; };\nint resultat = addition(3, 5);"
  },
  {
    "title": "Manipulation de Flux en C++",
    "description": "Exemple de manipulation de flux en C++ pour la lecture et l'écriture de données.",
    "code": "#include <iostream>\nint main() {\n    int valeur;\n    std::cout << \"Entrez une valeur : \";\n    std::cin >> valeur;\n    std::cout << \"Vous avez entré : \" << valeur << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Thread en C++",
    "description": "Exemple d'utilisation de la bibliothèque de thread en C++ pour la programmation multithread.",
    "code": "#include <iostream>\n#include <thread>\nvoid fonction() {\n    // Code exécuté dans un thread\n}\nint main() {\n    std::thread monThread(fonction);\n    monThread.join();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Réflexion Avancée en C++",
    "description": "Exemple d'utilisation de la réflexion avancée en C++ pour l'introspection des types.",
    "code": "// Utilisation de bibliothèques tierces ou de fonctionnalités expérimentales pour l'introspection des types."
  },
  {
    "title": "Utilisation de la Bibliothèque d'Entrées/Sorties en C++",
    "description": "Exemple d'utilisation de la bibliothèque d'entrées/sorties en C++ avec les fichiers.",
    "code": "#include <iostream>\n#include <fstream>\nint main() {\n    std::ofstream fichier(\"donnees.txt\");\n    fichier << \"Donnees\";\n    fichier.close();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque Algorithmique en C++",
    "description": "Exemple d'utilisation de la bibliothèque algorithmique en C++ (ex. sort, find).",
    "code": "#include <iostream>\n#include <algorithm>\nint main() {\n    int nombres[] = {3, 1, 4, 1, 5, 9};\n    std::sort(nombres, nombres + 6);\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Conteneurs en C++",
    "description": "Exemple d'utilisation de la bibliothèque de conteneurs en C++ (ex. vector, map).",
    "code": "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> nombres = {1, 2, 3, 4, 5};\n    return 0;\n}"
  },
  {
    "title": "Lecture de capteur de lumière",
    "description": "Ce programme Arduino lit la valeur d'un capteur de lumière analogique connecté à la broche A0 et l'affiche sur le moniteur série.",
    "code": "const int lightSensorPin = A0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int sensorValue = analogRead(lightSensorPin);\n  Serial.print(\"Valeur du capteur de lumière : \");\n  Serial.println(sensorValue);\n  delay(1000);\n}"
  },
  {
    "title": "Capteur de température LM35",
    "description": "Ce programme Arduino lit la température à partir d'un capteur LM35 et l'affiche sur le moniteur série.",
    "code": "#define SENSOR_PIN A0\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int sensorValue = analogRead(SENSOR_PIN);\n  float temperature = sensorValue * 0.48875855327; // Conversion de la valeur analogique en température en degrés Celsius\n  Serial.print(\"Température : \");\n  Serial.print(temperature);\n  Serial.println(\"°C\");\n  delay(1000);\n}"
  },
  {
    "title": "Clignotement de LED",
    "description": "Ce programme Arduino fait clignoter une LED connectée à la broche 13 avec une période de 1 seconde.",
    "code": "#define LED_PIN 13\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_PIN, LOW);\n  delay(1000);\n}"
  }, 
  {
    "title": "Base fichier Arduino",
    "description": "Ce programme Arduino est la base pour votre programme",
    "code": " /*\nTitre: Titre du Programme\nDescription: Description détaillée de ce que fait le programme.\n*/\n// Déclaration des broches et des variables globales ici\nvoid setup() {\n// Initialisations et configurations des broches ici\n}\nvoid loop() {\n// Code principal du programme ici\n}\n"
  },
  {
    "title": "Génération de Sons avec un Buzzer",
    "description": "Ce programme Arduino génère des séquences de sons avec un buzzer connecté à la broche 8.",
    "code": "#define BUZZER_PIN 8\n\nvoid setup() {\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  tone(BUZZER_PIN, 1000);\n  delay(1000);\n  noTone(BUZZER_PIN);\n  delay(500);\n  tone(BUZZER_PIN, 2000);\n  delay(1000);\n  noTone(BUZZER_PIN);\n  delay(500);\n}"
  },
  {
    "title": "Communication Série avec LED",
    "description": "Ce programme Arduino allume ou éteint une LED en fonction des commandes reçues sur le moniteur série (baud rate: 9600).",
    "code": "#define LED_PIN 13\nchar command;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  if(Serial.available() > 0) {\n    command = Serial.read();\n    if(command == '1') {\n      digitalWrite(LED_PIN, HIGH);\n      Serial.println(\"LED allumée\");\n    }\n    else if(command == '0') {\n      digitalWrite(LED_PIN, LOW);\n      Serial.println(\"LED éteinte\");\n    }\n  }\n}"
  },
  {
    "title": "Mesure de Distance avec Capteur Ultrasonique",
    "description": "Ce programme Arduino mesure la distance à un obstacle en utilisant un capteur ultrasonique HC-SR04 et affiche la distance mesurée sur le moniteur série.",
    "code": "#define TRIG_PIN 9\n#define ECHO_PIN 10\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);\n}\n\nvoid loop() {\n  long duration, distance;\n  digitalWrite(TRIG_PIN, LOW);\n  delayMicroseconds(2);\n  digitalWrite(TRIG_PIN, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n  duration = pulseIn(ECHO_PIN, HIGH);\n  distance = (duration * 0.0343) / 2;\n  Serial.print(\"Distance: \");\n  Serial.print(distance);\n  Serial.println(\" cm\");\n  delay(1000);\n}"
  },
  {
    "title": "Capteur de Température et d'Humidité",
    "description": "Ce programme Arduino lit les données d'un capteur de température et d'humidité DHT11 et les affiche sur le moniteur série.",
    "code": "#include <DHT.h>\n\n#define DHT_PIN 2\n#define DHT_TYPE DHT11\n\nDHT dht(DHT_PIN, DHT_TYPE);\n\nvoid setup() {\n  Serial.begin(9600);\n  dht.begin();\n}\n\nvoid loop() {\n  float temperature = dht.readTemperature();\n  float humidity = dht.readHumidity();\n  Serial.print(\"Température: \");\n  Serial.print(temperature);\n  Serial.print(\"°C, Humidité: \");\n  Serial.print(humidity);\n  Serial.println(\"%\");\n  delay(2000);\n}"
  },
  {
    "title": "Contrôle de Servomoteur",
    "description": "Ce programme Arduino contrôle un servomoteur en faisant varier son angle de rotation de 0 à 180 degrés.",
    "code": "#include <Servo.h>\n\n#define SERVO_PIN 9\n\nServo myServo;\nint angle = 0;\n\nvoid setup() {\n  myServo.attach(SERVO_PIN);\n}\n\nvoid loop() {\n  for(angle = 0; angle < 180; angle++) {\n    myServo.write(angle);\n    delay(15);\n  }\n  for(angle = 180; angle > 0; angle--) {\n    myServo.write(angle);\n    delay(15);\n  }\n}"
  },
  {
    "title": "Implémentation de l'algorithme de tri rapide (quicksort) en C++",
    "description": "Cet exemple présente une implémentation de l'algorithme de tri rapide (quicksort) en C++.",
    "code": "#include <iostream>\n#include <vector>\n\nvoid quicksort(std::vector<int>& arr, int left, int right) {\n    if (left >= right) return;\n    int pivot = arr[(left + right) / 2];\n    int i = left, j = right;\n    while (i <= j) {\n        while (arr[i] < pivot) i++;\n        while (arr[j] > pivot) j--;\n        if (i <= j) {\n            std::swap(arr[i], arr[j]);\n            i++;\n            j--;\n        }\n    }\n    quicksort(arr, left, j);\n    quicksort(arr, i, right);\n}\n\nint main() {\n    std::vector<int> arr = {3, 6, 8, 10, 1, 2, 1};\n    int n = arr.size();\n    quicksort(arr, 0, n - 1);\n    std::cout << \"Sorted array: \";\n    for (int num : arr) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Implémentation d'un réseau neuronal avec rétropropagation en Python",
    "description": "Cet exemple présente l'implémentation d'un réseau neuronal avec rétropropagation en Python à l'aide de la bibliothèque NumPy.",
    "code": "import numpy as np\n\n# Définition de la fonction d'activation (sigmoid)\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\n# Classe du réseau neuronal\n\nclass NeuralNetwork:\n    def __init__(self, input_size, hidden_size, output_size):\n        self.input_size = input_size\n        self.hidden_size = hidden_size\n        self.output_size = output_size\n        # Initialisation des poids\n        self.weights_input_hidden = np.random.randn(self.input_size, self.hidden_size)\n        self.weights_hidden_output = np.random.randn(self.hidden_size, self.output_size)\n\n    def forward(self, inputs):\n        # Passage avant\n        self.hidden = sigmoid(np.dot(inputs, self.weights_input_hidden))\n        self.output = sigmoid(np.dot(self.hidden, self.weights_hidden_output))\n        return self.output\n\n# Utilisation du réseau neuronal\n\ninput_size = 2\nhidden_size = 3\noutput_size = 1\n\n# Création d'une instance du réseau neuronal\nnn = NeuralNetwork(input_size, hidden_size, output_size)\n\n# Entrées\ninputs = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\n\n# Passage avant\noutput = nn.forward(inputs)\nprint('Sortie du réseau neuronal :')\nprint(output)"
  },
  {
    "title": "Résolution du problème du sac à dos avec la programmation dynamique en Python",
    "description": "Cet exemple résout le problème du sac à dos en utilisant la programmation dynamique en Python.",
    "code": "def knapsack(values, weights, capacity):\n    n = len(values)\n    # Initialisation d'un tableau pour stocker les résultats intermédiaires\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    # Remplissage du tableau en utilisant la programmation dynamique\n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i - 1] <= w:\n                dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])\n            else:\n                dp[i][w] = dp[i - 1][w]\n    return dp[n][capacity]\n\n# Exemple d'utilisation\nvalues = [60, 100, 120]\nweights = [10, 20, 30]\ncapacity = 50\nmax_value = knapsack(values, weights, capacity)\nprint('La valeur maximale du sac à dos est :', max_value)"
  },
  {
    "title": "Addition de deux nombres en langage d'assemblage x86",
    "description": "Cet exemple montre comment additionner deux nombres en langage d'assemblage (Assembleur) pour l'architecture x86.",
    "code": "; Programme en langage d'assemblage x86 pour additionner deux nombres\n\nsection .data\n    num1 dd 10  ; Premier nombre à additionner (entier de 4 octets)\n    num2 dd 20  ; Deuxième nombre à additionner (entier de 4 octets)\n    result dd 0  ; Variable pour stocker le résultat de l'addition\n\nsection .text\n    global _start\n\n_start:\n    ; Chargement du premier nombre dans un registre\n    mov eax, [num1]\n    ; Chargement du deuxième nombre dans un autre registre\n    mov ebx, [num2]\n    ; Addition des deux nombres\n    add eax, ebx\n    ; Stockage du résultat dans la variable 'result'\n    mov [result], eax\n\n    ; Sortie du programme\n    mov eax, 1  ; Code pour exit\n    xor ebx, ebx  ; Statut de sortie\n    int 0x80  ; Appel système pour terminer le programme"
  },
  {
    "title": "Calcul de la factorielle en langage d'assemblage x86",
    "description": "Cet exemple montre comment calculer la factorielle d'un nombre en langage d'assemblage (Assembleur) pour l'architecture x86.",
    "code": "; Programme en langage d'assemblage x86 pour calculer la factorielle d'un nombre\n\nsection .data\n    n dw 5  ; Nombre dont on veut calculer la factorielle\n    result dw 1  ; Variable pour stocker le résultat\n\nsection .text\n    global _start\n\n_start:\n    ; Chargement du nombre dans un registre\n    mov ax, [n]\n    ; Initialisation du compteur de boucle\n    mov cx, ax\n\nfact_loop:\n    ; Multiplication du résultat actuel par le compteur\n    mul cx\n    ; Décrémentation du compteur\n    loop fact_loop\n\n    ; Stockage du résultat dans la variable 'result'\n    mov [result], ax\n\n    ; Sortie du programme\n    mov eax, 1  ; Code pour exit\n    xor ebx, ebx  ; Statut de sortie\n    int 0x80  ; Appel système pour terminer le programme"
  },
  {
    "title": "Inversion d'une chaîne de caractères en langage d'assemblage x86",
    "description": "Cet exemple montre comment inverser une chaîne de caractères en langage d'assemblage (Assembleur) pour l'architecture x86.",
    "code": "; Programme en langage d'assemblage x86 pour inverser une chaîne de caractères\n\nsection .data\n    str db 'Hello, world!', 0  ; Chaîne de caractères à inverser\n    str_len equ $ - str  ; Longueur de la chaîne\n    reversed_str db str_len dup(0)  ; Chaîne inversée\n\nsection .text\n    global _start\n\n_start:\n    ; Initialisation des pointeurs\n    mov esi, str\n    mov edi, reversed_str\n\n    ; Inversion de la chaîne\nreverse_loop:\n    ; Copie du caractère de la fin au début\n    mov al, [esi + str_len - 1]\n    mov [edi], al\n    ; Déplacement des pointeurs\n    dec str_len\n    inc edi\n    cmp str_len, 0\n    jne reverse_loop\n\n    ; Affichage de la chaîne inversée\n    mov eax, 4  ; Code pour write\n    mov ebx, 1  ; Descripteur de fichier standard (stdout)\n    mov ecx, reversed_str\n    mov edx, str_len\n    int 0x80  ; Appel système pour afficher la chaîne\n\n    ; Sortie du programme\n    mov eax, 1  ; Code pour exit\n    xor ebx, ebx  ; Statut de sortie\n    int 0x80  ; Appel système pour terminer le programme"
  },
  {
    "title": "Calcul de la somme des éléments d'un tableau en langage d'assemblage x86",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un tableau en langage d'assemblage (Assembleur) pour l'architecture x86.",
    "code": "; Programme en langage d'assemblage x86 pour calculer la somme des éléments d'un tableau\n\nsection .data\n    array dd 5, 10, 8, 15, 3  ; Tableau d'entiers\n    array_size equ ($ - array) / 4  ; Taille du tableau\n    sum dd 0  ; Variable pour stocker la somme\n\nsection .text\n    global _start\n\n_start:\n    ; Initialisation des pointeurs\n    mov esi, array\n\n    ; Calcul de la somme\nsum_loop:\n    ; Ajout de l'élément actuel à la somme\n    add [sum], dword [esi]\n    ; Passage à l'élément suivant du tableau\n    add esi, 4\n    loop sum_loop\n\n    ; Affichage de la somme\n    mov eax, 4  ; Code pour write\n    mov ebx, 1  ; Descripteur de fichier standard (stdout)\n    mov ecx, sum\n    mov edx, 4  ; Taille de la donnée à afficher (dword = 4 octets)\n    int 0x80  ; Appel système pour afficher la somme\n\n    ; Sortie du programme\n    mov eax, 1  ; Code pour exit\n    xor ebx, ebx  ; Statut de sortie\n    int 0x80  ; Appel système pour terminer le programme"
  },
  {
    "title": "Calcul de la puissance d'un nombre en langage d'assemblage x86",
    "description": "Cet exemple montre comment calculer la puissance d'un nombre en langage d'assemblage pour l'architecture x86.",
    "code": "; Programme en langage d'assemblage x86 pour calculer la puissance d'un nombre\n\nsection .data\n    base dd 2  ; Base de la puissance\n    exponent dd 5  ; Exposant de la puissance\n    result dd 1  ; Variable pour stocker le résultat\n\nsection .text\n    global _start\n\n_start:\n    ; Chargement de la base dans un registre\n    mov eax, [base]\n    ; Chargement de l'exposant dans un autre registre\n    mov ebx, [exponent]\n\npower_loop:\n    ; Multiplication du résultat actuel par la base\n    mul eax, [base]\n    ; Décrémentation de l'exposant\n    dec ebx\n    ; Vérification de la fin de la boucle\n    cmp ebx, 0\n    jne power_loop\n\n    ; Stockage du résultat dans la variable 'result'\n    mov [result], eax\n\n    ; Sortie du programme\n    mov eax, 1  ; Code pour exit\n    xor ebx, ebx  ; Statut de sortie\n    int 0x80  ; Appel système pour terminer le programme"
  },
  {
    "title": "Calcul de la somme des éléments d'un tableau en Java",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un tableau en Java.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] array = {5, 10, 8, 15, 3};\n        int sum = 0;\n        for (int num : array) {\n            sum += num;\n        }\n        System.out.println(\"La somme des éléments du tableau est : \" + sum);\n    }\n}"
  },
  {
    "title": "Recherche du plus grand élément dans une liste en Python",
    "description": "Cet exemple montre comment rechercher le plus grand élément dans une liste en Python.",
    "code": "def find_max(arr):\n    max_value = arr[0]\n    for num in arr:\n        if num > max_value:\n            max_value = num\n    return max_value\n\narray = [5, 10, 8, 15, 3]\nmax_value = find_max(array)\nprint('Le plus grand élément de la liste est :', max_value)"
  },
  {
    "title": "Calcul de la moyenne des éléments d'un tableau en C#",
    "description": "Cet exemple montre comment calculer la moyenne des éléments d'un tableau en C#.",
    "code": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        int[] array = {5, 10, 8, 15, 3};\n        int sum = 0;\n        foreach (int num in array)\n        {\n            sum += num;\n        }\n        double average = (double)sum / array.Length;\n        Console.WriteLine(\"La moyenne des éléments du tableau est : \" + average);\n    }\n}"
  },
  {
    "title": "Compter le nombre de voyelles dans une chaîne de caractères en Ruby",
    "description": "Cet exemple montre comment compter le nombre de voyelles dans une chaîne de caractères en Ruby.",
    "code": "def count_vowels(str)\n    vowels = 'aeiouAEIOU'\n    count = 0\n    str.each_char do |char|\n        count += 1 if vowels.include?(char)\n    end\n    count\nend\n\ninput_string = 'Hello, world!'\nnum_vowels = count_vowels(input_string)\nputs 'Le nombre de voyelles dans la chaîne est : ' + num_vowels.to_s"
  },
  {
    "title": "Vérification si une chaîne est un palindrome en PHP",
    "description": "Cet exemple montre comment vérifier si une chaîne est un palindrome en PHP.",
    "code": "<?php\nfunction isPalindrome($str) {\n    $str = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $str));\n    return $str === strrev($str);\n}\n\n$inputString = 'A man, a plan, a canal, Panama!';\nif (isPalindrome($inputString)) {\n    echo 'La chaîne est un palindrome.';\n} else {\n    echo 'La chaîne n\'est pas un palindrome.';\n}\n?>"
  },
  {
    "title": "Tri d'un tableau d'entiers en utilisant la fonction de tri rapide en Swift",
    "description": "Cet exemple montre comment trier un tableau d'entiers en utilisant la fonction de tri rapide en Swift.",
    "code": "func quicksort(_ array: inout [Int], low: Int, high: Int) {\n    if low < high {\n        let pivotIndex = partition(&array, low: low, high: high)\n        quicksort(&array, low: low, high: pivotIndex - 1)\n        quicksort(&array, low: pivotIndex + 1, high: high)\n    }\n}\n\nfunc partition(_ array: inout [Int], low: Int, high: Int) -> Int {\n    let pivot = array[high]\n    var i = low\n    for j in low..<high {\n        if array[j] < pivot {\n            array.swapAt(i, j)\n            i += 1\n        }\n    }\n    array.swapAt(i, high)\n    return i\n}\n\nvar array = [5, 3, 8, 2, 9, 1]\nquicksort(&array, low: 0, high: array.count - 1)\nprint(\"Tableau trié : \\(array)\")"
  },
  {
    "title": "Calcul de la somme des éléments d'un vecteur en Rust",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un vecteur en Rust.",
    "code": "fn main() {\n    let array = vec![5, 10, 8, 15, 3];\n    let sum: i32 = array.iter().sum();\n    println!(\"La somme des éléments du vecteur est : {}\", sum);\n}"
  },
  {
    "title": "Calcul de la factorielle d'un nombre en Haskell",
    "description": "Cet exemple montre comment calculer la factorielle d'un nombre en Haskell.",
    "code": "factorial :: Integer -> Integer\nfactorial 0 = 1\nfactorial n = n * factorial (n - 1)\n\nmain :: IO ()\nmain = do\n    let n = 5\n    putStrLn $ \"La factorielle de \" ++ show n ++ \" est : \" ++ show (factorial n)"
  },
  {
    "title": "Génération de nombres premiers en Go",
    "description": "Cet exemple montre comment générer des nombres premiers en Go jusqu'à une limite donnée.",
    "code": "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\nfunc generatePrimes(limit int) []int {\n    primes := []int{}\n    for i := 2; i <= limit; i++ {\n        isPrime := true\n        for j := 2; j <= int(math.Sqrt(float64(i))); j++ {\n            if i%j == 0 {\n                isPrime = false\n                break\n            }\n        }\n        if isPrime {\n            primes = append(primes, i)\n        }\n    }\n    return primes\n}\n\nfunc main() {\n    limit := 30\n    primeNumbers := generatePrimes(limit)\n    fmt.Printf(\"Nombres premiers jusqu'à %d : %v\\n\", limit, primeNumbers)\n}"
  },
  {
    "title": "Calcul de la moyenne des éléments d'une liste en Scala",
    "description": "Cet exemple montre comment calculer la moyenne des éléments d'une liste en Scala.",
    "code": "object Main extends App {\n    val numbers = List(5, 10, 8, 15, 3)\n    val sum = numbers.sum\n    val average = sum.toDouble / numbers.length\n    println(s\"La moyenne des éléments de la liste est : $average\")\n}"
  },
  {
    "title": "Vérification si un nombre est un nombre premier en Kotlin",
    "description": "Cet exemple montre comment vérifier si un nombre est un nombre premier en Kotlin.",
    "code": "fun isPrime(number: Int): Boolean {\n    if (number <= 1) return false\n    for (i in 2 until number) {\n        if (number % i == 0) return false\n    }\n    return true\n}\n\nfun main() {\n    val num = 17\n    if (isPrime(num)) {\n        println(\"$num est un nombre premier\")\n    } else {\n        println(\"$num n'est pas un nombre premier\")\n    }\n}"
  },
  {
    "title": "Calcul du nombre de voyelles dans une chaîne de caractères en C++",
    "description": "Cet exemple montre comment calculer le nombre de voyelles dans une chaîne de caractères en C++.",
    "code": "#include <iostream>\n#include <string>\n\nint countVowels(const std::string& str) {\n    int count = 0;\n    for (char c : str) {\n        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {\n            count++;\n        }\n    }\n    return count;\n}\n\nint main() {\n    std::string inputString = \"Hello, world!\";\n    int numVowels = countVowels(inputString);\n    std::cout << \"Le nombre de voyelles dans la chaîne est : \" << numVowels << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Requête SQL pour récupérer les noms et les salaires des employés",
    "description": "Cet exemple montre une requête SQL pour récupérer les noms et les salaires des employés à partir d'une table d'employés.",
    "code": "SELECT name, salary FROM employees;"
  },
  {
    "title": "Recherche du plus grand élément dans un tableau en Perl",
    "description": "Cet exemple montre comment rechercher le plus grand élément dans un tableau en Perl.",
    "code": "use List::Util qw(max);\n\nmy @array = (5, 10, 8, 15, 3);\nmy $max_value = max(@array);\nprint \"Le plus grand élément dans le tableau est : $max_value\\n\";"
  },
  {
    "title": "Calcul de la somme des éléments d'une liste en Lua",
    "description": "Cet exemple montre comment calculer la somme des éléments d'une liste en Lua.",
    "code": "function sumList(list)\n    local sum = 0\n    for _, value in ipairs(list) do\n        sum = sum + value\n    end\n    return sum\nend\n\nlocal myList = {5, 10, 8, 15, 3}\nlocal totalSum = sumList(myList)\nprint('La somme des éléments de la liste est : ' .. totalSum)"
  },
  {
    "title": "Recherche de fichiers avec une extension spécifique en Bash",
    "description": "Cet exemple montre comment rechercher des fichiers avec une extension spécifique dans un répertoire en Bash.",
    "code": "#!/bin/bash\n\n# Répertoire à rechercher\ndirectory=\"/chemin/vers/le/repertoire\"\n# Extension des fichiers à rechercher\nextension=\".txt\"\n\n# Recherche des fichiers avec l'extension spécifiée\nfoundFiles=$(find \"$directory\" -type f -name \"*${extension}\")\n\n# Affichage des fichiers trouvés\necho \"Fichiers avec l'extension $extension :\"\nfor file in $foundFiles; do\n    echo $file\ndone"
  },
  {
    "title": "Vérification si une chaîne est un palindrome en TypeScript",
    "description": "Cet exemple montre comment vérifier si une chaîne est un palindrome en TypeScript.",
    "code": "function isPalindrome(str: string): boolean {\n    str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');\n    return str === str.split('').reverse().join('');\n}\n\nconst inputString: string = 'A man, a plan, a canal, Panama!';\nif (isPalindrome(inputString)) {\n    console.log(`${inputString} est un palindrome.`);\n} else {\n    console.log(`${inputString} n'est pas un palindrome.`);\n}"
  },
  {
    "title": "Calcul de la moyenne des éléments d'une liste en Dart",
    "description": "Cet exemple montre comment calculer la moyenne des éléments d'une liste en Dart.",
    "code": "void main() {\n  List<int> numbers = [5, 10, 8, 15, 3];\n  int sum = numbers.reduce((a, b) => a + b);\n  double average = sum / numbers.length;\n  print('La moyenne des éléments de la liste est : \$average');\n}"
  },
  {
    "title": "Vérification si une liste est un palindrome en Prolog",
    "description": "Cet exemple montre comment vérifier si une liste est un palindrome en Prolog.",
    "code": "reverse_list([], []).\nreverse_list([H|T], R) :-\n    reverse_list(T, RT),\n    append(RT, [H], R).\n\npalindrome(List) :-\n    reverse_list(List, List).\n\n% Exemple d'utilisation\n\n?- palindrome([a, b, c, b, a]).\ntrue."
  },
  {
    "title": "Calcul de la somme des éléments d'un tableau en BASIC",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un tableau en BASIC.",
    "code": "DIM numbers(5)\nnumbers(1) = 5\nnumbers(2) = 10\nnumbers(3) = 8\nnumbers(4) = 15\nnumbers(5) = 3\nsum = 0\nFOR i = 1 TO 5\n    sum = sum + numbers(i)\nNEXT i\nPRINT 'La somme des éléments du tableau est : '; sum"
  },
  {
    "title": "Calcul de la factorielle d'un nombre en VBA",
    "description": "Cet exemple montre comment calculer la factorielle d'un nombre en Visual Basic for Applications (VBA).",
    "code": "Function Factorial(n As Integer) As Long\n    If n <= 1 Then\n        Factorial = 1\n    Else\n        Factorial = n * Factorial(n - 1)\n    End If\nEnd Function\n\nSub Main()\n    Dim num As Integer\n    num = 5\n    MsgBox 'La factorielle de ' & num & ' est : ' & Factorial(num)\nEnd Sub"
  },
  {
    "title": "Recherche du plus grand élément dans un tableau en QBASIC",
    "description": "Cet exemple montre comment rechercher le plus grand élément dans un tableau en QBASIC.",
    "code": "DIM numbers(5)\nnumbers(1) = 5\nnumbers(2) = 10\nnumbers(3) = 8\nnumbers(4) = 15\nnumbers(5) = 3\nmaxValue = numbers(1)\nFOR i = 2 TO 5\n    IF numbers(i) > maxValue THEN\n        maxValue = numbers(i)\n    END IF\nNEXT i\nPRINT 'Le plus grand élément dans le tableau est : '; maxValue"
  },
  {
    "title": "Calcul de la moyenne des éléments d'un tableau en FreeBASIC",
    "description": "Cet exemple montre comment calculer la moyenne des éléments d'un tableau en FreeBASIC.",
    "code": "DIM numbers(5)\nnumbers(1) = 5\nnumbers(2) = 10\nnumbers(3) = 8\nnumbers(4) = 15\nnumbers(5) = 3\nsum = 0\nFOR i = 1 TO 5\n    sum = sum + numbers(i)\nNEXT i\naverage = sum / 5\nPRINT 'La moyenne des éléments du tableau est : '; average"
  },
  {
    "title": "Calcul de la puissance d'un nombre en GWBASIC",
    "description": "Cet exemple montre comment calculer la puissance d'un nombre en GWBASIC.",
    "code": "INPUT 'Entrez la base : ', base\nINPUT 'Entrez l'exposant : ', exponent\nresult = base ^ exponent\nPRINT 'Le résultat de ', base, ' à la puissance ', exponent, ' est : '; result"
  },
  {
    "title": "Affichage de \"Hello, World!\" en Commodore BASIC (Commodore 64)",
    "description": "Cet exemple montre comment afficher \"Hello, World!\" en Commodore BASIC pour le Commodore 64.",
    "code": "10 PRINT \"HELLO, WORLD!\"\n20 END"
  },
  {
    "title": "Calcul de la somme des éléments d'un tableau en Apple BASIC (Apple II)",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un tableau en Apple BASIC pour l'Apple II.",
    "code": "10 DIM NUMBERS(5)\n20 NUMBERS(1) = 5\n30 NUMBERS(2) = 10\n40 NUMBERS(3) = 8\n50 NUMBERS(4) = 15\n60 NUMBERS(5) = 3\n70 SUM = 0\n80 FOR I = 1 TO 5\n90     SUM = SUM + NUMBERS(I)\n100 NEXT I\n110 PRINT \"La somme des éléments du tableau est : \"; SUM"
  },
  {
    "title": "Vérification si un nombre est un nombre premier en BBC BASIC (BBC Micro)",
    "description": "Cet exemple montre comment vérifier si un nombre est un nombre premier en BBC BASIC pour le BBC Micro.",
    "code": "10 INPUT \"Entrez un nombre : \", N\n20 IF N < 2 THEN PRINT N; \" n'est pas un nombre premier\": END\n30 FOR I = 2 TO INT(SQR(N))\n40     IF N MOD I = 0 THEN PRINT N; \" n'est pas un nombre premier\": END\n50 NEXT I\n60 PRINT N; \" est un nombre premier\""
  },
  {
    "title": "Calcul de la factorielle d'un nombre en TRS-80 Level II BASIC (TRS-80 Model III)",
    "description": "Cet exemple montre comment calculer la factorielle d'un nombre en TRS-80 Level II BASIC pour le TRS-80 Model III.",
    "code": "10 INPUT \"Entrez un nombre : \", N\n20 IF N < 0 THEN PRINT \"Impossible de calculer la factorielle d'un nombre négatif\": END\n30 FACT = 1\n40 FOR I = 2 TO N\n50     FACT = FACT * I\n60 NEXT I\n70 PRINT \"La factorielle de \"; N; \" est : \"; FACT"
  },
  {
    "title": "Affichage d'un message avec attente de l'utilisateur en Sinclair BASIC (ZX Spectrum)",
    "description": "Cet exemple montre comment afficher un message avec une attente de l'utilisateur en Sinclair BASIC pour le ZX Spectrum.",
    "code": "10 PRINT \"Bonjour, veuillez appuyer sur une touche pour continuer...\"\n20 PAUSE\n30 PRINT \"Merci!\""
  },
  {
    "title": "Calcul de la somme des éléments d'un tableau en COBOL",
    "description": "Cet exemple montre comment calculer la somme des éléments d'un tableau en COBOL.",
    "code": "IDENTIFICATION DIVISION.\nPROGRAM-ID. SumArray.\nDATA DIVISION.\nWORKING-STORAGE SECTION.\n01 Numbers PIC 9(3) OCCURS 5 TIMES VALUE 5, 10, 8, 15, 3.\n01 Sum PIC 9(4) VALUE 0.\nPROCEDURE DIVISION.\n    PERFORM VARYING I FROM 1 BY 1 UNTIL I > 5\n        ADD Numbers(I) TO Sum\n    END-PERFORM.\n    DISPLAY 'La somme des éléments du tableau est : ', Sum.\n    STOP RUN."
  },
  {
    "title": "Vérification si un nombre est pair ou impair en Ada",
    "description": "Cet exemple montre comment vérifier si un nombre est pair ou impair en Ada.",
    "code": "WITH Ada.Text_IO;\nUSE Ada.Text_IO;\n\nPROCEDURE Main IS\n    Number : INTEGER;\nBEGIN\n    Put_Line('Entrez un nombre : ');\n    Get(Number);\n    IF Number MOD 2 = 0 THEN\n        Put_Line(Number'Image & \" est un nombre pair.\");\n    ELSE\n        Put_Line(Number'Image & \" est un nombre impair.\");\n    END IF;\nEND Main;"
  },
  {
    "title": "Vérification si une année est bissextile en Pascal",
    "description": "Cet exemple montre comment vérifier si une année est bissextile en Pascal.",
    "code": "program LeapYear;\nvar\n    year: integer;\nbegin\n    write('Entrez une année : ');\n    readln(year);\n    if ((year mod 4 = 0) and (year mod 100 <> 0)) or (year mod 400 = 0) then\n        writeln(year, ' est une année bissextile.')\n    else\n        writeln(year, ' n\'est pas une année bissextile.');\nend."
  },
  {
    "title": "Utilisation de la Bibliothèque Algorithmique en C++",
    "description": "Exemple d'utilisation de la bibliothèque algorithmique en C++ pour trier un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {5, 10, 3, 8, 1};\n    std::sort(numbers.begin(), numbers.end());\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Implémentation de l'Algorithme de Recherche Binaire en C++",
    "description": "Exemple d'implémentation de l'algorithme de recherche binaire en C++ pour rechercher un élément dans un tableau trié.",
    "code": "#include <iostream>\n#include <vector>\n\nint binarySearch(const std::vector<int>& arr, int target) {\n    int left = 0;\n    int right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) {\n            return mid;\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1;\n}\n\nint main() {\n    std::vector<int> arr = {1, 3, 5, 7, 9};\n    int target = 5;\n    int index = binarySearch(arr, target);\n    if (index != -1) {\n        std::cout << \"L'élément \" << target << \" est présent à l'index \" << index << std::endl;\n    } else {\n        std::cout << \"L'élément \" << target << \" n'est pas présent dans le tableau.\" << std::endl;\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Fonction Lambda en C++",
    "description": "Exemple d'utilisation de la fonction lambda en C++ pour trier un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {5, 10, 3, 8, 1};\n    std::sort(numbers.begin(), numbers.end(), [](int a, int b) { return a > b; });\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Fonctionnelle en C++",
    "description": "Exemple d'utilisation de la programmation fonctionnelle en C++ avec la fonction std::transform pour transformer un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3, 4, 5};\n    std::transform(numbers.begin(), numbers.end(), numbers.begin(), [](int n) { return n * 2; });\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Manipulation de Flux en C++",
    "description": "Exemple de manipulation de flux en C++ pour lire et afficher des données.",
    "code": "#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    std::ifstream file(\"data.txt\");\n    std::string line;\n    while (std::getline(file, line)) {\n        std::cout << line << std::endl;\n    }\n    file.close();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Thread en C++",
    "description": "Exemple d'utilisation de la bibliothèque de thread en C++ pour exécuter des tâches en parallèle.",
    "code": "#include <iostream>\n#include <thread>\n\nvoid task(int id) {\n    std::cout << \"Thread \" << id << \" : Hello, World!\" << std::endl;\n}\n\nint main() {\n    std::thread t1(task, 1);\n    std::thread t2(task, 2);\n    t1.join();\n    t2.join();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Gestion d'Exceptions en C++",
    "description": "Exemple d'utilisation de la gestion d'exceptions en C++ avec try-catch pour gérer les erreurs.",
    "code": "#include <iostream>\n\nint main() {\n    try {\n        int x = 10;\n        int y = 0;\n        if (y == 0) {\n            throw \"Division par zéro\";\n        }\n        int result = x / y;\n        std::cout << \"Résultat : \" << result << std::endl;\n    } catch (const char* msg) {\n        std::cerr << \"Erreur : \" << msg << std::endl;\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Orientée Objet en C++",
    "description": "Exemple d'utilisation de la programmation orientée objet (POO) en C++ avec la définition d'une classe Point.",
    "code": "#include <iostream>\n\nclass Point {\nprivate:\n    int x, y;\npublic:\n    Point(int x, int y) : x(x), y(y) {}\n    int getX() const { return x; }\n    int getY() const { return y; }\n};\n\nint main() {\n    Point p(3, 5);\n    std::cout << \"Coordonnées : (\" << p.getX() << \", \" << p.getY() << \")\" << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Manipulation de Fichiers en C++",
    "description": "Exemple de manipulation de fichiers en C++ pour lire des données depuis un fichier texte.",
    "code": "#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    std::ifstream file(\"input.txt\");\n    std::string line;\n    while (std::getline(file, line)) {\n        std::cout << line << std::endl;\n    }\n    file.close();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Généricité en C++",
    "description": "Exemple d'utilisation de la généricité en C++ avec les templates pour définir une fonction générique d'échange.",
    "code": "#include <iostream>\n\ntemplate<typename T>\nvoid swap(T& a, T& b) {\n    T temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    std::cout << \"Avant l'échange : x = \" << x << \", y = \" << y << std::endl;\n    swap(x, y);\n    std::cout << \"Après l'échange : x = \" << x << \", y = \" << y << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Conteneurs en C++",
    "description": "Exemple d'utilisation de la bibliothèque de conteneurs en C++ avec un vecteur pour stocker des entiers.",
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3, 4, 5};\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Manipulation de la Date en C++",
    "description": "Exemple de manipulation de la date en C++ avec la bibliothèque <ctime> pour afficher la date actuelle.",
    "code": "#include <iostream>\n#include <ctime>\n\nint main() {\n    time_t now = time(0);\n    tm* timeinfo = localtime(&now);\n    std::cout << \"Date actuelle : \" << (timeinfo->tm_year + 1900) << '-' << (timeinfo->tm_mon + 1) << '-' << timeinfo->tm_mday << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Réflexion Avancée en C++",
    "description": "Exemple d'utilisation de la réflexion avancée en C++ avec la bibliothèque <type_traits> pour vérifier le type d'une variable.",
    "code": "#include <iostream>\n#include <type_traits>\n\nint main() {\n    int num = 10;\n    if (std::is_integral<decltype(num)>::value) {\n        std::cout << \"num est un type entier.\" << std::endl;\n    } else {\n        std::cout << \"num n'est pas un type entier.\" << std::endl;\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de l'Opérateur de Surcharge en C++",
    "description": "Exemple d'utilisation de l'opérateur de surcharge en C++ avec une classe Fraction pour l'addition de fractions.",
    "code": "#include <iostream>\n\nclass Fraction {\nprivate:\n    int numerator, denominator;\npublic:\n    Fraction(int n, int d) : numerator(n), denominator(d) {}\n    Fraction operator+(const Fraction& other) {\n        int num = numerator * other.denominator + other.numerator * denominator;\n        int den = denominator * other.denominator;\n        return Fraction(num, den);\n    }\n    void display() {\n        std::cout << numerator << '/' << denominator << std::endl;\n    }\n};\n\nint main() {\n    Fraction f1(1, 2);\n    Fraction f2(1, 3);\n    Fraction result = f1 + f2;\n    result.display();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Lambda en C++",
    "description": "Exemple d'utilisation de la programmation lambda en C++ pour trier un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {5, 10, 3, 8, 1};\n    std::sort(numbers.begin(), numbers.end(), [](int a, int b) { return a > b; });\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque d'Entrées/Sorties en C++",
    "description": "Exemple d'utilisation de la bibliothèque d'entrées/sorties en C++ avec std::cin et std::cout pour lire et afficher des données.",
    "code": "#include <iostream>\n\nint main() {\n    int num;\n    std::cout << \"Entrez un nombre : \";\n    std::cin >> num;\n    std::cout << \"Vous avez saisi : \" << num << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque Algorithmique en C++",
    "description": "Exemple d'utilisation de la bibliothèque algorithmique en C++ pour trier un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {5, 10, 3, 8, 1};\n    std::sort(numbers.begin(), numbers.end());\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Manipulation de la Chaîne en C++",
    "description": "Exemple de manipulation de chaîne en C++ pour obtenir la longueur d'une chaîne.",
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string str = \"Hello, World!\";\n    int length = str.length();\n    std::cout << \"Longueur de la chaîne : \" << length << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Allocation Dynamique en C++",
    "description": "Exemple d'allocation dynamique en C++ pour un tableau d'entiers.",
    "code": "#include <iostream>\n\nint main() {\n    int* arr = new int[5];\n    for (int i = 0; i < 5; ++i) {\n        arr[i] = i + 1;\n    }\n    for (int i = 0; i < 5; ++i) {\n        std::cout << arr[i] << ' ';\n    }\n    std::cout << '\\n';\n    delete[] arr;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Pointeurs en C++",
    "description": "Exemple d'utilisation de pointeurs en C++ pour manipuler la mémoire et accéder aux adresses des variables.",
    "code": "#include <iostream>\n\nint main() {\n    int num = 10;\n    int* ptr = &num;\n    std::cout << \"Contenu de la variable : \" << num << std::endl;\n    std::cout << \"Adresse de la variable : \" << ptr << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Structures de Contrôle en C++",
    "description": "Exemple d'utilisation des structures de contrôle en C++ avec une boucle while pour afficher les nombres de 1 à 10.",
    "code": "#include <iostream>\n\nint main() {\n    int i = 1;\n    while (i <= 10) {\n        std::cout << i << ' ';\n        ++i;\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Allocation de Mémoire en C++",
    "description": "Exemple d'allocation de mémoire en C++ pour un seul entier.",
    "code": "#include <iostream>\n\nint main() {\n    int* ptr = new int;\n    *ptr = 10;\n    std::cout << \"Contenu de la variable : \" << *ptr << std::endl;\n    delete ptr;\n    return 0;\n}"
  },
  {
    "title": "Lecture de Fichier en C++",
    "description": "Exemple de lecture d'un fichier en C++ pour afficher son contenu.",
    "code": "#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    std::ifstream file(\"data.txt\");\n    std::string line;\n    while (std::getline(file, line)) {\n        std::cout << line << std::endl;\n    }\n    file.close();\n    return 0;\n}"
  },
  {
    "title": "Utilisation de Classes Abstraites en C++",
    "description": "Exemple d'utilisation de classes abstraites et de fonctions virtuelles en C++ pour la création d'une classe de forme.",
    "code": "#include <iostream>\n\nclass Shape {\npublic:\n    virtual void draw() = 0;\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() override {\n        std::cout << \"Dessiner un cercle\" << std::endl;\n    }\n};\n\nclass Rectangle : public Shape {\npublic:\n    void draw() override {\n        std::cout << \"Dessiner un rectangle\" << std::endl;\n    }\n};\n\nint main() {\n    Circle circle;\n    Rectangle rectangle;\n    Shape* shapes[] = {&circle, &rectangle};\n    for (Shape* shape : shapes) {\n        shape->draw();\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Fonctionnelle en C++",
    "description": "Exemple d'utilisation de la programmation fonctionnelle en C++ avec la fonction std::transform pour transformer un vecteur d'entiers.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3, 4, 5};\n    std::transform(numbers.begin(), numbers.end(), numbers.begin(), [](int n) { return n * 2; });\n    for (int num : numbers) {\n        std::cout << num << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Chronométrage en C++",
    "description": "Exemple d'utilisation de la bibliothèque de chronométrage en C++ pour mesurer le temps d'exécution d'un programme.",
    "code": "#include <iostream>\n#include <chrono>\n\nint main() {\n    auto start = std::chrono::high_resolution_clock::now();\n    // Code à mesurer\n    auto end = std::chrono::high_resolution_clock::now();\n    std::chrono::duration<double> duration = end - start;\n    std::cout << \"Temps d'exécution : \" << duration.count() << \" secondes\" << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Gestion des Exceptions en C++",
    "description": "Exemple d'utilisation de la gestion des exceptions en C++ avec try-catch pour gérer les erreurs lors de la conversion de chaînes en entiers.",
    "code": "#include <iostream>\n#include <stdexcept>\n\nint main() {\n    try {\n        std::string str = \"abc\";\n        int num = std::stoi(str);\n        std::cout << \"Entier : \" << num << std::endl;\n    } catch (const std::invalid_argument& e) {\n        std::cerr << \"Erreur : \" << e.what() << std::endl;\n    }\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Bibliothèque de Numéros Aléatoires en C++",
    "description": "Exemple d'utilisation de la bibliothèque de génération de nombres aléatoires en C++ pour générer un nombre aléatoire entre 1 et 100.",
    "code": "#include <iostream>\n#include <random>\n\nint main() {\n    std::random_device rd;\n    std::mt19937 gen(rd());\n    std::uniform_int_distribution<int> dis(1, 100);\n    int random_num = dis(gen);\n    std::cout << \"Nombre aléatoire : \" << random_num << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Utilisation de la Programmation Concurrente en C++",
    "description": "Exemple d'utilisation de la programmation concurrente en C++ avec les threads et les mutex pour réaliser une tâche en parallèle.",
    "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n\nstd::mutex mtx;\nint shared_data = 0;\n\nvoid task(int id) {\n    for (int i = 0; i < 10000; ++i) {\n        mtx.lock();\n        shared_data++;\n        mtx.unlock();\n    }\n}\n\nint main() {\n    std::thread t1(task, 1);\n    std::thread t2(task, 2);\n    t1.join();\n    t2.join();\n    std::cout << \"Données partagées : \" << shared_data << std::endl;\n    return 0;\n}"
  },
  {
    "title": "Classe en JavaScript",
    "description": "Exemple d'une classe en JavaScript représentant un utilisateur.",
    "code": "class Utilisateur {\n    constructor(nom, age) {\n        this.nom = nom;\n        this.age = age;\n    }\n    afficherDetails() {\n        console.log(`Nom: ${this.nom}, Age: ${this.age}`);\n    }\n}\n\nconst utilisateur1 = new Utilisateur('Alice', 25);\nutilisateur1.afficherDetails();"
  },
  {
    "title": "Manipulation de Fichier en JavaScript",
    "description": "Exemple de manipulation de fichier en JavaScript côté client.",
    "code": "// Création d'un objet File\nconst fichier = new File(['Contenu du fichier'], 'exemple.txt');\n\n// Lecture du contenu du fichier\nconst reader = new FileReader();\nreader.onload = function(event) {\n    console.log('Contenu du fichier:', event.target.result);\n};\nreader.readAsText(fichier);"
  },
  {
    "title": "Gestion d'Exceptions en Java",
    "description": "Exemple de gestion d'exceptions en Java avec une division par zéro.",
    "code": "public class GestionExceptions {\n    public static void main(String[] args) {\n        try {\n            int resultat = 10 / 0;\n            System.out.println('Résultat : ' + resultat);\n        } catch (ArithmeticException e) {\n            System.out.println('Erreur : Division par zéro');\n        }\n    }\n}"
  },
  {
    "title": "Fonctions Fléchées en JavaScript",
    "description": "Exemple de l'utilisation des fonctions fléchées en JavaScript.",
    "code": "// Fonction normale\nfunction add(a, b) {\n    return a + b;\n}\n\n// Fonction fléchée\nconst addition = (a, b) => a + b;\n\nconsole.log(add(5, 3)); // Affiche 8\nconsole.log(addition(5, 3)); // Affiche 8"
  },
  {
    "title": "Création de Classe abstraite en Java",
    "description": "Exemple de création d'une classe abstraite en Java.",
    "code": "abstract class Figure {\n    abstract double calculerSurface();\n}\n\nclass Rectangle extends Figure {\n    double longueur, largeur;\n    Rectangle(double longueur, double largeur) {\n        this.longueur = longueur;\n        this.largeur = largeur;\n    }\n    double calculerSurface() {\n        return longueur * largeur;\n    }\n}"
  },
  {
    "title": "Utilisation de Promesses en JavaScript",
    "description": "Exemple de l'utilisation de Promesses en JavaScript.",
    "code": "function obtenirDonnees() {\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            resolve('Données récupérées avec succès');\n        }, 2000);\n    });\n}\n\nobtenirDonnees()\n    .then((resultat) => {\n        console.log(resultat);\n    })\n    .catch((erreur) => {\n        console.error('Erreur :', erreur);\n    });"
  },
  {
    "title": "Héritage de Classe en Java",
    "description": "Exemple de l'héritage de classe en Java.",
    "code": "class Forme {\n    void afficherType() {\n        System.out.println('Je suis une forme.');\n    }\n}\n\nclass Rectangle extends Forme {\n    void afficherType() {\n        System.out.println('Je suis un rectangle.');\n    }\n}\n\nRectangle rectangle = new Rectangle();\nrectangle.afficherType(); // Affiche 'Je suis un rectangle.'"
  },
  {
    "title": "Utilisation de Module en JavaScript",
    "description": "Exemple de l'utilisation de module en JavaScript avec import/export.",
    "code": "// Fichier module1.js\nexport function direBonjour() {\n    console.log('Bonjour');\n}\n\n// Fichier module2.js\nimport { direBonjour } from './module1.js';\n\ndireBonjour(); // Affiche 'Bonjour'"
  },
  {
    "title": "Manipulation de Fichier en Java",
    "description": "Exemple de manipulation de fichier en Java pour lire et écrire des données.",
    "code": "import java.io.File;\nimport java.io.FileWriter;\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class ManipulationFichier {\n    public static void main(String[] args) {\n        try {\n            File fichier = new File('donnees.txt');\n            FileWriter writer = new FileWriter(fichier);\n            writer.write('Contenu du fichier');\n            writer.close();\n\n            FileReader reader = new FileReader(fichier);\n            int caractere;\n            while ((caractere = reader.read()) != -1) {\n                System.out.print((char) caractere);\n            }\n            reader.close();\n        } catch (IOException e) {\n            System.out.println('Erreur : ' + e.getMessage());\n        }\n    }\n}"
  },
  {
    "title": "Utilisation de Map en JavaScript",
    "description": "Exemple de l'utilisation de l'objet Map en JavaScript pour stocker des clés et des valeurs.",
    "code": "// Création d'un objet Map\nconst fruits = new Map();\n\n// Ajout d'éléments\nfruits.set('pomme', 5);\nfruits.set('banane', 3);\n\n// Récupération de la valeur\nconsole.log(fruits.get('pomme')); // Affiche 5\n\n// Vérification de l'existence d'une clé\nconsole.log(fruits.has('banane')); // Affiche true\n\n// Suppression d'un élément\nfruits.delete('pomme');\nconsole.log(fruits); // Affiche Map(1) { 'banane' => 3 }"
  },
  {
    "title": "Utilisation de l'Opérateur Spread en JavaScript",
    "description": "Exemple de l'utilisation de l'opérateur spread en JavaScript pour fusionner des tableaux.",
    "code": "// Fusion de tableaux\nconst tableau1 = [1, 2, 3];\nconst tableau2 = [4, 5, 6];\nconst tableauFusionne = [...tableau1, ...tableau2];\nconsole.log(tableauFusionne); // Affiche [1, 2, 3, 4, 5, 6]"
  },
  {
    "title": "Utilisation de l'Opérateur Ternaire en JavaScript",
    "description": "Exemple de l'utilisation de l'opérateur ternaire en JavaScript pour une condition simple.",
    "code": "// Exemple d'opérateur ternaire\nconst age = 20;\nconst estMajeur = age >= 18 ? 'Majeur' : 'Mineur';\nconsole.log(estMajeur); // Affiche 'Majeur'"
  },
  {
    "title": "Utilisation de l'API Fetch en JavaScript",
    "description": "Exemple de l'utilisation de l'API Fetch pour effectuer une requête GET.",
    "code": "fetch('https://api.exemple.com/donnees')\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.error('Erreur :', error));"
  },
  {
    "title": "Gestion de la Date en JavaScript",
    "description": "Exemple de manipulation de date en JavaScript pour afficher la date actuelle.",
    "code": "// Obtention de la date actuelle\nconst dateActuelle = new Date();\nconsole.log('Date actuelle :', dateActuelle);"
  },
  {
    "title": "Utilisation de Set en JavaScript",
    "description": "Exemple de l'utilisation de l'objet Set en JavaScript pour stocker des valeurs uniques.",
    "code": "// Création d'un objet Set\nconst ensemble = new Set();\n\n// Ajout d'éléments\nensemble.add(1);\nensemble.add(2);\nensemble.add(3);\nensemble.add(1); // Ignoré car déjà présent\n\nconsole.log(ensemble); // Affiche Set(3) { 1, 2, 3 }"
  },
  {
    "title": "Validation de Formulaire en JavaScript",
    "description": "Exemple de validation de formulaire en JavaScript avant soumission.",
    "code": "// Sélection du formulaire\nconst formulaire = document.querySelector('#monFormulaire');\n\n// Écouteur d'événement pour la soumission du formulaire\nformulaire.addEventListener('submit', function(event) {\n    // Validation des champs\n    const champNom = document.querySelector('#nom');\n    if (champNom.value === '') {\n        alert('Veuillez saisir votre nom.');\n        event.preventDefault(); // Empêche la soumission du formulaire\n    }\n});"
  },
  {
    "title": "Utilisation de l'API localStorage en JavaScript",
    "description": "Exemple de stockage de données dans le navigateur en utilisant l'API localStorage.",
    "code": "// Stockage de données\nlocalStorage.setItem('nomUtilisateur', 'Alice');\n\n// Récupération de données\nconst nomUtilisateur = localStorage.getItem('nomUtilisateur');\nconsole.log('Nom d\'utilisateur :', nomUtilisateur);"
  },
  {
    "title": "Utilisation de l'API setInterval en JavaScript",
    "description": "Exemple de l'utilisation de la fonction setInterval pour exécuter une fonction à intervalles réguliers.",
    "code": "// Exécution de la fonction toutes les 2 secondes\nconst intervalID = setInterval(function() {\n    console.log('Exécution de la fonction');\n}, 2000);\n\n// Arrêt de l'exécution après 10 secondes\nsetTimeout(function() {\n    clearInterval(intervalID);\n}, 10000);"
  },
  {
    "title": "Manipulation de Fichiers en Node.js",
    "description": "Exemple de lecture et écriture de fichiers en utilisant Node.js.",
    "code": "const fs = require('fs');\n\n// Lecture de fichier\nfs.readFile('fichier.txt', 'utf8', function(err, data) {\n    if (err) {\n        console.error('Erreur de lecture :', err);\n        return;\n    }\n    console.log('Contenu du fichier :', data);\n});\n\n// Écriture dans fichier\nfs.writeFile('nouveauFichier.txt', 'Contenu du nouveau fichier', function(err) {\n    if (err) {\n        console.error('Erreur d\'écriture :', err);\n        return;\n    }\n    console.log('Fichier créé avec succès.');\n});"
  },
  {
    "title": "Utilisation de l'API Map en Java",
    "description": "Exemple de l'utilisation de l'interface Map en Java pour stocker des paires clé-valeur.",
    "code": "import java.util.Map;\nimport java.util.HashMap;\n\npublic class UtilisationMap {\n    public static void main(String[] args) {\n        // Création d'un objet Map\n        Map<String, Integer> map = new HashMap<>();\n\n        // Ajout d'éléments\n        map.put('a', 1);\n        map.put('b', 2);\n\n        // Affichage des éléments\n        for (Map.Entry<String, Integer> entry : map.entrySet()) {\n            System.out.println(entry.getKey() + ' : ' + entry.getValue());\n        }\n    }\n}"
  },
  {
    "title": "Utilisation de l'API Set en Java",
    "description": "Exemple de l'utilisation de l'interface Set en Java pour stocker des éléments uniques.",
    "code": "import java.util.Set;\nimport java.util.HashSet;\n\npublic class UtilisationSet {\n    public static void main(String[] args) {\n        // Création d'un objet Set\n        Set<Integer> ensemble = new HashSet<>();\n\n        // Ajout d'éléments\n        ensemble.add(1);\n        ensemble.add(2);\n        ensemble.add(1); // Ignoré car déjà présent\n\n        // Affichage des éléments\n        for (int element : ensemble) {\n            System.out.println(element);\n        }\n    }\n}"
  },
  {
    "title": "Utilisation de l'API FileReader en JavaScript",
    "description": "Exemple de l'utilisation de l'API FileReader en JavaScript pour lire le contenu d'un fichier.",
    "code": "// Sélection du fichier\nconst fichier = document.querySelector('input[type=file]').files[0];\n\n// Création de l'objet FileReader\nconst reader = new FileReader();\n\n// Lecture du contenu du fichier\nreader.onload = function(event) {\n    console.log('Contenu du fichier :', event.target.result);\n};\nreader.readAsText(fichier);"
  },
  {
    "title": "Utilisation de l'API Math en JavaScript",
    "description": "Exemple de l'utilisation de l'objet Math en JavaScript pour effectuer des opérations mathématiques.",
    "code": "// Exemple d'opérations mathématiques\nconst nombre = 5;\nconsole.log('Racine carrée de', nombre, ':', Math.sqrt(nombre));\nconsole.log('Valeur absolue de', -10, ':', Math.abs(-10));\nconsole.log('Valeur arrondie de', 4.6, ':', Math.round(4.6));"
  },
  {
    "title": "Utilisation de l'API Date en Java",
    "description": "Exemple de manipulation de dates en utilisant l'API Date en Java.",
    "code": "import java.util.Date;\n\npublic class UtilisationDate {\n    public static void main(String[] args) {\n        // Obtention de la date actuelle\n        Date dateActuelle = new Date();\n        System.out.println('Date actuelle : ' + dateActuelle);\n    }\n}"
  },
  {
    "title": "Utilisation de l'API Math en Java",
    "description": "Exemple de l'utilisation de l'API Math en Java pour effectuer des opérations mathématiques.",
    "code": "public class UtilisationMath {\n    public static void main(String[] args) {\n        double nombre = 4.6;\n        System.out.println('Racine carrée de ' + nombre + ' : ' + Math.sqrt(nombre));\n        System.out.println('Valeur absolue de -10 : ' + Math.abs(-10));\n        System.out.println('Valeur arrondie de 4.6 : ' + Math.round(4.6));\n    }\n}"
  },
  {
    "title": "Utilisation de l'API Timer en Java",
    "description": "Exemple de l'utilisation de l'API Timer en Java pour planifier des tâches à exécuter à intervalles réguliers.",
    "code": "import java.util.Timer;\nimport java.util.TimerTask;\n\npublic class UtilisationTimer {\n    public static void main(String[] args) {\n        Timer timer = new Timer();\n        TimerTask tache = new TimerTask() {\n            public void run() {\n                System.out.println('Exécution de la tâche.');\n            }\n        };\n        timer.schedule(tache, 2000, 2000); // Exécution toutes les 2 secondes après un délai initial de 2 secondes\n    }\n}"
  },
  {
    "title": "Utilisation de l'API Path en Java",
    "description": "Exemple de l'utilisation de l'API Path en Java pour manipuler des chemins de fichiers.",
    "code": "import java.nio.file.Path;\nimport java.nio.file.Paths;\n\npublic class UtilisationPath {\n    public static void main(String[] args) {\n        // Création d'un objet Path\n        Path chemin = Paths.get('chemin/vers/fichier.txt');\n\n        // Affichage du chemin\n        System.out.println('Chemin : ' + chemin);\n    }\n}"
  },
  {
    "title": "Utilisation de l'API File en Java",
    "description": "Exemple de l'utilisation de l'API File en Java pour manipuler des fichiers et des répertoires.",
    "code": "import java.io.File;\n\npublic class UtilisationFile {\n    public static void main(String[] args) {\n        // Création d'un objet File\n        File fichier = new File('chemin/vers/fichier.txt');\n\n        // Vérification de l'existence\n        if (fichier.exists()) {\n            System.out.println('Le fichier existe.');\n        } else {\n            System.out.println('Le fichier n\'existe pas.');\n        }\n    }\n}"
  },
  {
    "title": "Utilisation de l'API Random en Java",
    "description": "Exemple de l'utilisation de l'API Random en Java pour générer des nombres aléatoires.",
    "code": "import java.util.Random;\n\npublic class UtilisationRandom {\n    public static void main(String[] args) {\n        // Création d'un objet Random\n        Random random = new Random();\n\n        // Génération de nombres aléatoires\n        System.out.println('Nombre aléatoire : ' + random.nextInt(100));\n    }\n}"
  },
  {
    "title": "Utilisation de l'API RegExp en JavaScript",
    "description": "Exemple de l'utilisation de l'API RegExp en JavaScript pour rechercher des correspondances dans une chaîne de caractères.",
    "code": "// Utilisation de RegExp\nconst expression = /hello/i; // i pour ignorer la casse\nconst texte = 'Hello, World!';\nconsole.log(expression.test(texte)); // Affiche true"
  },
  {
    "title": "Utilisation de l'API Math.random() en JavaScript",
    "description": "Exemple de l'utilisation de l'API Math.random() en JavaScript pour générer des nombres aléatoires.",
    "code": "// Génération de nombres aléatoires entre 0 et 1\nconst nombreAleatoire = Math.random();\nconsole.log('Nombre aléatoire :', nombreAleatoire);"
  },
  {
    "title": "Utilisation de l'API Math.max() et Math.min() en JavaScript",
    "description": "Exemple de l'utilisation des fonctions Math.max() et Math.min() en JavaScript pour obtenir le maximum et le minimum d'un ensemble de valeurs.",
    "code": "// Obtenir le maximum\nconst maximum = Math.max(10, 20, 30);\nconsole.log('Maximum :', maximum);\n\n// Obtenir le minimum\nconst minimum = Math.min(10, 20, 30);\nconsole.log('Minimum :', minimum);"
  },
  {
    "title": "Utilisation de l'API Math.ceil() et Math.floor() en JavaScript",
    "description": "Exemple de l'utilisation des fonctions Math.ceil() et Math.floor() en JavaScript pour arrondir un nombre à l'entier supérieur et inférieur respectivement.",
    "code": "// Arrondir à l'entier supérieur\nconst arrondiSup = Math.ceil(4.3);\nconsole.log('Arrondi supérieur :', arrondiSup);\n\n// Arrondir à l'entier inférieur\nconst arrondiInf = Math.floor(4.7);\nconsole.log('Arrondi inférieur :', arrondiInf);"
  },
  {
    "title": "Utilisation de l'API Math.pow() en JavaScript",
    "description": "Exemple de l'utilisation de la fonction Math.pow() en JavaScript pour calculer une puissance.",
    "code": "// Calcul de puissance\nconst puissance = Math.pow(2, 3);\nconsole.log('2^3 :', puissance);"
  },
  {
    "title": "Utilisation de l'API Math.PI en JavaScript",
    "description": "Exemple de l'utilisation de la constante Math.PI en JavaScript pour obtenir la valeur de Pi.",
    "code": "// Obtenir la valeur de Pi\nconst pi = Math.PI;\nconsole.log('Pi :', pi);"
  },
  {
    "title": "Création d'une Page HTML de Base",
    "description": "Exemple d'une structure HTML de base avec les balises `<html>`, `<head>` et `<body>`.",
    "code": "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Titre de la page</title>\n</head>\n<body>\n    <h1>Contenu de la page</h1>\n    <p>Ceci est un paragraphe.</p>\n</body>\n</html>"
  },
  {
    "title": "Style de Texte",
    "description": "Exemple de style CSS pour modifier la couleur, la taille et la police de texte.",
    "code": "p {\n    color: blue;\n    font-size: 16px;\n    font-family: Arial, sans-serif;\n}"
},
{
  "title": "Style de Fond",
  "description": "Exemple de style CSS pour modifier la couleur et l'image de fond d'un élément.",
  "code": "body {\n    background-color: #f0f0f0;\n    background-image: url('background.jpg');\n    background-size: cover;\n}"
},
{
  "title": "Style de Bordure",
  "description": "Exemple de style CSS pour ajouter une bordure à un élément.",
  "code": "div {\n    border: 2px solid black;\n    border-radius: 5px;\n}"
},
{
  "title": "Mise en Page avec Flexbox",
  "description": "Exemple de style CSS pour créer une mise en page flexible avec Flexbox.",
  "code": ".conteneur {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}"
},
{
  "title": "Mise en Page avec Grid",
  "description": "Exemple de style CSS pour créer une mise en page avec Grid.",
  "code": ".conteneur {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 20px;\n}"
},
{
  "title": "Style de Liens",
  "description": "Exemple de style CSS pour personnaliser l'apparence des liens.",
  "code": "a {\n    color: blue;\n    text-decoration: none;\n}\na:hover {\n    text-decoration: underline;\n}"
},
{
  "title": "Style de Boutons",
  "description": "Exemple de style CSS pour personnaliser l'apparence des boutons.",
  "code": "button {\n    background-color: #4CAF50;\n    border: none;\n    color: white;\n    padding: 10px 20px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    cursor: pointer;\n    border-radius: 5px;\n}"
},
{
  "title": "Animations CSS",
  "description": "Exemple de style CSS pour créer une animation simple.",
  "code": "@keyframes exemple {\n    0% {opacity: 0;}\n    100% {opacity: 1;}\n}\ndiv {\n    animation: exemple 1s ease-in-out;\n}"
},
{
  "title": "Media Queries",
  "description": "Exemple d'utilisation des media queries en CSS pour rendre une page responsive.",
  "code": "@media only screen and (max-width: 600px) {\n    body {\n        background-color: lightblue;\n    }\n}"
},
{
  "title": "Style de Navigation",
  "description": "Exemple de style CSS pour créer une barre de navigation horizontale.",
  "code": "ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n    background-color: #333;\n}\n\nli {\n    float: left;\n}\n\nli a {\n    display: block;\n    color: white;\n    text-align: center;\n    padding: 14px 16px;\n    text-decoration: none;\n}\n\nli a:hover {\n    background-color: #111;\n}"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code PHP pour afficher du texte sur une page web.",
  "code": "<?php\n    echo 'Bonjour, monde !';\n?>"
},
{
  "title": "Variables en PHP",
  "description": "Exemple de déclaration et d'utilisation de variables en PHP.",
  "code": "<?php\n    $nom = 'Alice';\n    $age = 30;\n    echo 'Bonjour, je m\'appelle ' . $nom . ' et j\'ai ' . $age . ' ans.';\n?>"
},
{
  "title": "Opérateurs en PHP",
  "description": "Exemple d'utilisation des opérateurs arithmétiques, d'affectation et de concaténation en PHP.",
  "code": "<?php\n    $x = 10;\n    $y = 5;\n    $somme = $x + $y;\n    $produit = $x * $y;\n    echo 'Somme : ' . $somme . ', Produit : ' . $produit;\n?>"
},
{
  "title": "Structures de Contrôle - Condition IF",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en PHP.",
  "code": "<?php\n    $age = 20;\n    if ($age >= 18) {\n        echo 'Vous êtes majeur.';\n    } else {\n        echo 'Vous êtes mineur.';\n    }\n?>"
},
{
  "title": "Boucle FOR en PHP",
  "description": "Exemple d'utilisation d'une boucle FOR en PHP pour afficher les nombres de 1 à 5.",
  "code": "<?php\n    for ($i = 1; $i <= 5; $i++) {\n        echo $i . ' ';\n    }\n?>"
},
{
  "title": "Fonctions en PHP",
  "description": "Exemple de déclaration et d'appel de fonction en PHP.",
  "code": "<?php\n    function direBonjour($nom) {\n        echo 'Bonjour, ' . $nom . '!';\n    }\n    direBonjour('Alice');\n?>"
},
{
  "title": "Tableaux en PHP",
  "description": "Exemple de déclaration et d'utilisation d'un tableau en PHP.",
  "code": "<?php\n    $fruits = array('Pomme', 'Banane', 'Orange');\n    foreach ($fruits as $fruit) {\n        echo $fruit . ' ';\n    }\n?>"
},
{
  "title": "Inclusion de Fichiers en PHP",
  "description": "Exemple d'inclusion d'un fichier PHP dans un autre fichier PHP.",
  "code": "<?php\n    include 'fichier.php';\n?>"
},
{
  "title": "Gestion des Sessions en PHP",
  "description": "Exemple d'utilisation des sessions en PHP pour stocker des informations utilisateur.",
  "code": "<?php\n    session_start();\n    $_SESSION['utilisateur'] = 'Alice';\n    echo 'Bonjour, ' . $_SESSION['utilisateur'] . '!';\n?>"
},
{
  "title": "Connexion à une Base de Données MySQL en PHP",
  "description": "Exemple de connexion à une base de données MySQL en utilisant PHP.",
  "code": "<?php\n    $serveur = 'localhost';\n    $utilisateur = 'utilisateur';\n    $motDePasse = 'motdepasse';\n    $baseDeDonnees = 'basededonnees';\n    $connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);\n    if ($connexion->connect_error) {\n        die('Échec de la connexion : ' . $connexion->connect_error);\n    }\n    echo 'Connexion à la base de données réussie !';\n?>"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code Kotlin pour afficher du texte sur la console.",
  "code": "fun main() {\n    println(\"Bonjour, monde !\")\n}"
},
{
  "title": "Variables en Kotlin",
  "description": "Exemple de déclaration et d'utilisation de variables en Kotlin.",
  "code": "fun main() {\n    val nom: String = \"Alice\"\n    var age: Int = 30\n    println(\"Bonjour, je m'appelle \$nom et j'ai \$age ans.\")\n}"
},
{
  "title": "Fonctions en Kotlin",
  "description": "Exemple de déclaration et d'appel de fonction en Kotlin.",
  "code": "fun direBonjour(nom: String) {\n    println(\"Bonjour, \$nom !\")\n}\n\nfun main() {\n    direBonjour(\"Alice\")\n}"
},
{
  "title": "Structures de Contrôle - Condition IF en Kotlin",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en Kotlin.",
  "code": "fun main() {\n    val age: Int = 20\n    if (age >= 18) {\n        println(\"Vous êtes majeur.\")\n    } else {\n        println(\"Vous êtes mineur.\")\n    }\n}"
},
{
  "title": "Boucle FOR en Kotlin",
  "description": "Exemple d'utilisation d'une boucle FOR en Kotlin pour afficher les nombres de 1 à 5.",
  "code": "fun main() {\n    for (i in 1..5) {\n        println(i)\n    }\n}"
},
{
  "title": "Listes en Kotlin",
  "description": "Exemple de déclaration et d'utilisation d'une liste en Kotlin.",
  "code": "fun main() {\n    val fruits = listOf(\"Pomme\", \"Banane\", \"Orange\")\n    for (fruit in fruits) {\n        println(fruit)\n    }\n}"
},
{
  "title": "Utilisation des Classes en Kotlin",
  "description": "Exemple de création et d'utilisation d'une classe en Kotlin.",
  "code": "class Personne(val nom: String, var age: Int) {\n    fun direBonjour() {\n        println(\"Bonjour, je m'appelle \$nom et j'ai \$age ans.\")\n    }\n}\n\nfun main() {\n    val personne = Personne(\"Alice\", 30)\n    personne.direBonjour()\n}"
},
{
  "title": "Expressions Lambda en Kotlin",
  "description": "Exemple d'utilisation des expressions lambda en Kotlin.",
  "code": "fun main() {\n    val carre = { x: Int -> x * x }\n    println(carre(5))\n}"
},
{
  "title": "Gestion des Exceptions en Kotlin",
  "description": "Exemple de gestion des exceptions en Kotlin avec la structure try-catch.",
  "code": "fun main() {\n    try {\n        val resultat = 10 / 0\n        println(resultat)\n    } catch (e: Exception) {\n        println(\"Une erreur s'est produite : \$e\")\n    }\n}"
},
{
  "title": "Utilisation de l'API String en Kotlin",
  "description": "Exemple de manipulation de chaînes de caractères en Kotlin.",
  "code": "fun main() {\n    val phrase = \"Bonjour, monde !\"\n    println(\"Longueur de la phrase : \${phrase.length}\")\n    println(\"Premier caractère : \${phrase.first()}\")\n    println(\"Dernier caractère : \${phrase.last()}\")\n    println(\"Phrase en majuscules : \${phrase.toUpperCase()}\")\n}"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code Haskell pour afficher du texte sur la console.",
  "code": "main :: IO ()\nmain = putStrLn \"Bonjour, monde !\""
},
{
  "title": "Variables en Haskell",
  "description": "Exemple de déclaration et d'utilisation de variables en Haskell.",
  "code": "main :: IO ()\nmain = do\n    let nom = \"Alice\"\n        age = 30\n    putStrLn $ \"Bonjour, je m'appelle \" ++ nom ++ \" et j'ai \" ++ show age ++ \" ans.\""
},
{
  "title": "Fonctions en Haskell",
  "description": "Exemple de déclaration et d'appel de fonction en Haskell.",
  "code": "direBonjour :: String -> IO ()\ndireBonjour nom = putStrLn $ \"Bonjour, \" ++ nom ++ \" !\"\n\nmain :: IO ()\nmain = direBonjour \"Alice\""
},
{
  "title": "Structures de Contrôle - Condition IF en Haskell",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en Haskell.",
  "code": "main :: IO ()\nmain = do\n    let age = 20\n    if age >= 18\n        then putStrLn \"Vous êtes majeur.\"\n        else putStrLn \"Vous êtes mineur.\""
},
{
  "title": "Listes en Haskell",
  "description": "Exemple de déclaration et d'utilisation d'une liste en Haskell.",
  "code": "main :: IO ()\nmain = do\n    let fruits = [\"Pomme\", \"Banane\", \"Orange\"]\n    mapM_ putStrLn fruits"
},
{
  "title": "Utilisation des Fonctions de Haut Niveau en Haskell",
  "description": "Exemple d'utilisation des fonctions de haut niveau en Haskell, comme map et filter.",
  "code": "main :: IO ()\nmain = do\n    let nombres = [1, 2, 3, 4, 5]\n        carres = map (^2) nombres\n    print carres"
},
{
  "title": "Utilisation des Fonctions Récursives en Haskell",
  "description": "Exemple d'utilisation des fonctions récursives en Haskell pour calculer la factorielle d'un nombre.",
  "code": "factorielle :: Integer -> Integer\nfactorielle 0 = 1\nfactorielle n = n * factorielle (n - 1)\n\nmain :: IO ()\nmain = do\n    print $ factorielle 5"
},
{
  "title": "Utilisation des Fonctions d'Ordre Supérieur en Haskell",
  "description": "Exemple d'utilisation des fonctions d'ordre supérieur en Haskell, comme foldl.",
  "code": "main :: IO ()\nmain = do\n    let nombres = [1, 2, 3, 4, 5]\n        somme = foldl (+) 0 nombres\n    print somme"
},
{
  "title": "Utilisation de Pattern Matching en Haskell",
  "description": "Exemple d'utilisation de pattern matching en Haskell dans une fonction pour calculer la longueur d'une liste.",
  "code": "longueur :: [a] -> Int\nlongueur [] = 0\nlongueur (_:xs) = 1 + longueur xs\n\nmain :: IO ()\nmain = do\n    print $ longueur [1, 2, 3, 4, 5]"
},
{
  "title": "Utilisation des Types de Données en Haskell",
  "description": "Exemple d'utilisation des types de données en Haskell pour définir un nouveau type Point.",
  "code": "data Point = Point Double Double\n\ndistance :: Point -> Point -> Double\ndistance (Point x1 y1) (Point x2 y2) = sqrt ((x2 - x1) ^ 2 + (y2 - y1) ^ 2)\n\nmain :: IO ()\nmain = do\n    let p1 = Point 0 0\n        p2 = Point 3 4\n    print $ distance p1 p2"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code Elixir pour afficher du texte sur la console.",
  "code": "IO.puts \"Bonjour, monde !\""
},
{
  "title": "Variables en Elixir",
  "description": "Exemple de déclaration et d'utilisation de variables en Elixir.",
  "code": "nom = \"Alice\"\nage = 30\nIO.puts \"Bonjour, je m'appelle #{nom} et j'ai #{age} ans.\""
},
{
  "title": "Fonctions en Elixir",
  "description": "Exemple de déclaration et d'appel de fonction en Elixir.",
  "code": "def dire_bonjour(nom) do\n  IO.puts \"Bonjour, #{nom} !\"\nend\n\ndire_bonjour(\"Alice\")"
},
{
  "title": "Structures de Contrôle - Condition IF en Elixir",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en Elixir.",
  "code": "age = 20\nif age >= 18 do\n  IO.puts \"Vous êtes majeur.\"\nelse\n  IO.puts \"Vous êtes mineur.\"\nend"
},
{
  "title": "Listes en Elixir",
  "description": "Exemple de déclaration et d'utilisation d'une liste en Elixir.",
  "code": "fruits = [\"Pomme\", \"Banane\", \"Orange\"]\nEnum.each(fruits, &IO.puts/1)"
},
{
  "title": "Utilisation des Fonctions de Haut Niveau en Elixir",
  "description": "Exemple d'utilisation des fonctions de haut niveau en Elixir, comme Enum.map.",
  "code": "nombres = [1, 2, 3, 4, 5]\ncarres = Enum.map(nombres, &(&1 * &1))\nIO.inspect(carres)"
},
{
  "title": "Utilisation des Fonctions Récursives en Elixir",
  "description": "Exemple d'utilisation des fonctions récursives en Elixir pour calculer la factorielle d'un nombre.",
  "code": "defmodule Math do\n  def factorielle(0), do: 1\n  def factorielle(n), do: n * factorielle(n - 1)\nend\n\nIO.puts Math.factorielle(5)"
},
{
  "title": "Utilisation des Fonctions d'Ordre Supérieur en Elixir",
  "description": "Exemple d'utilisation des fonctions d'ordre supérieur en Elixir, comme Enum.reduce.",
  "code": "nombres = [1, 2, 3, 4, 5]\nsomme = Enum.reduce(nombres, 0, &(&1 + &2))\nIO.puts somme"
},
{
  "title": "Utilisation de Pattern Matching en Elixir",
  "description": "Exemple d'utilisation de pattern matching en Elixir dans une fonction pour calculer la longueur d'une liste.",
  "code": "defmodule ListLength do\n  def longueur([]), do: 0\n  def longueur([_ | tail]), do: 1 + longueur(tail)\nend\n\nIO.puts ListLength.longueur([1, 2, 3, 4, 5])"
},
{
  "title": "Utilisation des Types de Données en Elixir",
  "description": "Exemple d'utilisation des types de données en Elixir pour définir un module Point.",
  "code": "defmodule Point do\n  defstruct x: 0, y: 0\nend\n\np1 = %Point{x: 0, y: 0}\np2 = %Point{x: 3, y: 4}\ndistance = :math.sqrt((p2.x - p1.x) ^ 2 + (p2.y - p1.y) ^ 2)\nIO.puts distance"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code OCaml pour afficher du texte sur la console.",
  "code": "print_endline \"Bonjour, monde !\";;"
},
{
  "title": "Variables en OCaml",
  "description": "Exemple de déclaration et d'utilisation de variables en OCaml.",
  "code": "let nom = \"Alice\";;\nlet age = 30;;\nprint_endline (\"Bonjour, je m'appelle \" ^ nom ^ \" et j'ai \" ^ string_of_int age ^ \" ans.\");;"
},
{
  "title": "Fonctions en OCaml",
  "description": "Exemple de déclaration et d'appel de fonction en OCaml.",
  "code": "let dire_bonjour nom = print_endline (\"Bonjour, \" ^ nom ^ \" !\");;\n\nlet () = dire_bonjour \"Alice\";;"
},
{
  "title": "Structures de Contrôle - Condition IF en OCaml",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en OCaml.",
  "code": "let age = 20 in\nif age >= 18 then print_endline \"Vous êtes majeur.\"\nelse print_endline \"Vous êtes mineur.\";;"
},
{
  "title": "Listes en OCaml",
  "description": "Exemple de déclaration et d'utilisation d'une liste en OCaml.",
  "code": "let fruits = [\"Pomme\"; \"Banane\"; \"Orange\"] in\nList.iter print_endline fruits;;"
},
{
  "title": "Utilisation des Fonctions de Haut Niveau en OCaml",
  "description": "Exemple d'utilisation des fonctions de haut niveau en OCaml, comme List.map.",
  "code": "let nombres = [1; 2; 3; 4; 5] in\nlet carres = List.map (fun x -> x * x) nombres in\nList.iter print_int carres;;"
},
{
  "title": "Utilisation des Fonctions Récursives en OCaml",
  "description": "Exemple d'utilisation des fonctions récursives en OCaml pour calculer la factorielle d'un nombre.",
  "code": "let rec factorielle n = if n <= 1 then 1 else n * factorielle (n - 1) in\nprint_int (factorielle 5);;"
},
{
  "title": "Utilisation de Pattern Matching en OCaml",
  "description": "Exemple d'utilisation de pattern matching en OCaml dans une fonction pour calculer la longueur d'une liste.",
  "code": "let rec longueur = function\n  | [] -> 0\n  | _ :: tail -> 1 + longueur tail in\nprint_int (longueur [1; 2; 3; 4; 5]);;"
},
{
  "title": "Utilisation des Types de Données en OCaml",
  "description": "Exemple d'utilisation des types de données en OCaml pour définir un nouveau type Point.",
  "code": "type point = { x : float; y : float };;\nlet p1 = { x = 0.0; y = 0.0 };;\nlet p2 = { x = 3.0; y = 4.0 };;\nlet distance p1 p2 = sqrt ((p2.x -. p1.x) ** 2.0 +. (p2.y -. p1.y) ** 2.0) in\nprint_float (distance p1 p2);;"
},
{
  "title": "Utilisation des Modules en OCaml",
  "description": "Exemple d'utilisation des modules en OCaml pour créer un module Point.",
  "code": "module Point = struct\n  type t = { x : float; y : float }\n\n  let distance p1 p2 = sqrt ((p2.x -. p1.x) ** 2.0 +. (p2.y -. p1.y) ** 2.0)\nend\n\nlet p1 = Point.{ x = 0.0; y = 0.0 };;\nlet p2 = Point.{ x = 3.0; y = 4.0 };;\nprint_float (Point.distance p1 p2);;"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code F# pour afficher du texte sur la console.",
  "code": "printfn \"Bonjour, monde !\""
},
{
  "title": "Variables en F#",
  "description": "Exemple de déclaration et d'utilisation de variables en F#.",
  "code": "let nom = \"Alice\"\nlet age = 30\nprintfn \"Bonjour, je m'appelle %s et j'ai %d ans.\" nom age"
},
{
  "title": "Fonctions en F#",
  "description": "Exemple de déclaration et d'appel de fonction en F#.",
  "code": "let direBonjour nom = printfn \"Bonjour, %s !\" nom\n\ndireBonjour \"Alice\""
},
{
  "title": "Structures de Contrôle - Condition IF en F#",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en F#.",
  "code": "let age = 20\nif age >= 18 then printfn \"Vous êtes majeur.\"\nelse printfn \"Vous êtes mineur.\""
},
{
  "title": "Listes en F#",
  "description": "Exemple de déclaration et d'utilisation d'une liste en F#.",
  "code": "let fruits = [\"Pomme\"; \"Banane\"; \"Orange\"]\nList.iter (fun fruit -> printfn \"%s\" fruit) fruits"
},
{
  "title": "Utilisation des Fonctions de Haut Niveau en F#",
  "description": "Exemple d'utilisation des fonctions de haut niveau en F#, comme List.map.",
  "code": "let nombres = [1; 2; 3; 4; 5]\nlet carres = List.map (fun x -> x * x) nombres\nList.iter (fun carre -> printfn \"%d\" carre) carres"
},
{
  "title": "Utilisation des Fonctions Récursives en F#",
  "description": "Exemple d'utilisation des fonctions récursives en F# pour calculer la factorielle d'un nombre.",
  "code": "let rec factorielle n = if n <= 1 then 1 else n * factorielle (n - 1)\nprintfn \"%d\" (factorielle 5)"
},
{
  "title": "Utilisation de Pattern Matching en F#",
  "description": "Exemple d'utilisation de pattern matching en F# dans une fonction pour calculer la longueur d'une liste.",
  "code": "let rec longueur = function\n  | [] -> 0\n  | _ :: tail -> 1 + longueur tail\nprintfn \"%d\" (longueur [1; 2; 3; 4; 5])"
},
{
  "title": "Utilisation des Types de Données en F#",
  "description": "Exemple d'utilisation des types de données en F# pour définir un nouveau type Point.",
  "code": "type Point = { x: float; y: float }\nlet p1 = { x = 0.0; y = 0.0 }\nlet p2 = { x = 3.0; y = 4.0 }\nlet distance p1 p2 = sqrt ((p2.x - p1.x) ** 2.0 + (p2.y - p1.y) ** 2.0)\nprintfn \"%f\" (distance p1 p2)"
},
{
  "title": "Utilisation des Modules en F#",
  "description": "Exemple d'utilisation des modules en F# pour créer un module Point.",
  "code": "module Point =\n    type T = { x: float; y: float }\n    let distance p1 p2 = sqrt ((p2.x - p1.x) ** 2.0 + (p2.y - p1.y) ** 2.0)\n\nlet p1 = { x = 0.0; y = 0.0 }\nlet p2 = { x = 3.0; y = 4.0 }\nprintfn \"%f\" (Point.distance p1 p2)"
},
{
  "title": "Affichage de Texte",
  "description": "Exemple de code COBOL pour afficher du texte sur la console.",
  "code": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO-WORLD.\n\n       PROCEDURE DIVISION.\n           DISPLAY 'Bonjour, monde !'.\n           STOP RUN."
},
{
  "title": "Variables en COBOL",
  "description": "Exemple de déclaration et d'utilisation de variables en COBOL.",
  "code": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. VARIABLES.\n\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 NOM       PIC X(20) VALUE 'Alice'.\n       01 AGE       PIC 99 VALUE 30.\n\n       PROCEDURE DIVISION.\n           DISPLAY 'Bonjour, je m''appelle ' NOM ' et j''ai ' AGE ' ans.'.\n           STOP RUN."
},
{
  "title": "Conditions IF en COBOL",
  "description": "Exemple d'utilisation de la structure de contrôle conditionnelle IF en COBOL.",
  "code": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. CONDITIONS.\n\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 AGE       PIC 99 VALUE 20.\n\n       PROCEDURE DIVISION.\n           IF AGE >= 18\n               DISPLAY 'Vous êtes majeur.'\n           ELSE\n               DISPLAY 'Vous êtes mineur.'\n           END-IF.\n           STOP RUN."
},
{
  "title": "Boucle PERFORM en COBOL",
  "description": "Exemple d'utilisation d'une boucle PERFORM en COBOL.",
  "code": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. BOUCLE.\n\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 I PIC 9(2) VALUE 1.\n\n       PROCEDURE DIVISION.\n           PERFORM UNTIL I > 5\n               DISPLAY I\n               ADD 1 TO I\n           END-PERFORM.\n           STOP RUN."
},
{
  "title": "Utilisation des TABLES en COBOL",
  "description": "Exemple d'utilisation des tables en COBOL.",
  "code": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. TABLES.\n\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 TABLE.\n           05 VALUE PIC 9 OCCURS 5 TIMES.\n           05 INDEX PIC 9 VALUE 1.\n\n       PROCEDURE DIVISION.\n           PERFORM UNTIL INDEX > 5\n               COMPUTE VALUE(INDEX) = INDEX * 10\n               ADD 1 TO INDEX\n           END-PERFORM.\n           DISPLAY 'Table : '\n           PERFORM VARYING INDEX FROM 1 BY 1 UNTIL INDEX > 5\n               DISPLAY VALUE(INDEX)\n           END-PERFORM.\n           STOP RUN."
}
  ];