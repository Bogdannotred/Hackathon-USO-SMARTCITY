# SAGLPP

Sistem automatizat de gestionare a locurilor de parcare publice



# How to run app backend:

```code
cd backend
docker compose down -v
docker compose up -d
npx prisma generate
npx prisma db push
```