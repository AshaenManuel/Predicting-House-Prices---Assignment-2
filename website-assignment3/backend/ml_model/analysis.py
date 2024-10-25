import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

#import dataset
df = pd.read_csv("finalData.csv")

#drop colloumns without numerical vaules for analysis
df.drop(columns=['Suburb','State'], inplace=True)

#plot the correlation matrix of the data
plt.figure(figsize=(12, 10))
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
plt.title('Correlation Matrix Heatmap')
plt.show()