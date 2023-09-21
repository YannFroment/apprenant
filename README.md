# Apprenant

Application de support d'enseignement à destination d'adultes en situation d'illettrisme.

## Installer Make sur son OS préféré

```bash
# linux
sudo apt-get install build-essential

# mac
brew install make

```

La commande `make help` permet de lister les commandes existantes.

## Préparer le projet

Installe les packages et joue les migrations de base de données

`make setup`

## Lancer l'application en local

`make up`

## Lancer les tests

### Frontend :

`make frontend-test`

### Backend :

- `make backend-test` tests unitaires
- `make backend-test-e2e` tests end-to-end

## Base de données :

### Réinitialiser la base de données

Va supprimer toutes les tables, exécuter toutes les migrations et créer un jeu de données initial (seed de base de données)

`make purge-db`

### Générer une migration

`make migration-generate name=<FileName>`

### Lancer les migrations

`make migration-run`

## Compiler

### Frontend :

`make frontend-build`

### Backend :

`make backend-build`
