import pandas as pd

#import the dataset
dataToProcess = pd.read_csv("Melbourne_housing_FULL.csv")

#remove uneccessary columns
dataToProcess.drop(columns=['Address','Type','Method','SellerG','Date','Car','BuildingArea','CouncilArea','Lattitude','Longtitude','Regionname','Propertycount', "Suburb", "Postcode", "Landsize"], inplace=True)

#rename columns
dataToProcess.rename(columns={'Rooms': 'Number of Rooms', 'Price':'Price($)', 'Bedroom2':'Number of Bedroom'}, inplace=True)

#remove empty fields
dataToProcess = dataToProcess.dropna()

#scale price values for easier analysis
dataToProcess['Price in $1,000,000'] = dataToProcess['Price($)']/1000000

#delete previous collumn
dataToProcess.drop(columns=['Price($)'], inplace=True)


#processing and removing outliers
Q1 = dataToProcess['Price in $1,000,000'].quantile(0.25)
Q3 = dataToProcess['Price in $1,000,000'].quantile(0.75)

#finding lower and upper bound using inter quartile range
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

#produce dataframe of outliers
outliers = dataToProcess[(dataToProcess['Price in $1,000,000'] < lower_bound) | (dataToProcess['Price in $1,000,000'] > upper_bound)]

#iterate through the dataset to remove outliers
for v in outliers['Price in $1,000,000'].to_list():
    for b in dataToProcess['Price in $1,000,000'].to_list():
        if b == v:
            dataToProcess = dataToProcess[dataToProcess['Price in $1,000,000'] != v]


#final cleaned data
cleanData = dataToProcess

#download dataframe as csv
cleanData.to_csv('finalData.csv')



