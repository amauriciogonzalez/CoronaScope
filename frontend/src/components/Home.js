import React from 'react'

function Home()
{
    return (
        <div className='home'>
            <div>
                <h2 className='home-title'>Introduction</h2>
                <p>
                    Welcome to CoronaScope! The platform utilizes the power of a deep convolutional neural network, specifically the Xception model, to classify x-ray images as
                     'covid', 'normal', or 'viral pneumonia' with an impressive validation accuracy of 93%.
                </p>
                <p>
                    Designed as a machine learning project, this website serves as a showcase of our expertise in utilizing cutting-edge technology for medical image classification. By
                     leveraging the power of deep learning, we have created an accurate and efficient system for diagnosing COVID-19 cases from x-ray images.
                </p>
                <p>
                    To get started, simply click on the 'Predict' tab in the navigation bar and upload your x-ray image for instant classification. Stay updated with the latest advancements
                     in COVID-19 research by checking out the links in the news section. You can also access the dataset to learn more about the data used in our model below.
                </p>
                <p>
                    We are excited to share our machine learning project with you and demonstrate our skills in the field of medical image classification. Thank you for visiting our
                     website and exploring our state-of-the-art prediction system.
                </p>
                <p>
                    For the latest dataset used in the prediction model, you can find it here:
                </p>
                <ul>
                    <li><a href="https://www.kaggle.com/datasets/pranavraikokte/covid19-image-dataset" target="_blank">COVID-19 Image Dataset</a></li>
                </ul>
            </div>
            <div>
                <h2 className='home-title'>Latest News</h2>
                <p>Stay informed with the latest news and updates on COVID-19's affect on lungs from reliable sources:</p>
                <ul>
                    <li><a href="https://www.nhlbi.nih.gov/covid/lungs" target="_blank">National Institutes of Health (NIH)</a></li>
                    <li><a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/what-coronavirus-does-to-the-lungs" target="_blank">John Hopkins Medicine (JHM)</a></li>
                    <li><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">World Health Organization (WHO)</a></li>
                    <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target="_blank">Centers for Disease Control and Prevention (CDC)</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Home;