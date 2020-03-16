```
kubectl create namespace anyopsos

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/provider/cloud-generic.yaml

kubectl create secret generic anyopsos-certificates -n anyopsos \
--from-file=./scripts/certificates/ca/ca.cert \
--from-file=./scripts/certificates/vault/vault.cert \
--from-file=./scripts/certificates/vault/vault.key \
--from-file=./scripts/certificates/auth/auth.cert \
--from-file=./scripts/certificates/auth/auth.key \
--from-file=./scripts/certificates/core/core.cert \
--from-file=./scripts/certificates/core/core.key \
--from-file=./scripts/certificates/filesystem/filesystem.cert \
--from-file=./scripts/certificates/filesystem/filesystem.key \
--from-file=./scripts/certificates/dhparam.pem

kubectl create configmap vault-config -n anyopsos --from-file=docker/assets/vault.json

kubectl apply -f docker/yaml/
```
