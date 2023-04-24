# CoronaScope
A Django and React application that utilizes a convolutional neural network, specifically the Xception model, to classify x-ray images as 'covid', 'normal', or 'viral pneumonia' with an impressive validation accuracy of 93%. It's capable of creating, reading, updating, and deleting previous predictions.

### Cloning the repository

--> Clone the repository using the command below :
```bash
git clone https://github.com/amauriciogonzalez/CoronaScope.git

```

--> Move into the directory where we have the project files : 
```bash
cd CoronaScope

```

--> Create a virtual environment :
```bash
# If you are on Windows
virtualenv env
# If you are on Linux or Mac
python -m venv env
```

--> Activate the virtual environment :
```bash
# If you are on Windows
.\env\Scripts\activate
# If you are on Linux or Mac
source env/bin/activate
```

--> Install the requirements :
```bash
pip install -r requirements.txt

```

#

### Running the App

--> To run the Notes App, we use :
```bash
python manage.py runserver
```

> ⚠ Then, the development server will be started at http://127.0.0.1:8000/

#

### App Preview :
![Capture](https://user-images.githubusercontent.com/88101535/234070712-04fe4839-679a-420f-a6e0-5822d99c1fd2.PNG)

![Capture](https://user-images.githubusercontent.com/88101535/234070921-691ecd27-423f-4b8b-8b26-cb6eb21d1cec.PNG)

#
