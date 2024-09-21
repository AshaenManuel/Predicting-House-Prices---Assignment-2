import pandas as pd

#import the dataset
housingData = pd.read_csv("Melbourne_housing_FULL.csv")

#remove uneccessary columns
housingData.drop(columns=['Address','Type','Method','SellerG','Date','Car','BuildingArea','CouncilArea','Lattitude','Longtitude','Regionname','Propertycount', "Postcode", "Landsize"], inplace=True)

#rename columns
housingData.rename(columns={'Rooms': 'Number of Rooms', 'Price':'Price($)', 'Bedroom2':'Number of Bedroom'}, inplace=True)

#remove empty fields
housingData = housingData.dropna()

#scale price values for easier analysis
housingData['Price in $1,000,000'] = housingData['Price($)']/1000000

#delete previous collumn
housingData.drop(columns=['Price($)'], inplace=True)


#processing and removing outliers
Q1 = housingData['Price in $1,000,000'].quantile(0.25)
Q3 = housingData['Price in $1,000,000'].quantile(0.75)

#finding lower and upper bound using inter quartile range
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

#produce dataframe of outliers
outliers = housingData[(housingData['Price in $1,000,000'] < lower_bound) | (housingData['Price in $1,000,000'] > upper_bound)]

#iterate through the dataset to remove outliers
for v in outliers['Price in $1,000,000'].to_list():
    for b in housingData['Price in $1,000,000'].to_list():
        if b == v:
            housingData = housingData[housingData['Price in $1,000,000'] != v]

#import additional dataset
educationData = pd.read_csv("Education_data.csv")

#rename collumns
educationData.rename(columns={'2021 Suburbs and Localities (SAL) Name': 'Suburb', 'Usual Resident Population': 'Population', "Score":"Education Score", "Rank": "State Rank"}, inplace=True) 

#delete uneccessary collumns
educationData.drop(columns="2021 Suburbs and Localities (SAL) Code", inplace=True)

#only keep rows that contain data for VIC
educationData = educationData[educationData["State"] == 'VIC']

#merge additonal dataset with previous dataset
combinedData = pd.merge(housingData, educationData)

#download dataframe as csv
combinedData.to_csv('finalData.csv')



