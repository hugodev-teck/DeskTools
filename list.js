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
  }
  ];