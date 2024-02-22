# Higram
Hello everybody !


### First step 
Using the command below, clone this project to your local machine :

```
git clone https://github.com/ismaelaek/higram.git
```

### Second step

Navigate to the cloned folder.
```
cd Higram
```

### 3rd step : installing Laravel dependancies

Navigate to **Backend** Folder 
```
cd Backend
```

Use those commands to install laravel dependancies:
```
composer update 
composer install
```
Make sure that a folder named `vendor` apeared after the installation!

### 4th step : setting up the environment
Copy the `.env.example` file to `.env` using the command below:
```
cp .env.example .env
```
### 5th step : installing react dependancies
Navigate to the **frontend** folder using 
```
cd ../frontend
```
Then use this command to install all React depandencies 
```
npm install
```
A new folder called `node_modules` will appear in your current directory (frontend).

### Final step : running the application

Firstly open two terminals, one for Laravel and the other for React

##### Laravel Terminal
Navigate to the folder named **backend**
```
cd backend
```
Start the server using 
```
php artisan serve
```

##### React Terminal
Navigate to the folder named **frontend**
```
cd frontend
```
Start the server using 
```
npm run dev
```
