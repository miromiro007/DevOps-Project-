# Kubernetes Deployment Guide

## Prérequis

- Docker Desktop avec Kubernetes activé **OU**
- Minikube **OU**
- Kind

## Option 1: Docker Desktop (Recommandé pour Windows)

### 1. Activer Kubernetes dans Docker Desktop
- Ouvrir Docker Desktop
- Settings → Kubernetes → Enable Kubernetes → Apply & Restart

### 2. Vérifier que kubectl fonctionne
```bash
kubectl version --client
kubectl cluster-info
```

### 3. Charger l'image Docker dans Kubernetes
```bash
# Build l'image si pas déjà fait
docker build -t crudbooks-backend:1.0 .

# Pour Docker Desktop, l'image est déjà accessible
```

### 4. Déployer sur Kubernetes
```bash
cd k8s

# Appliquer les manifests
kubectl apply -f configmap.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml

# Vérifier les déploiements
kubectl get all
```

### 5. Accéder à l'application
```bash
# L'application est accessible sur:
http://localhost:30080/health
http://localhost:30080/api/books
```

---

## Option 2: Minikube

### 1. Installer Minikube
```bash
# Windows (PowerShell en admin)
choco install minikube

# Ou télécharge depuis: https://minikube.sigs.k8s.io/docs/start/
```

### 2. Démarrer Minikube
```bash
minikube start --driver=docker
```

### 3. Charger l'image dans Minikube
```bash
# Build et charge l'image
minikube image load crudbooks-backend:1.0

# Ou build directement dans minikube
eval $(minikube docker-env)
docker build -t crudbooks-backend:1.0 .
```

### 4. Déployer
```bash
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

### 5. Accéder à l'application
```bash
# Obtenir l'URL du service
minikube service crudbooks-service --url

# Ou ouvrir dans le navigateur
minikube service crudbooks-service
```

---

## Option 3: Kind (Kubernetes in Docker)

### 1. Installer Kind
```bash
# Windows (PowerShell)
choco install kind

# Ou: https://kind.sigs.k8s.io/docs/user/quick-start/
```

### 2. Créer un cluster
```bash
kind create cluster --name crudbooks
```

### 3. Charger l'image
```bash
kind load docker-image crudbooks-backend:1.0 --name crudbooks
```

### 4. Déployer
```bash
kubectl apply -f k8s/
```

### 5. Accéder avec port-forward
```bash
kubectl port-forward service/crudbooks-service 3000:3000
# Puis: http://localhost:3000/health
```

---

## Commandes Utiles

### Vérifier le statut
```bash
# Voir tous les pods
kubectl get pods

# Voir les services
kubectl get services

# Voir les déploiements
kubectl get deployments

# Voir les logs d'un pod
kubectl logs <pod-name>

# Décrire un pod
kubectl describe pod <pod-name>
```

### Mettre à jour l'application
```bash
# Rebuild l'image
docker build -t crudbooks-backend:1.0 .

# Recharger dans Minikube/Kind si nécessaire
minikube image load crudbooks-backend:1.0
# OU
kind load docker-image crudbooks-backend:1.0 --name crudbooks

# Redémarrer les pods
kubectl rollout restart deployment/crudbooks-api
```

### Scaler l'application
```bash
# Augmenter à 3 replicas
kubectl scale deployment/crudbooks-api --replicas=3

# Vérifier
kubectl get pods
```

### Nettoyer
```bash
# Supprimer tout
kubectl delete -f k8s/

# Ou individuellement
kubectl delete deployment crudbooks-api
kubectl delete service crudbooks-service
kubectl delete configmap crudbooks-config
```

---

## Test de l'application déployée

```bash
# Health check
curl http://localhost:30080/health

# Get all books
curl http://localhost:30080/api/books

# Get book by ID
curl http://localhost:30080/api/books/1

# Add a book
curl -X POST http://localhost:30080/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"DevOps Book","author":"Me","price":50,"quantity":10}'
```

---

## Architecture

```
                    Internet
                       |
                  NodePort :30080
                       |
              [Service: crudbooks-service]
                       |
            Load Balancer (ClusterIP)
                       |
        +-------------+-------------+
        |                           |
   [Pod: crudbooks-1]        [Pod: crudbooks-2]
   Container: Node.js        Container: Node.js
   Port: 3000               Port: 3000
```

## Health Checks

- **Liveness Probe**: Vérifie si le pod est vivant (redémarre si KO)
- **Readiness Probe**: Vérifie si le pod peut recevoir du trafic
- Les deux utilisent: `GET /health` → `{status: "ok"}`
