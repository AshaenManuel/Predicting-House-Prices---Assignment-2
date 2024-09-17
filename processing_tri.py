import pandas as pd

#import the dataset
dataToProcess = pd.read_csv("Melbourne_housing_FULL.csv")

#remove uneccessary columns
dataToProcess.drop(columns=['Address','Type','Method','SellerG','Date','Car','BuildingArea','YearBuilt','CouncilArea','Lattitude','Longtitude','Regionname','Propertycount','Bedroom2'], inplace=True)

#remove duplicates
dataToProcess.drop_duplicates(inplace=True)

#rename columns
dataToProcess.rename(columns={'Rooms': 'Number of Bedrooms', 'Price':'Price($)'}, inplace=True)

#remove empty fields
dataToProcess = dataToProcess.dropna()


#processing and removing outliers
Q1 = dataToProcess['Price($)'].quantile(0.25)
Q3 = dataToProcess['Price($)'].quantile(0.75)

#finding lower and upper bound using inter quartile range
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

#produce dataframe of outliers
outliers = dataToProcess[(dataToProcess['Price($)'] < lower_bound) | (dataToProcess['Price($)'] > upper_bound)]

#iterate through the dataset to remove outliers
for v in outliers['Price($)'].to_list():
    for b in dataToProcess['Price($)'].to_list():
        if b == v:
            dataToProcess = dataToProcess[dataToProcess['Price($)'] != v]

#final cleaned data
cleanData = dataToProcess



