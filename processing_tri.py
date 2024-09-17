import pandas as pd

dataToProcess = pd.read_csv("Melbourne_housing_FULL.csv")

dataToProcess.drop(columns=['Address','Type','Method','SellerG','Date','Car','BuildingArea','YearBuilt','CouncilArea','Lattitude','Longtitude','Regionname','Propertycount','Bedroom2'], inplace=True)

dataToProcess.drop_duplicates(inplace=True)

dataToProcess.rename(columns={'Rooms': 'Number of Bedrooms', 'Price':'Price($)'}, inplace=True)


cleanData = dataToProcess.dropna()

print(cleanData)
