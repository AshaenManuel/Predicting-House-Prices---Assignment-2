import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

df = pd.read_csv("Melbourne_housing_FULL.csv")
df.drop(columns=['Address','Type','Method','SellerG','Date','BuildingArea','CouncilArea','Lattitude', 'Longtitude', 'Regionname', "Suburb"], inplace=True)
df = df.dropna()
print(df)

plt.figure(figsize=(12, 10))
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
plt.title('Correlation Matrix Heatmap')
plt.show()