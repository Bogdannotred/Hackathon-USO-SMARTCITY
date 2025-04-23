[![Watch the video](https://img.youtube.com/vi/ID_VIDEO/maxresdefault.jpg)](https://youtu.be/zb3RHRTwa5k)

# SAGLPP

Sistem automatizat de gestionare a locurilor de parcare publice

# How to run app backend:

```code
cd backend
docker compose down -v
docker compose up -d
npx prisma generate
npx prisma db push
npm run seed
```
# Python Flask

### Windows
myenv\Scripts\activate

### Linux
source myenv/bin/activate

pip install flask


# How to run openalpr (docker image):

### Build docker image
docker build -t openalpr https://github.com/openalpr/openalpr.git
### Download test image
wget http://plates.openalpr.com/h786poj.jpg
### Run alpr on image
docker run -it --rm -v $(pwd):/data:ro openalpr -c eu h786poj.jpg
docker run -it --rm -v $(pwd):/data:ro openalpr -c eu test.jpeg
