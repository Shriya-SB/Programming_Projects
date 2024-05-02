import pandas as pd

# Pandas is a powerful python library use for data manipulation.

# Example 1: Creating Series and DataFrame
s = pd.Series([1, 3, 5, 7, 9])
print("Series:")
print(s)

data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],
        'Age': [25, 30, 35, 40],
        'City': ['New York', 'London', 'Paris', 'Tokyo']}
df = pd.DataFrame(data)  # Frames the data in neat tabular form.
print("\nDataFrame:")
print(df)

# Example 2: Indexing and Selection
print("\nSelecting a single column:")
print(df['Name'])

print("\nSelecting multiple columns:")
print(df[['Name', 'Age']])

print("\nSelecting rows based on a condition:")
print(df[df['Age'] > 30])

print("\nSelecting rows and columns using iloc:")
print(df.iloc[1:3, 0:2])

# Example 3: Data Input and Output
df.to_csv('data.csv', index=False)
df_new = pd.read_csv('data.csv') # Creates a new file and fills the data as csv file.
print("\nDataFrame from CSV:")
print(df_new)

# Example 4: Handling Missing Data
df.loc[1, 'Age'] = pd.NA
df.loc[2, 'City'] = pd.NA
print("\nDataFrame with missing values:")
print(df)

df_cleaned = df.dropna()
print("\nDataFrame after dropping rows with missing values:")
print(df_cleaned)

df_filled = df.fillna({'Age': 0, 'City': 'Unknown'})
print("\nDataFrame after filling missing values:")
print(df_filled)

# Example 5: Plotting and Visualization
print(df.plot(kind='bar', x='Name', y='Age', title='Age Distribution'))