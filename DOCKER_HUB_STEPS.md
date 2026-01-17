# 🐳 Publication Docker Hub - Guide Complet

## Étape 1: Créer un compte Docker Hub (2 minutes)

1. Va sur https://hub.docker.com/signup
2. Crée un compte gratuit
3. Note ton username (exemple: miromiro007)

## Étape 2: Login depuis PowerShell

Ouvre PowerShell et exécute:

```powershell
docker login
```

Quand demandé:
- **Username:** ton_username_dockerhub
- **Password:** ton_mot_de_passe

## Étape 3: Tag et Push l'image

**IMPORTANT:** Remplace `TONUSERNAME` par ton vrai username Docker Hub!

```powershell
# Aller au répertoire
cd "C:\Users\Mega Pc\Desktop\DevOps\CrudBOOKS BACKEND"

# Build l'image si nécessaire
docker build -t crudbooks-backend:1.0 .

# Tag l'image avec ton username
docker tag crudbooks-backend:1.0 TONUSERNAME/crudbooks-backend:1.0
docker tag crudbooks-backend:1.0 TONUSERNAME/crudbooks-backend:latest

# Vérifier que les tags sont créés
docker images | findstr crudbooks

# Push vers Docker Hub
docker push TONUSERNAME/crudbooks-backend:1.0
docker push TONUSERNAME/crudbooks-backend:latest
```

## Étape 4: Vérifier sur Docker Hub

Va sur: https://hub.docker.com/r/TONUSERNAME/crudbooks-backend

Tu devrais voir ton image publiée! 🎉

## Étape 5: Update README.md

Ajoute cette section dans ton README.md:

```markdown
## 🐳 Docker Hub

**Published Image:** [TONUSERNAME/crudbooks-backend](https://hub.docker.com/r/TONUSERNAME/crudbooks-backend)

### Quick Start with Docker Hub:

\`\`\`bash
# Pull the image
docker pull TONUSERNAME/crudbooks-backend:latest

# Run the container
docker run -d -p 3000:3000 --name crudbooks-api TONUSERNAME/crudbooks-backend:latest

# Test the API
curl http://localhost:3000/health
curl http://localhost:3000/api/books
\`\`\`

### Image Details:
- **Size:** ~400MB
- **Base:** node:20-alpine
- **Port:** 3000
- **Tags:** `latest`, `1.0`
\`\`\`
```

## Étape 6: Commit la modification

```powershell
git checkout main
git add README.md
git commit -m "docs: add Docker Hub publication details"
git push
```

## ✅ C'est fait!

Tu viens de récupérer **3% de points supplémentaires!** 🎉

---

## 🔥 BONUS: Automatiser avec GitHub Actions

Si tu veux automatiser le push Docker Hub dans ta CI/CD, ajoute ces secrets sur GitHub:

1. Va sur: https://github.com/miromiro007/DevOps-Project-/settings/secrets/actions
2. Clique "New repository secret"
3. Ajoute:
   - Name: `DOCKER_USERNAME` Value: ton_username
   - Name: `DOCKER_TOKEN` Value: ton_token (créé sur Docker Hub → Account Settings → Security)

Puis je t'aiderai à modifier le workflow CI!
